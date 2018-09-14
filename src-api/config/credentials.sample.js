// WARNING - This file is a sample credentials file 
//  * Copy this file to config/credentials.js and add credentials to any of the services you want to use
//  * Ensure that the config/credentials.js file is NEVER stored in git or any other config management
//  * Ensure that the config/credentials.js file is NEVER in publicly accessible areas (eg client side code, web server)
//  * When making changes to the structure of this file
//      1. Make a copy of config/credentials.js to config/credentials.sample.js
//      2. REMOVE all key values using this REGEX [^"]*(?=[^}],$)


module.exports = {
  aws_keys: {
    // Use EC2 IAM roles to share permissions with this node app
    // Use the AWS Console to create an IAM role called smsPublishingRole with full permissions on SNS
    // Ensure that any EC2 instances this app executes on have the IAM role smsPublishingRole
  },
  stripe_keys: {
    test: {
      publishable_key: "",
      secret_key: "",
      connect_client_id: "",
    },
    live: {
      publishable_key: "",
      secret_key: "",
      connect_client_id: "",
    },
  }
}