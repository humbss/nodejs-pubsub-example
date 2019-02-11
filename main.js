require('dotenv').config();

const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

// In this example, the message is current time
const data = new Date().toString();

const topicName = 'products';
var noentries = process.argv[2];

function sendBulk() {
    for (i = 0; i < noentries; i++) {
        var message = {
            "id": i,
            "insertDate": new Date(),
            "productName": "Entry no: " + i,
            "value": getRandomArbitrary(1,1000)
        };

        const dataBuffer = Buffer.from(JSON.stringify(message));

        pubsub
            .topic(topicName)
            .publisher() 
            .publish(dataBuffer)
            .then(messageId => {
                console.log(`Message ${messageId} published.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
sendBulk();

