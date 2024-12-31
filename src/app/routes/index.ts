import { Router } from 'express';
import { UserRoutes } from './route/user.route';
import { AuthRoutes } from './route/auth.route';
import { ProjectRoutes } from './route/project.route';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes = [
  {
    path: '/auth/signup',
    route: UserRoutes,
  },
  {
    path: '/auth/signin',
    route: AuthRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
