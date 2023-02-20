// 기본 세팅
const express = require("express");
const server = express();
const mysql = require('mysql');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
// 모듈 불러오기
const overlap = require("./overlapJS/overlap");
const repeatscript = require("./overlapJS/overlapscript");
const repeatcss = require('./overlapJS/overlapcss');  
const indexbody = require('./indexJS/indexbody');
const userlogin = require('./loginJS/login');
const userregister = require('./registerJS/register');
const userregister2 = require('./registerJS/register2');
const userregister3 = require('./registerJS/register3');
const matching = require('./matchingJS/matching');
// ROUTER 불러오기
const register2router = require('./Router/register2');

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

//login,logout 버튼 구현
var loginbutton = `<li><a class="dropdown-item" href="/login">로그인</a></li>
<li><a class="dropdown-item" href="/register">회원가입</a></li>`;
var logoutbutton = '';  
 
function logintrueindex(req,res){
  if(req.session.login){
    loginbutton = '';
    logoutbutton = `<li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" href="/logout_process">로그아웃</a></li>`;
  }else{
    loginbutton = `<li><a class="dropdown-item" href="/login">로그인</a></li>
      <li><a class="dropdown-item" href="/register">회원가입</a></li>`;
    logoutbutton = ''
  }
}

// use 메서드 사용
server.use(bodyParser.urlencoded({ extended: false}));
server.use(express.static('assets'));
server.use(session({
  secret: 'q1321weff@45%$',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))
server.use('/register2',register2router);

// 홈
server.get("/", (req, res) => {
  logintrueindex(req,res)
  let count = 0;
  db.query('SELECT * FROM usetrue',function(err,usetrue){
    for(let i=0; i<usetrue.length; i++){
      if(usetrue[i].matching === "true"){
        count += 1;
      }
    }
    return res.send(overlap.repeat(repeatcss,indexbody(count),``,repeatscript,loginbutton,logoutbutton));
  });
});

// 매칭
server.get("/matching",(req,res)=> {
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
          return res.send(overlap.repeat(repeatcss,matching.home(campus),``,repeatscript,loginbutton,logoutbutton));
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
              res.write("<script>alert('Submission complete!')</script>");
              return res.write("<script>window.location='/makematch'</script>");
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
            return res.redirect('/');
          });
        });
      }
    }
  });
});
//회원가입 check 0219 -> 
server.get("/register", (req, res) => {
  res.send(userregister(repeatcss,repeatscript));
});

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

server.get("/register3",(req,res)=>{
  if(!req.session.registerId){
    return res.redirect('/register')
  }
  return res.send(userregister3(repeatcss,repeatscript));
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


//로그인 check 0219 -> ok
server.get("/login", (req, res) => {
  res.send(userlogin(repeatcss,repeatscript));
});

server.post("/login_process",(req,res) =>{
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

// 로그아웃 
server.get("/logout_process",(req,res) => {
  req.session.destroy(function(err){
    return res.redirect('/');
  })
});

server.listen(3000);