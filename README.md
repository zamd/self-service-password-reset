# Self Service Portal - Password Reset

## How to run Client

```
cd client
yarn install
yarn start
```

## How to run Sever

### Update config

Update the config file with the needed settings, and rename `.env.sample` to `.env`

```
NON_INTERACTIVE_CLIENT_ID=51F4c1zBKRK9Vxut2b71qBuyexwa9cmO
NON_INTERACTIVE_CLIENT_SECRET=XXXXXX
DOMAIN=selfservice-cse.auth0.com
AUDIENCE=urn:self-service-portal-api
```

### Run

```
cd server
yarn install
yarn start
```
