const express=require('express');
const cors=require('cors');
const app=express();
const mongo=require("./mongo")
const crypto = require('crypto-js');
const generate = require('secure-random-password');
var path = require("path");
const jwt = require('jsonwebtoken');


//working with POST and PUT requests
app.use(express.json()) //recognize incoming request as a JSON object
app.use(express.urlencoded({extended: true}));//recognize incoming requests as string or array
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

const User = require("./user.js");
const Sample = require("./sample.js");
const Password=require("./password.js");
const Token=require("./token.js");

app.get("/getuser",async(req,res)=>{
    const email=req.query.email;
    User.find({},(err,data)=>{
        if(err) console.log(err);

        for(var i = 0; i<data.length; i++)
        {
            const currentUser = data[i];

            const encuser = {
                T_name: crypto.AES.decrypt(currentUser.T_name, 'aes enc').toString(crypto.enc.Utf8),
                T_email: crypto.AES.decrypt(currentUser.T_email, 'aes enc').toString(crypto.enc.Utf8),
                password: crypto.AES.decrypt(currentUser.password, 'aes enc').toString(crypto.enc.Utf8),
                T_dob: crypto.AES.decrypt(currentUser.T_dob, 'aes enc').toString(crypto.enc.Utf8),
                T_gender: crypto.AES.decrypt(currentUser.T_gender, 'aes enc').toString(crypto.enc.Utf8),
                T_phone: crypto.AES.decrypt(currentUser.T_phone, 'aes enc').toString(crypto.enc.Utf8)
            }
            const finalUser = {
                T_name: crypto.DES.decrypt(encuser.T_name, 'cyber-sec-231-21').toString(crypto.enc.Utf8),
                T_email: crypto.DES.decrypt(encuser.T_email, 'cyber-sec-231-21').toString(crypto.enc.Utf8),
                password: crypto.DES.decrypt(encuser.password, 'cyber-sec-231-21').toString(crypto.enc.Utf8),
                T_dob: crypto.DES.decrypt(encuser.T_dob, 'cyber-sec-231-21').toString(crypto.enc.Utf8),
                T_gender: crypto.DES.decrypt(encuser.T_gender, 'cyber-sec-231-21').toString(crypto.enc.Utf8),
                T_phone: crypto.DES.decrypt(encuser.T_phone, 'cyber-sec-231-21').toString(crypto.enc.Utf8)
            }
            if(finalUser.T_email==email){
                res.render("view_user",{result:finalUser,id:currentUser._id});
            }
        }
    })
})

app.post("/adduser",(req,res)=>{
    
    console.log(req.body);
    const encuser = {
        T_name: crypto.DES.encrypt(req.body.T_name, 'cyber-sec-231-21').toString(),
        T_email: crypto.DES.encrypt(req.body.T_email, 'cyber-sec-231-21').toString(),
        password: crypto.DES.encrypt(req.body.password, 'cyber-sec-231-21').toString(),
        T_dob: crypto.DES.encrypt(req.body.T_dob, 'cyber-sec-231-21').toString(),
        T_gender: crypto.DES.encrypt(req.body.T_gender, 'cyber-sec-231-21').toString(),
        T_phone: crypto.DES.encrypt(req.body.T_phone, 'cyber-sec-231-21').toString()
    }
    const aesEnc={
        T_name: crypto.AES.encrypt(encuser.T_name, 'aes enc').toString(),
        T_email: crypto.AES.encrypt(encuser.T_email, 'aes enc').toString(),
        password: crypto.AES.encrypt(encuser.password, 'aes enc').toString(),
        T_dob: crypto.AES.encrypt(encuser.T_dob, 'aes enc').toString(),
        T_gender: crypto.AES.encrypt(encuser.T_gender, 'aes enc').toString(),
        T_phone: crypto.AES.encrypt(encuser.T_phone, 'aes enc').toString()
    }
    const newuser = new User(aesEnc);
    const sampleUser=new Sample(req.body);
    sampleUser.save();
    newuser.save();
})

app.get('/edit/:id',(req,res)=>{
    res.render("edit_user",{id:req.params.id}); 
})

app.get('/showPass',async (req,res)=>{
    const email=req.query.email;
    const details=await Password.find({user:email});
    const token=await Token.find({user:email});
    if(token.length==0) res.render('passphrase',{"message":null});
    else res.render('passphrase',{"message":"show"});
});

app.post('/createPass',(req,res)=>{
    const addNew=req.body;
    const newPass=new Password({
        user:addNew.user,
        password:crypto.DES.encrypt(generate.randomPassword(), 'cyber-sec-231-21').toString(),
        label:addNew.label
    });
    newPass.save();
    res.render("message",{"message":"Password Created!"});
})

app.post('/loginUser',async (req,res)=>{
    const email=req.body.email;
    const users=await User.find({});
    let found=false;
    users.forEach(user=>{
        const email1=crypto.AES.decrypt(user.T_email, 'aes enc').toString(crypto.enc.Utf8);
        const finalEmail=crypto.DES.decrypt(email1, 'cyber-sec-231-21').toString(crypto.enc.Utf8);

        if(finalEmail==email){
            const pass1=crypto.AES.decrypt(user.password, 'aes enc').toString(crypto.enc.Utf8);
            const finalPass=crypto.DES.decrypt(pass1, 'cyber-sec-231-21').toString(crypto.enc.Utf8);
            if(finalPass==req.body.pass) found=true;
        }
    });
    if(found) res.render("dashboard",{"email":email});
    else res.render("message",{"message":"User not registered/Wrong Password"});
})

app.get('/createPassword',(req,res)=>{
    res.render('create_password');
})

app.post('/createToken',async(req,res)=>{
    const passphrase=req.body.pass;
    const user=req.body.user;
    const token = jwt.sign({ user: user }, passphrase);
    const newToken=new Token({user:user,pass_token:token});
    newToken.save();
    res.render("message",{"message":"Token Created!"});
})

app.post('/verifyToken',async(req,res)=>{
    const tokenArray=await Token.find({user:req.body.user});
    const token=tokenArray[0].pass_token;

    try{
        const verifyEmail=jwt.verify(token,req.body.pass).user;
        console.log(jwt.verify(token,req.body.pass));
        if(verifyEmail==req.body.user) {
            const passwords=await Password.find({user:req.body.user});
            let details=[];
            passwords.forEach(pass=>{
                const dePass={
                    user:pass.user,
                    password:crypto.DES.decrypt(pass.password, 'cyber-sec-231-21').toString(crypto.enc.Utf8),
                    label:pass.label
                }  
                details.push(dePass);
            })
            res.render("view_password",{"details":details});
        }
    } catch(err){
        console.log(err);
        res.render("message",{"message":"Incorrect Passphrase!"});
    }
})

app.listen(5000,async ()=>{console.log(`Server is listening on port 5000`);await mongo()});




