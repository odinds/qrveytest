# Serverless base RESTful API
Base serverless RESTful API structure following clean architecture patterns. Technologies used:
  - Serverless framework with AWS Cloud Platform;
  - Node.js;
  - Typescript;
  - DynamoDB;


## Prerequisites
To get the project up and running you will need:
 - Aws account;
 - Node.js and npm;
 - Aws IAM user credentials with all necessary permissions;
 - aws-sdk installed and configured with credentials;
 - Serverless framework installed and configured;


## Install dependencies and run
 - $ npm install
 - $ sls create_domain (if necessary, also create a certificate for the custom domain)
 - $ sls dynamodb install
 - $ ./start_local_services.sh
 - $ npm start
 
 ## DOCUMENTS
 -  DOC 1_ aws create infraestucture apigateway and resource.docx
 -  DOC 2 _ Serverless deploy.docx
 
 ## PHOTOS
 - Coverage 1
 - Coverage 2
 
