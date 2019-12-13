const express = require('express');
const path = require('path');

const port = 8000;
const app = express();

app.set('view engine', 'ejs');
//app.set('views',);
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware1
// app.use(function(req,res,next){
//     req.myName="Arpan";
// //console.log("middleware 1 called");
// next();
// })

// //middleware2
// app.use(function(req,res,next){
//     console.log("My name from MW2",req.myName);
//     //console.log("middleware 2 called");
//     next();
// })

var contactList = [
    {
        name: "Akhil",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "123456789"
    },
    {
        name: "Coding Ninjas",
        phone: "987654321"
    }
]
app.get('/', function (req, res) {
    // console.log(req);
    //console.log(__dirname); 
    //res.send('<h1>Cool,it is running! or is it?</h1>');
    console.log("from the get route controller", req.body.myName);
    return res.render('home', {
        title: "Contacts List", contact_list: contactList
    });
});

app.get('/practice', function (req, res) {
    return res.render('practice', { title: "Let us play with ejs" });
});

app.post('/create-contact', function (req, res) {
    // console.log(req);
    //return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    contactList.push(req.body);
    //return res.redirect('/');
    return res.redirect('/');
});

//for deleting a contact
app.get('/delete-contact', function (req, res) {
    //console.log(req.query);

    //get the query from url
    let phone = req.query.phone;

    let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    
if(contactIndex!=-1){
contactList.splice(contactIndex,1);
return res.redirect('back');
}

});

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }

    console.log('Yup! My Express server is running on port:', port);
});