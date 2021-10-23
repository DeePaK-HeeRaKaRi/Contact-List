const mongoose = require ('mongoose')
const contactschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_no:{
        type:String,
        required:true
    },
});
const Contact = mongoose.model('Contact DB',contactschema)
module.exports=Contact;