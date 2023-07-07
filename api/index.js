const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require('./model/user');
const Post = require('./model/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookiePraser = require('cookie-parser');
const multer = require('multer');
const upload= multer({dest:'uploads/'});
const fs = require('fs');
const path = require('path');
const { findById } = require('./model/user');

const secret = bcrypt.genSaltSync(10);

app.use(cors({credentials:true,origin:'https://main--wonderful-taiyaki-2f2eef.netlify.app/'}));
app.use(express.json())
app.use(cookiePraser());
app.use('/uploads', express.static(__dirname+'/uploads'));

mongoose.connect('mongodb+srv://yashsharmaharsh:yashsharma29@cluster0.kh07rwv.mongodb.net/?retryWrites=true&w=majority')

const key = "yabjsbjcbbcidscibjbcuiowqguidinxmsncksjcoip"

app.post('/register', async function(req, res) {
    const secret = await bcrypt.genSalt(10);
    const { username, pass } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedpass = await bcrypt.hash(pass, secret);
    const newUser = new User({
      username: username,
      pass: hashedpass
    });
    try {
      const user = await newUser.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
app.post('/login', async function(req, res) {
    const { username} = req.body;
    const userdata = await User.findOne({ username });
  
    if (!userdata) {
      res.send(false);
      return;
    }
    const passcheck = await bcrypt.compare(req.body.pass, userdata.pass);
    if (passcheck) {
        jwt.sign({username,id:userdata._id},key,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token).json({
              id: userdata._id,
              username
            });
        })
    }
     else {
      console.log(false);
    }
  });

  app.get('/profile', function(req,res){
  const {token} = req.cookies;
  jwt.verify(token,key,{},(err,info)=>{
    if(err) 
    {
            throw err;
        }
        res.json(info);
    });
    res.json(req.cookies);
})

app.post('/logout',(req,res)=>{
res.cookie('token','').json('ok');
})

app.post('/post',upload.single('file'),async (req,res)=>{
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;  
    jwt.verify(token,key,{},async (err,info)=>{
      if(err) throw err;
          const{title,summary,content}= req.body
          const postdata = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author: info.id,
          })
      
      res.json(postdata);
  });

}
})
app.get('/post',async function (req,res){
res.json(await Post.find()
.populate('author',['username'])
.sort({createdAt: -1})
.limit(20)
);
});

app.get('/post/:id',async (req,res)=>{
  const {id} = req.params;
  const postdata = await Post.findById(id).populate('author',['username'])
  res.json(postdata)
})

app.listen(4000,function(){
    console.log('Port is listening');
})
