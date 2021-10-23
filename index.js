const Express=require('express');
const path=require('path');
const port=8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
// const connect_contact =require('./models/contact')
const app=Express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views_list'));
app.use(Express.urlencoded());
// middeleware 1

// app.use(function(req,resp,next){
//     console.log('Middleware 1 called')
//     req.myname="deepak-heerakari"
//     next()
// })

// // middeleware 2
// app.use(function(req,resp,next){
//     console.log('Middleware 2 called')
//     console.log('myname from middle ware 2',req.myname)
//     next()
// })
app.use(Express.static('assets'))

// var contact_list =[
//     {
//         name:"deepak",
//         phone_no:"1234567890"
//     },
//     {
//         name:"coding",
//         phone_no:"4568791230"
//     },
//     {
//         name:"Ninjas",
//         phone_no:"5893214700"
//     },
// ]

app.get('/contacts',function(req,resp){
    Contact.find({},function(err,contacts_fetch){
        if (err){
            console.log("Error in Fetching Contacts from DB")
            return
        }
        return resp.render('contacts',{
            title_name:"Contact List",
            contactList:contacts_fetch,
    
        });
    })
    
    //resp.send('<h1>Hey,This is my profile page</h1>')
});
app.post('/create_contact',function(req,resp){
    // return resp.redirect('home')
    // contact_list.push({
    //     name:req.body.name,
    //     phoneno:req.body.phoneno
    // })
    // console.log(req.body)
    // contact_list.push(req.body)
    Contact.create({
        name:req.body.name,
        phone_no:req.body.phone_no
    },function(err,newcontact){
        if (err){
            console.log("Error in creating contacts!!")
            return;
        }
        console.log("*********",newcontact);
        return resp.redirect('/contacts');
    })
    
})
app.get('/delete-contact/',function(req,res){
    // console.log(req.params)
    // let phone_nn=req.params.phone_nn
    // console.log("phone is ",phone_nn)
    //  let contactIndex=contact_list.findIndex(contact => contact.phone_no == phone_nn)
    
    // if (contactIndex != -1){
    //     contact_list.splice(contactIndex,1)
    // }
    let id =req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if (err){
            console.log("Error in Deleting Data From Database!!")
            return;
        }
        return res.redirect('/contacts')
    })
    
})
app.get('/home',function(req,resp){
    console.log("when page in home it is printing",req.myname)
    return resp.render('home',{
        title_name:"My Contact List",
        para_name:"Rendered Para",

    });
    //resp.send('<h1>Hey,This is my profile page</h1>')
});
app.get('/play',function(req,resp){
    console.log("when page in play it is printing ",req.myname)
    return resp.render('practice',{
        title_name:"My PlayGround",
    });
    
});
app.get('/home',function(req,resp){
    return resp.send('<h1>Hey,This is my home page</h1>')
})

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err)
    }
    console.log("Yup ! My Server is running on port:",port)
});