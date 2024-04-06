import { Navigate, useRoutes } from 'react-router-dom';

import { sitePaths } from '@/configurations/paths';
// layouts
import MainLayout from '@/layouts/main/layout';
// ----------------------------------------------------------------------
import LoginForm from '@/pages/forms/login';

// pages
import { appRoutes } from './app-routes';
import { errorsRoutes } from './errors-routes';
// config
import { HomePage, mainRoutes } from './main-routes';

export default function Router() {
  return useRoutes([
    {
      path: sitePaths.home,
      element: (
        <MainLayout>
          <LoginForm />
        </MainLayout>
      ),
    },
    ...mainRoutes,
    ...appRoutes,
    ...errorsRoutes,
    { path: '*', element: <Navigate to={sitePaths.page404} replace /> },
  ]);
}
