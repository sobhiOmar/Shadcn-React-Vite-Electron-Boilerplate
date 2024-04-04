import { Helmet } from 'react-helmet-async';

import { sitePaths } from '@/configurations/paths';

import List from '../components/pomodoro/main';

export default function HomePage() {
  return (
    <div className='h-screen w-screen bg-slate-500'>
      <Helmet>
        <title>Welcome to Our Website</title>
      </Helmet>

      <section className="container flex  h-screen flex-col items-center justify-center gap-6 pb-8 pt-10 md:py-10">
        <List />
      </section>
    </div>
  );
}
