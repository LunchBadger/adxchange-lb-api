Each of the plugins was moved to Loopback models

Email and Coinbase models use the same code that was originally developed.

Note: By default loopback has implementation of POST to `/modelpath`
to override it the following construct is required 
```
module.exports = function (MailSender) {.   // standard declaration
    MailSender.on('dataSourceAttached', function (obj) { // hook to wait for datasource connection (Memory connector)
        MailSender.create = function (mail, params, cb) { // override of POST /modelname 
             // actual code 
                 // cb(null, results)  to return results 
                 // cb(err) to return error
 ```
 
to test Mail model use 
```
curl -X POST \
  http://[...]/send-email \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
    "cost": "1",
    "cpms": ["34"],
    "to":"custom@mail.com",
    "cpmMobile": "45",
    "days": "5",
    "desktopUrl": "http://dc.com",
    "mobileUrl": "http://mc.pm"
}'
``` 


the `fbUser` model once connected to database (MSSQL or MySQL or any other db) will return and save objects. No custom code or SQL query is required. Handled by loopback connector 

This project is already imported into LB and exposed via Gateway, Al will show that on demo
