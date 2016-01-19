## Nest Alarms sample app built with angular.js

Simple web app built with angular.js that shows all alarms in first user propery and allows to change `away` status.

## Running

``` sh
npm i && bower i
gulp dev
node server.js
```

You need to change CLIENT_ID and CLIENT_SECRET if you want to work with your account(if env vars are not present app will use my id and secret)

``` sh
export NEST_ID=<CLIENT ID>
export NEST_SECRET=<CLIENT SECRET>
```

Nowe you can visit `http://localhost:3333`

## Video

`https://www.dropbox.com/s/u7zghowfrlpwops/nest-demo-alarms.flv?dl=0`