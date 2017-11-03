function (user, context, callback) {
    var _ =require('lodash@4.8.2');
    
    var requestedScopes = context.request.body.scope ? context.request.body.scope.split(' ') : [];
    requestedScopes = requestedScopes.concat(context.request.query.scope ? context.request.query.scope.split(' ') : []);
    
    // Check if connection is SMS or EMAIL, remove requested scopes
    // so only reset and change:password scopes are issued.
    if(_.indexOf(['sms', 'email'], context.connectionStrategy) !== -1){
      var allowedOIDCScopes = [
        'openid',
        'profile',
        'email',
        'address',
        'phone',
        'offline_access'
      ];
      var allowedAccessScopes =  [];
      var adIdentities = _.filter(user.identities,function(identity) {
        return identity.provider==="ad";
      });
      
      // only issue reset:password scope if an AD account is linked to this passwordless identity
      if (adIdentities.length > 0) {
        allowedAccessScopes.push('reset:password');
      }
      
      var allowedScopes = _.concat(allowedOIDCScopes, allowedAccessScopes);
      
      var filteredScopes = _.remove(requestedScopes, function(scope) {
        var foundScope = _.find(allowedScopes, function(o) { 
          return scope.toLowerCase() === o.toLowerCase();
        });
        return !!foundScope;
      });
      
      context.accessToken.scope = filteredScopes;
    }
    // Add the scopes in the id_token, to toggle features in the UI.
    context.idToken['https://selfserviceportal/scope'] = context.accessToken.scope || requestedScopes;
    // Add custom claim `realm` and add the connection name to it.
    context.idToken['https://selfserviceportal/realm'] = context.connection;
  
    callback(null, user, context);
  }