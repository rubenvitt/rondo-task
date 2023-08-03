import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

export const appTheme = resolveConfig(tailwindConfig).theme;

export default async function loadAppTheme() {
  return appTheme;
}
