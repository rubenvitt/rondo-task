'use server';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

export default async function appTheme() {
  return resolveConfig(tailwindConfig).theme;
}
