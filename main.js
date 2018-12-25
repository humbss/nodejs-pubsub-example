require('dotenv').config();

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

// In this example, the message is current time
const data = new Date().toString();
const dataBuffer = Buffer.from('this is a message from client at: '+data);
const topicName = 'orders';

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