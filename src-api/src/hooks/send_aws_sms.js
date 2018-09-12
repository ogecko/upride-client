// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const log = require('../logger');
const util = require('util');

// returns a hook function that sends an SMS
module.exports = function (opts={}) {
    const { 
        region='ap-southeast-2', 
        prefix='+61',
    } = opts;
    return context => {

         log.info(util.inspect(context));

        // // Set region
        // AWS.config.update({ region });

        // // const phoneNumber = clean_phone_number(prefix, get_phone(context));

        // // Create publish parameters
        // const params = {
        //     Message: 'This is the text message', /* required */
        //     PhoneNumber: `${prefix}434799708`,
        // };

        // // Create promise and SNS service object
        // const SNSservice = new AWS.SNS({apiVersion: '2010-03-31'});
        // SNSservice.publish(params).promise()
        //     .then(data => {
        //         log.info(`SMS MessageID is ${data.MessageId}`);
        //     })
        //     .catch(err => {
        //         log.error(err.stack);
        //     });

    };
  };
  
