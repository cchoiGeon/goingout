const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser')

const repeatscript = require("../overlapJS/overlapscript");
const repeatcss = require('../overlapJS/overlapcss');  
const userregister2 = require('../registerJS/register2');

const alphlist = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];

const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '11111111',
  database : 'going_out'
});
db.connect();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(express.static('assets'));
router.use(session({
  secret: 'q1321weff@45%$',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

for(let alph in alphlist){
    router.get(`/${alphlist[alph]}`,(req,res) =>{
    if(!req.session.registerId){
        return res.redirect('/register')
    }
    var campuslist = `
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
    const korcampus= require(`../korcampus/korcampus${alphlist[alph]}`)
    korcampus.forEach(function(korcampus){
        campuslist += `
        <tr> 
        <td colspan="2"><input type="submit" name ="selectcampus" value="${korcampus}"></td>
        </tr>`
    });
    campuslist+= `</tbody>`
    res.send(userregister2(repeatcss,campuslist,repeatscript))
    });
}
router.post("/process",(req,res)=>{
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

module.exports = router;