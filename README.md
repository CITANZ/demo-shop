## Overview

This is a demo of CITANZ's eCommerce module. CITANZ members may use this repo to practise and familiarise themselves with SilverStripe 4.

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

Cita_eCommerce_PaymentMethod_POLi='{"CERT":"CERT_PATH","CLIENTCODE":"POLI_CLIENT_CODE","AUTHCODE":"POLI_AUTH_CODE"}'
Cita_eCommerce_PaymentMethod_DPS='{"ID":"DPS_CLIENT_ID","Key":"DPS_CLIENT_KEY"}'
Cita_eCommerce_PaymentMethod_Paystation='{"pstn_pi":"PAYSTATION_ID","pstn_HMAC":"PAYSTATION_HMAC"}'
Cita_eCommerce_PaymentMethod_Stripe='{"key_dev":"STRIPE_DEV_KEY","secret_dev":"STRIPE_DEV_SECRET","key":"STRIPE_LIVE_KEY","secret":"STRIPE_LIVE_SECRET"}'

```
Once you've completed above, go to the browser and type in http://YOURSITE/dev/build?flush=all (then hit enter)


### Frontend ###
go into `frontend` directory, run `npm install`, and wait for it to finish, and then `run npm run dev` (more commands are defined in `package.json` > `scripts` property)

## Links ##

 * [SilverStripe Lessons] https://www.silverstripe.org/learn/lessons/v4/
