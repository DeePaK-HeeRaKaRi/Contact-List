const mongoose = require ('mongoose')
const contactschema=new mongoose.Schema({
    ContactName:{
        type:String,
        required:true
    },
    ContactPhone_no:{
        type:String,
        required:true
    },
});
const Contact = mongoose.model('Contact DB',contactschema)
module.exports=Contact;