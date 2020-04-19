## Build Status
[![CITANZ](https://circleci.com/gh/CITANZ/demo-shop.svg?style=svg)](https://circleci.com/gh/CITANZ/demo-shop)

currently hosting on [https://demoshop.cita.org.nz/](https://demoshop.cita.org.nz/)

## Overview ##

This is a demo of CITANZ's eCommerce module. CITANZ members may use this repo to practise and familiarise themselves with SilverStripe 4.

## NOTE ##
If you are having difficulty setting up demo-shop and getting it to run, you are strongly recommended reading through [SilverStripe Lessons] https://www.silverstripe.org/learn/lessons/v4/, especially https://www.silverstripe.org/learn/lessons/v4/up-and-running-setting-up-a-local-silverstripe-dev-environment-1

## Installation ##

`git pull` or `git clone` the repo to your environment, and then:

### Backend ###
run `composer update` at wwwroot, and wait for it's finished.

#### .env file example ####
Now create a `.env` file at wwwroot, with below content -- please replace the CAP_VARs with your own information
```
SS_DATABASE_CLASS="MySQLPDODatabase"
SS_DATABASE_SERVER="YOUR_DB_ADDRESS"
SS_DATABASE_USERNAME="YOUR_DB_USERNAME"
SS_DATABASE_PASSWORD="YOUR_DB_PASSWORD"
SS_DATABASE_NAME="YOUR_DB_NAME"

SS_DEFAULT_ADMIN_USERNAME="defaultadmin"
SS_DEFAULT_ADMIN_PASSWORD="passw0rd"

SS_ENVIRONMENT_TYPE="dev"
SS_ERROR_LOG="silverstripe.log"

PaymentExpress_PxPay='{"username":"DPS_CLIENT_ID","password":"DPS_CLIENT_KEY","testMode":true}'
PayPal_Express='{"username":"your-business-facilitator_api1.hotmail.com","password":"YOUR_PASSWORD","signature":"YOUR_SIGNATURE","testMode":true}'
Poli='{"merchantCode":"POLI_CLIENT_CODE","authenticationCode":"POLI_AUTH_CODE"}'
Paystation_Hosted='{"paystationId":"PAYSTATION_ID","hmacKey":"PAYSTATION_HMAC","gatewayId":"PAYSTATION","testMode":true}'
Stripe='{"apiKey":"STRIPE_SECRET","privateKey":"STRIPE_KEY"}'
```

NB: If it's a prod environment, please remove `# remove "testMode":true` from the gateway's config

Once you've completed above, go to the browser and type in http://YOURSITE/dev/build?flush=all (then hit enter)


### Frontend ###
go into `frontend` directory, run `npm install`, and wait for it to finish, and then `run npm run dev` (more commands are defined in `package.json` > `scripts` property)


# Docker set-up

You can go with MAMP/WAMP/LAMP solutions or docker to set up the development environment. To try it out with docker, install Docker Desktop For Mac/Winodws as a start. Then

```shell
cd docker
docker-compose up -d
```

this command will spin up a ss4 container and a mysql container with username as root and an empty password. In order to connect mysql from ss4 container, connection parameter in .env file must be specified as below:

```
SS_DATABASE_SERVER="db_mysql"
SS_DATABASE_USERNAME="root"
SS_DATABASE_PASSWORD=""
SS_DATABASE_NAME="demo_shop"
```

Also, you must use mysql client(i.e Mysql Workbench) to connect database, create a demo_shop schema using utf-8 charset.


if you would like to mess up with your own docker file or start script, remember `docker-compose build ss4` to make it effective;

## Debugging

check logs of ss4:

`docker logs --follow ss4`

tap into the ss4:

`docker exec -it ss4 /bin/bash` when it's RUNNING.
