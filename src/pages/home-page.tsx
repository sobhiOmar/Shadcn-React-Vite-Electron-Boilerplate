import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import List from '@/components/pomodoro/list';
import { buttonVariants } from '@/components/ui/button';
import { sitePaths } from '@/configurations/paths';

export default function HomePage() {
  return (
    <div className='w-screen h-screen bg-slate-500'>
      <Helmet>
        <title>Welcome to Our Website</title>
      </Helmet>

      <section className="container flex  h-screen flex-col items-center justify-center gap-6 pb-8 pt-10 md:py-10">
        <List />
      </section>
    </div>
  );
}
