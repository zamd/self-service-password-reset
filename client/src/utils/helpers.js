export function hasEnrolmentScope(scope) {
  if (!scope)
    return false;
  if (!Array.isArray(scope))
    scope = scope.split(' ');

  const enrolmentScopes = [ "read:enrolment", "write:enrolment"]
  return enrolmentScopes.some(s=>scope.indexOf(s)>=0) 
}

export function hasChangePasswordScope(scope) {
  if (!scope)
    return false;
  if (!Array.isArray(scope))
    scope = scope.split(' ');
  return scope.indexOf('change:password')>=0;
}


export function hasResetPasswordScope(scope) {
  if (!scope)
    return false;
  if (!Array.isArray(scope))
    scope = scope.split(' ');
  return scope.indexOf('reset:password')>=0;
}