# REST API Billet

API to capture data through the bilet typed line

## Install

    yarn install

## Run the app

    yarn dev

## Run the tests

   yarn test
## Build app

   yarn build
## Url Production
    http://ec2-52-90-128-227.compute-1.amazonaws.com:7777
## Documentation

    Documentation can be viewed via the /doc route
### Request

`GET /boleto/:numBillet`

    curl -i -H 'Accept: application/json' http://localhost:8080/boleto/:numBillet

## Valid typeable line
### Response

    HTTP/1.1 200 OK
    Date: Thu, 21 Mar 2022 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
    "expirationDate": "2021-11-12",
    "barCode": "34191880200000195091983036633589823173075830",
    "amount": "195.09"
}

## Invalid typed line if it has characters other than numbers
### Response

    HTTP/1.1 400
    Date: Thu, 21 Mar 2022 12:36:30 GMT
    Status: 400
    Connection: close
    Content-Type: application/json
    Content-Length: 2

   {
    "message": "Only numbers on the entered line are accepted"
}
## Invalid typed line
### Response

    HTTP/1.1 400
    Date: Thu, 21 Mar 2022 12:36:30 GMT
    Status: 400
    Connection: close
    Content-Type: application/json
    Content-Length: 2

   {
    "message": "invalid typed line"
}