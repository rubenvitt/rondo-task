'use server';

import loadAppTheme from '@/server/appTheme';

type AppLogoProps = {
  variation?: 'light' | 'dark';
};

export default async function AppLogo({ variation = 'dark' }: AppLogoProps) {
  const appTheme = await loadAppTheme();
  return (
    <i
      className="fa-duotone fa-list-check h-12 w-auto"
      style={{
        // @ts-ignore
        '--fa-primary-color': variation === 'light' ? 'white' : 'black',
        // @ts-ignore
        '--fa-secondary-color':
          appTheme.colors.primary[variation === 'light' ? 200 : 600],
      }}
      aria-label="Rondo-Task"
    />
  );
}
