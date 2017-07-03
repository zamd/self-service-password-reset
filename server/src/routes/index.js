import { Router as router } from 'express';

import enrollments from './enrollments';
import smsEnrollment from './smsEnrollment';
import emailEnrollment from './emailEnrollment';
import passwordReset from './passwordReset';

export default () => {
  const routes = router();
  routes.use('/', smsEnrollment());
  routes.use('/', emailEnrollment());
  routes.use('/', enrollments());
  routes.use('/', passwordReset());
  return routes;
};
