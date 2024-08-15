import { ModuleRoutes } from '../constants';
import AdminRoutes from './Adminrouter';
import AuthRoutes from './AuthRouter';
import DashboardRoutes from './Dashboard';

const Approuters = (app) => {
  // Authentication Routes
  app.use(ModuleRoutes.Auth, AuthRoutes);

  // Dashboard Routes
  app.use(ModuleRoutes.Dashboard, DashboardRoutes);

  // Dashboard Routes
  app.use(ModuleRoutes.Admin, AdminRoutes);
};

export default Approuters;
