'use server';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/pro-solid-svg-icons';

export default async function SettingsNavigation() {
  return (
    <a
      href="#"
      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
    >
      <FontAwesomeIcon
        icon={faCog}
        className="h-6 w-6 shrink-0"
        aria-hidden="true"
      />
      Settings
    </a>
  );
}
