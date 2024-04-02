import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from '@/components/loading-screen';
import { sitePaths } from '@/configurations/paths';
// Layout
import CompactLayout from '@/layouts/compact/layout';
import Pomodoro from '@/pages/offlinePomodoro/containers/Pomodoro';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@/pages/home-page'));
const AboutPage = lazy(() => import('@/pages/about-page'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [{ path: sitePaths.about, element: <AboutPage /> }, { path: sitePaths.Pomodoro, sitePaths, element: <Pomodoro /> }],
  },
];
