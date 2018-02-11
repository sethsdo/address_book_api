//'use strict'

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
const indexName = 'addresses'
const docType = 'contact'

module.exports = {
    ping: () => {
        client.ping({
            requestTimeout: 30000,
        }, function (error) {
            if (error) {
                console.error('elasticsearch cluster is down!');
                return res.json(error)
            } else {
                console.log('All is well');
            }
        })
    },

    //CREATE
    createContact: (req, res, contact) => {
        return client.index({
            index: indexName,
            type: docType,
            id: contact.name,
            body: contact
        }, function (error, response) {
            if (error) return res.json(error);
            //if your want it dysplayed in the browser
            //res.render('index', { title: res.json(response) })
            return res.json(response)
        });
    },

    //READ CONTACT
    getContact: (req, res, _id) => {
        return client.search({
            index: indexName,
            type: docType,
            q: _id
        }, (error, data) => {
            if (error) return error
            //if your want it dysplayed in the browser
            //res.render('index', { title: res.json(data.hits.hits) })
            return res.json(data.hits.hits) 
        })
    },

    //QUERY CONTACTS
    queryContacts: (req, res, data) => {
        console.log(data, "right here")
        return client.search({
            index: indexName,
            type: docType,
            size: data,
        }, (error, data) => {
            if (error) return error
            //if your want it dysplayed in the browser
            //res.render('index', { title: res.json(data.hits.hits) })
            return res.json(data.hits.hits)
        })
    },
    //UPDATE
    updateContact: (req, res, _id, data) => {
        console.log(data, 'in update')
        return client.update({
            index: indexName,
            type: docType,
            id: _id,
            body: {
                doc: data
            }
        }, (error, response) => {
            if (error) return res.json(error);
            return res.json(response)
        });
    },
    //DELETE
    removeContact: (req, res, _id) => {
        return client.deleteByQuery({
            index: indexName,
            q: _id
        }, function (err, resp) {
            if (err) return res.json(err);
            return res.json(resp)
        })
    },

    //mapping
    initMapping: () => {
        return client.indices.putMapping({
            index: indexName,
            type: docType,
            body: {
                properties: {
                    title: { type: "string" },
                    content: { type: "string" },
                    suggest: {
                        type: "completion",
                        analyzer: "simple",
                        search_analyzer: "simple",
                        payloads: true
                    }
                }
            }
        });
    }
}