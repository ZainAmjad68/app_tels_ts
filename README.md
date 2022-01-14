# app_tels
IN-1283




# Deployment

Steps for Production (already done):

Create the Lambda function: (delete the claudia.json file before) `claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1`
This will return the URL that can be used to access the API
Define the `AWS_PRODUCTION_ACCESS_KEY_ID` and `AWS_PRODUCTION_SECRET_ACCESS_KEY` on GitHub secrets.
Still need to manually deploy on Production upon any change using `npm run release:automated:production`
Create the DynamoDB table: `aws dynamodb create-table --cli-input-json file://create-table-workorders.json --region us-east-1`
Don't need to define access key and secret as they are automatically put in env variables and picked up by the AWS SDK when making calls to DynamoDB