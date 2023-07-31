'use server';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/pro-solid-svg-icons';
import loadAppTheme from '@/server/appTheme';

export default async function AppLogo() {
  const appTheme = await loadAppTheme();
  return (
    <FontAwesomeIcon
      icon={faListCheck}
      style={{
        // @ts-ignore
        '--fa-primary-color': appTheme.colors.white,
        // @ts-ignore
        '--fa-secondary-color': appTheme.colors.primary[600],
      }}
      className="h-8 w-auto"
      alt="Rondo-Task"
    />
  );
}
