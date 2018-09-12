// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const log = require('../logger');
const util = require('util');
const _ = require('lodash');

// returns a hook function that sends an SMS
module.exports = function (opts={}) {
    const { 
        phone=undefined,            // context path to the message to send
        message=undefined,          // context path to the phone number to SMS to
        region='ap-southeast-2', 
        prefix='+61',
    } = opts;
    return context => {
        // Create publish parameters
        const params = { 
            Message: _.get(context, message), 
            PhoneNumber: _.get(context, phone) 
        };
        // remove any leading 0 from the phone number
        if (params.PhoneNumber.slice(0,1) == '0') params.PhoneNumber = params.PhoneNumber.slice(1);
        // add the country prefix if it isnt present
        if (params.PhoneNumber.slice(0,1) != '+') params.PhoneNumber = prefix + params.PhoneNumber;
        
        log.info(util.inspect(params));

        // Set region
        AWS.config.update({ region });

        // Create promise and SNS service object
        const SNSservice = new AWS.SNS({apiVersion: '2010-03-31'});
        SNSservice.setSMSAttributes({ attributes: { DefaultSenderID: 'UpRide' } }).promise()
        .then(data => SNSservice.publish(params).promise())
        .then(data => log.info(`SMS MessageID is ${data.MessageId}`))
        .catch(err => log.error(err.stack));
    };
};
  
