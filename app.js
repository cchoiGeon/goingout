//기본 세팅
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const server = express();
const multer = require("multer");
const path = require("path");
// 모듈 불러오기

const alphlist = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];

// db 설정
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '11111111',
  database : 'going_out'
});
db.connect();
//MULTER 사용
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null,path.basename(file.originalname,ext) + "-" + Date.now() + ext); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
})
const upload = multer({storage: storage})



//set 메서드
server.set('view engine', 'ejs');
server.set('views', './views');



//use 메서드
server.use(express.static('css'));
server.use(express.static('js'));
server.use(express.static('assets'));

server.use(bodyParser.urlencoded({ extended: false}));
server.use(session({
  secret: 'q1321weff@45%$',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

var loginbox = ''

function logintrueindex(req,res){
  if(req.session.login){
    loginbox = `<li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" href="/logout_process">로그아웃</a></li>`;
  }else{
    loginbox =`<li><a class="dropdown-item" href="/login">로그인</a></li>
      <li><a class="dropdown-item" href="/register">회원가입</a></li>`;
  }
}
// 홈페이지
server.get('/', (req, res) => {
  logintrueindex(req,res)
  let count = 0;
  db.query('SELECT * FROM usetrue',function(err,usetrue){
    for(let i=0; i<usetrue.length; i++){
      if(usetrue[i].matching === "true"){
        count += 1;
      }
    }
    res.render('index',{
      'loginbox': loginbox,
      'people': count})
  });
})
//매칭
server.get('/matching', (req, res) => {
  logintrueindex(req,res)
  db.query('SELECT * FROM usetrue',function(err,usetrue){
    for(let i=0; i<usetrue.length; i++){
      if(parseInt(usetrue[i].user_id) === req.session.userid && usetrue[i].matching === "true"){
        res.write("<script>alert('You have already submitted results')</script>");
        return res.write("<script>window.location='/'</script>");
      }
    }
    db.query('SELECT * FROM register',function(err,register){
      for(let i=0; i<register.length; i++){
        if(register[i].id === req.session.userid){
          let campus = register[i].campus;
          return res.render('matching',{'loginbox': loginbox,'campus':campus});
        }
      }
    }); 
  });
});
server.post("/matching_process",(req,res)=>{
  let post = req.body;
  let selectmatch = post.selectmatch;
  let selectsex = post.selectsex;
  let close = post.close;
  let ok = post.ok;
  if(close){
    res.redirect('/matching');
    return false;
  }
  if(selectmatch === '매칭 종류 정하기' || selectsex ==="상대방 성별 정하기"){
    res.write("<script>alert('Please re-enter it.')</script>");
    return res.write("<script>window.location='/matching'</script>");
  }
  if(ok){
    db.query('SELECT * FROM register',function(err,register){
      for(let i=0; i<register.length; i++){
        if(register[i].id === req.session.userid){
          db.query('UPDATE register SET selectmatch=?,selectsex=? WHERE id=?',[selectmatch,selectsex,req.session.userid],function(err2,result){
            db.query('UPDATE usetrue SET matching=? WHERE user_id=?',['true',req.session.userid],function(err3,result2){
              return res.redirect('/makematch')
            });
          });
        }
      }
    });
  }
});
server.get("/makematch",(req,res)=>{
  db.query('SELECT * FROM register',function(err,register){
    for(let i=0; i<register.length; i++){
      if(register[i].id === req.session.userid){
        db.query('INSERT INTO submituser(user_id,user_sex,user_age,user_campus,user_selectcontact,user_contact,user_selectmatch,user_selectsex) VALUES(?,?,?,?,?,?,?,?)',[register[i].id,register[i].sex,register[i].age,register[i].campus,register[i].selectcontact,register[i].contact,register[i].selectmatch,register[i].selectsex],function(err,result){ 
          db.query("UPDATE register SET matched=? WHERE id=?",['true',register[i].id],function(err,result){
            res.write("<script>alert('Submission complete!')</script>");
            return res.write("<script>window.location='/'</script>");
          });
        });
      }
    }
  });
});

//회원가입 기능
server.get('/register', (req, res) => {
  res.render('register');
})
server.post("/register_process",(req,res) =>{
  let post = req.body
  let contact = post.selectcontact;
  let sex = post.sex
  if(contact === "NULL" || sex === "NULL"){
    res.write("<script>alert('Please check contact or sex.')</script>");
    return res.write("<script>window.location='/register'</script>");
  }
  db.query('SELECT * FROM register',function(err2,result){
    for(let i = 0; i < result.length; i++){
      if(result[i].id == post.id){
        res.write("<script>alert('This ID is already in use.')</script>");
        return res.write("<script>window.location='/register'</script>");;
      }
    }
    if(9<post.id.length<=10 && post.password.length>10){
      db.query('INSERT INTO register(id,password,sex,age,selectcontact,contact)VALUES(?,?,?,?,?,?)',
        [post.id,post.password,post.sex,post.age,post.selectcontact,post.contact],
        function(err3,end){
          req.session.registerId = post.id;
          req.session.save(function(){
            return res.redirect('/register2/A');
          });
      });
    }else{
      res.write("<script>alert('Please check id length or password length')</script>");
      return res.write("<script>window.location='/register'</script>");;
    }
  });
});

for(let alph in alphlist){
  server.get(`/register2/${alphlist[alph]}`,(req,res) =>{
    if(!req.session.registerId){
        return res.redirect('/register')
    }
    let campuslist = `
    <tbody id="searchcampus">
        <tr>
        <th colspan="2">
            <a href="/register2/A"><button type="button">ㄱ</button></a>
            <a href="/register2/B"><button type="button">ㄴ</button></a>
            <a href="/register2/C"><button type="button">ㄷ</button></a>
            <a href="/register2/D"><button type="button">ㄹ</button></a>
            <a href="/register2/E"><button type="button">ㅁ</button></a>
            <a href="/register2/F"><button type="button">ㅂ</button></a>
            <a href="/register2/G"><button type="button">ㅅ</button></a>
            <a href="/register2/H"><button type="button">ㅇ</button></a>
            <a href="/register2/I"><button type="button">ㅈ</button></a>
            <a href="/register2/J"><button type="button">ㅊ</button></a>
            <a href="/register2/K"><button type="button">ㅋ</button></a>
            <a href="/register2/L"><button type="button">ㅌ</button></a>
            <a href="/register2/M"><button type="button">ㅍ</button></a>
            <a href="/register2/N"><button type="button">ㅎ</button></a>
        </th>
        </tr>
    `
    const korcampus= require(`./korcampus/korcampus${alphlist[alph]}`)
    korcampus.forEach(function(korcampus){
        campuslist += `
        <tr> 
        <td colspan="2"><input type="submit" name ="selectcampus" value="${korcampus}"></td>
        </tr>`
    });
    campuslist+= `</tbody>`
    res.render('register2',{'campuslist':campuslist})
    });
}


server.post("/register2/process",(req,res)=>{
  let post = req.body;
  let selectcampus = post.selectcampus;
  if(selectcampus ==='err'|| selectcampus === undefined){
    res.write(`<script>alert('plase check campus')</script>`);
    return res.write("<script>window.location='/register2'</script>");
  }
  db.query("UPDATE register SET campus=? WHERE id=?",[selectcampus,req.session.registerId],function(err,result){
    return res.redirect("/register3");
  });
});


server.get('/register3', (req, res) => {
  if(!req.session.registerId){
    return res.redirect('/register')
  }
  res.render('register3');
})
server.post('/register3_process',upload.single('card'),(req,res) => {
  if(!req.file){
    res.write(`<script>alert('plase upload student card')</script>`);
    return res.write("<script>window.location='/register3'</script>");
  }
  db.query('UPDATE register SET student_card_root=? WHERE id=?',[req.file.filename,req.session.registerId],function(err,result){
    db.query("INSERT INTO usetrue(user_id,matchingtrue) VALUES(?,?)",[req.session.registerId,'null'],function(err3,result2){
      console.log(req.file.filename,req.session.registerId)
      return res.redirect('/login');
    });
  })
});

//로그인 기능
server.get('/login', (req, res) => {
  res.render('login');
})
server.post("/login/process",(req,res) =>{
  let post = req.body
  db.query('SELECT * FROM register',function(err,result){
    if(err){
      res.redirect('/login');
      return false;
    }
    for(let i = 0; i < result.length; i++){
      if(result[i].id === parseInt(post.id) && result[i].password === post.password && !result[i].matched){
        req.session.userid = result[i].id;
        req.session.login = true;
        req.session.registerId = null;
        req.session.save(function(){
          res.write(`<script>alert('Hi ${result[i].id} !')</script>`);
          return res.write("<script>window.location='/'</script>");
        });
        return false;
      }
      else if(result[i].id === parseInt(post.id) && result[i].password === post.password && result[i].matched){
        res.write(`<script>alert('plase wait matching')</script>`);
        return res.write("<script>window.location='/login'</script>");
      }
    }
  res.write("<script>alert('Please check id or password')</script>");
  return res.write("<script>window.location='/login'</script>");;
  });
});

server.get("/logout_process",(req,res) => {
  req.session.destroy(function(err){
    return res.redirect('/');
  })
});

server.listen(3000);