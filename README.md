# address_book_api
Restful api with ElasticSearch

SETUP AND RUN COMMANDS

Install: npm install

Run: nodemon -OR- node start

For testing I recommend Postman
ElasticSearch is running on port 9200
Express App in running on port 3000

({Also FYI ran into an issue with creating form data for new contact with Postman.
I created two objects that user can change to add and update new contact for addressbook})

GET - http://localhost:3000/contact/{name}
POST - http://localhost:3000/contact
PUT - http://localhost:3000/contact/{name}
DELETE - http://localhost:3000/contact/{name}
GET - http://localhost:3000/contact/size/{#num}


