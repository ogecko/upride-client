// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const log = require('../logger');
const _ = require('lodash');
const { aws_keys } = require('../../config/credentials');

// returns a hook function that sends an SMS
// need to ensure EC2 instance has smsPublishingRole (under SNS)
// need to ensure SMS Default spend limit in AWS has been increased beyond $1/m default

module.exports = function (options={}) {
    const { 
        message=undefined,          // context path to the message to send
        mobile=undefined,           // context path to the mobile number to SMS to
        sender='NOTICE',            // fixed senderID of SMS message
        region='ap-southeast-2', 
        prefix='+61',
        mode=aws_keys.mode,
    } = options;
    return context => {
        // Create publish parameters
        const params = { 
            Message: _.get(context, message), 
            PhoneNumber: _.get(context, mobile) 
        };
        // remove any leading 0 from the mobile number
        if (params.PhoneNumber.slice(0,1) == '0') params.PhoneNumber = params.PhoneNumber.slice(1);
        // add the country prefix if it isnt present
        if (params.PhoneNumber.slice(0,1) != '+') params.PhoneNumber = prefix + params.PhoneNumber;
        
        log.info(`Sent SMS from ${sender} to ${params.PhoneNumber} containing ${params.Message}`);

        if (mode=='live') {
            // Set region
            AWS.config.update({ region });

            // Create promise and SNS service object
            const SNSservice = new AWS.SNS({apiVersion: '2010-03-31'});
            SNSservice.setSMSAttributes({ 
                attributes: { 
                    DefaultSenderID: sender,
                    DefaultSMSType: 'Transactional',
                } 
            }).promise()
            .then(data => SNSservice.publish(params).promise())
            .then(data => log.info(`SMS MessageID is ${data.MessageId}`))
            .catch(err => log.error(err.stack));
        }
    };
};
  
