//require library
const mongoose =require('mongoose');
// connect to db
mongoose.connect('mongodb://localhost/contact_list_db')
// accquire the connection to check if it is successfull
const db = mongoose.connection
// error
db.on('error',console.error.bind(console,"Error Connecting to The Database !!"))
// up  & Running then print the message
db.once('open',function(){
    console.log("Yay ,Successfully Connected to The Database ")
})