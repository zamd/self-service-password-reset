import { Router as router } from 'express';

import enrollments from './enrollments';
import passwordReset from './passwordReset';

export default () => {
  const routes = router();
  routes.use('/', enrollments());
  routes.use('/', passwordReset());
  return routes;
};
