const express = require("express");
const mongoose = require("mongoose");
//const item = require("./modals/items");
// modal import
const  item = require('./modals/items');
const app = express();
app.use(express.urlencoded({extended:true}));
// mongooose connection

const mongodb = `mongodb+srv://bhanu:bhanu@cluster0.eg08f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongodb,{useNewUrlParser:true, useUnifiedTopology:true, }).then(()=>console.log('conected to databbase')).catch(err=>console.log(err));


// mongoose end
app.set('view engine','ejs');





/*
//insert into mogodb
app.get('/create-item',(req,res)=>{
  const ob = new item({
    name:"Akansha",
    price:20000
  });
  ob.save().then(result=>res.send(res.send(result)));
})
// find
app.get('/get-item',(req,res)=>{
 
  item.find().then(result=>res.send(res.send(result))).catch(e=>{console.log(e)});
})
// finf by id
app.get('/get-itemid',(req,res)=>{
 
  item.findById("61513a822e5aa2a9b7214b05").then(result=>res.send(res.send(result))).catch(e=>{console.log(e)});
})
*/
app.get("/",(req,res)=>{
  // for static page  res.sendFile("./views/index.html",{root:__dirname}); Routes is not change
/*
  const items=[
    {name:"Bhanu Mobile", price:2000},
    {name:"Anita Mobile", price:2000},
    {name:"Akansha Mobile", price:2000}
  ]

  res.render('index',{items:items}{title2:"Rakshit"});*/
  res.redirect('/get-item');
})
app.get('/get-item',(req,res)=>{
 
  item.find().then(result=>{
    
    res.render('index',{items:result});
  }).catch(e=>{console.log(e)});
})
app.get("/add-item",(req,res)=>{
  res.render('additem');
  //  res.sendFile("./views/additem.html",{root:__dirname}); 
})

// post form data to database
app.post('/items',(req,res)=>{
//console.log(req.body);
const ob =item(req.body);
ob.save().then(()=>{
  res.redirect('/get-item').catch(e=>{console.log(e)});
}); 
})
// id rout
app.get('/items/:id',(req,res)=>{
//console.log(req.params);
const id = req.params.id;
item.findById(id).then(result=>{
 // console.log('result', result);
  res.render("item-details",{items:result});
})

});

// delete
app.delete('/items/:id',(req,res)=>{
  const id = req.params.id;
  item.findByIdAndDelete(req.params.id).then(result=>{
    res.json({redirect:'/get-item'});
  })
  });

  //update
  app.put('/items/:id',(req,res)=>{
    const id = req.params.id;
    item.findByIdAndUpdate(id,req.body).then(result=>{
      res.json({msg:"update sucessfully"});
    })
    });

app.use((req,res)=>{
     res.render('404');
  ///   res.sendFile("./views/404.html",{root:__dirname});
})


app.listen(3000,()=>{console.log('connected to server')});