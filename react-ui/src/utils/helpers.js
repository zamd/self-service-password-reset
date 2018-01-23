export function hasEnrolmentScope(scope) {
  if (!scope)
    return false;
  if (!Array.isArray(scope))
    scope = scope.split(' ');

  const enrolmentScopes = [ "read:enrolment", "write:enrolment"]
  return enrolmentScopes.some(s=>scope.indexOf(s)>=0) 
}