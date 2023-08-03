'use server';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/pro-duotone-svg-icons';
import loadAppTheme from '@/server/appTheme';

type AppLogoProps = {
  variation?: 'light' | 'dark';
};

export default async function AppLogo({ variation = 'dark' }: AppLogoProps) {
  const appTheme = await loadAppTheme();
  return (
    <FontAwesomeIcon
      icon={faListCheck}
      style={{
        // @ts-ignore
        '--fa-primary-color': appTheme.colors.white,
        // @ts-ignore
        '--fa-secondary-color':
          appTheme.colors.primary[variation === 'light' ? 200 : 600],
      }}
      className="h-8 w-auto"
      alt="Rondo-Task"
    />
  );
}
