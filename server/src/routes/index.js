import { Router as router } from 'express';

import enrollments from './enrollments';

export default () => {
  const routes = router();
  routes.use('/', enrollments());
  return routes;
};
