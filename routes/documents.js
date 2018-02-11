
var elastic = require('../elasticsearch');
const express = require('express');
const router = express.Router()

//To Test CREATE_CONTACT, populate object with user data
const newContact = {
    name: "Bob",
    email: 'Bobdoe@gmail.com',
    phone: '343-343-4444',
    tags: ["contact"]
}


//To Test UPDATE_CONTACT, populate object with UPDATED user data
const newData = {
    name: "Jack",
    email: 'Jackdoe@gmail.com',
    phone: '333-333-3333',
    tags: ["contact"]
}


//PING
router.get('/', function (req, res, next) {
    elastic.ping()
    res.render('index', { title: 'Express' });
});


// GET
router.get('/contact/:user_name', function (req, res, next) {
    let _id = req.params.user_name
    elastic.getContact(req, res, _id)
})


//GET ALL
router.get('/contact/size/:size', function (req, res, next) {
    let data = req.params.size
    elastic.queryContacts(req, res, data)
})


// POST
router.post('/contact', function (req, res, next) {
    console.log(req.body)
    let contact = newContact;
    elastic.createContact(req, res, contact)
})


// PUT
router.put('/contact/:name', function (req, res, next) {
    console.log('in put route', req.params, req.body)
    let data = newData
    let _id = req.params.name
    elastic.updateContact(req, res, _id, data)
})


// DELETE
router.delete('/contact/:name', function (req, res, next) {
    let _id = req.params.name
    elastic.removeContact(req, res, _id)
})

module.exports = router;