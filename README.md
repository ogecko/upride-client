# upride-client
Recharge and refresh while in your Ride-Share vehicle
![](src/assets/logo.png)


## Deployment
This application is deployed as a Node:Alpine Docker image which runs an Express Server containing
1. A Quasar:Vue based Single Page Application served from /public
2. A Feathers based set of micro-services served from /api

### On the AWS Console
 Under the IAM Service, create a new access key under a Users Security Credentials. Remember the Access keyID and Secret access key, using them on the `aws configure` command in the next section.

### On the AWS EC2 Server
install the AWS CLI.
```
sudo apt-get install pip-python
pip install awscli --upgrade --user
aws --version
aws configure
```
Run the aws ecr get-login command
```
$(aws ecr get-login --no-include-email --region ap-southeast-2)
```
Run the following commands to pull and run the container
```
docker pull 438078403446.dkr.ecr.ap-southeast-2.amazonaws.com/upride:latest
docker stop upride
docker rm upride
docker run -d --network="bridge" --expose 8080 --name upride 438078403446.dkr.ecr.ap-southeast-2.amazonaws.com/upride:latest
```