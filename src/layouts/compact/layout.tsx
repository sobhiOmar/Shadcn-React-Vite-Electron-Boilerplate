/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SiteHeader from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function CompactLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className='flex'>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
