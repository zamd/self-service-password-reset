# Self Service Portal - Password Reset


Self service password management functionality include:

- Allow Users to change passwords when their Active Directory password has expired
- Allow Users to change their own Active Directory password
- Allow Users to regain access to their Active Directory account when the password is not working
- Allow Users to unlock their Active Directory account when it is blocked


The proposed solution is offer a self-service portal using which users can perform above operations. The portal will allow users to enrol their personal email or phone number against their AD account. When AD credentials expire or don’t work, the user would be able to login to the portal with his personal email or phone number to recover their AD account access by reseting the password and/or unlock the account. 

The portal would be configured as a standard Auth0 client with Active Directory and Passwordless connections enabled. The user must login with their AD credentials to enrol their personal email/phone as secondary credentials, which is done using Passwordless sign up process. 

Upon successful passwordless sign up, the portal API links passwordless account as a secondary identity of the AD account. 

After successful linking, the user can log into the portal using his secondary passwordless identity and then regain access to AD account. 

The portal (api) uses following Auth0 endpoints to change or reset password. The PRs are labelled on the diagram below. 

## Running locally 

### Start API server

```bash
git clone git@github.com:auth0-customers/self-service-portal.git

cd self-service-portal

npm i

```

Update the config file with the needed settings, and rename `.env.sample` to `.env`

```
NON_INTERACTIVE_CLIENT_ID=sKaugcPC0n4ddddr6QHeJm0Uy3ljao2wtXqb
NON_INTERACTIVE_CLIENT_SECRET=SECRET
DOMAIN=tenant.auth0.com
AUDIENCE=urn:self-service-portal-api
```

Start the server

```bash
npm start
```



### Start react-ui

```bash
cd self-service-portal/react_ui

npm i

```

Update the config file with the needed settings, and rename `.env.sample` to `.env`

```
REACT_APP_domain=domain.auth0.com
REACT_APP_clientID=6se5nlDw3szgn3YvGB5kw5D47laW04mk
REACT_APP_redirectUri=http://localhost:3000/callback
REACT_APP_audience=urn:self-service-portal-api
```


```bash
npm start
```


## Architecture

![Architecture](/images/architecture.png)


## Password Reset Flow 

![Reset Flow](/images/reset-flow.png)


## Auth0 Tenant Setup


### Create AD/LDAP Connection
### Create Auth0 Clients
### Create Backend API



