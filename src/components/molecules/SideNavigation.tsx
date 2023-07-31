'use server';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { classNames } from '@/utils/styling';
import loadAppNavigation, { NavigationItemWithIcon } from '@/server/navigation';
import { useNavigationItem } from '@hooks/navigation.hook';

function SideNavigationEntry({
  initialItem,
}: {
  initialItem: NavigationItemWithIcon;
}) {
  'use client';

  const item = useNavigationItem(initialItem);

  return (
    <li key={item.name}>
      <a
        href={item.href}
        className={classNames(
          item.current
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800',
          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
        )}
      >
        <FontAwesomeIcon
          icon={item.icon}
          className="h-6 w-6 shrink-0"
          aria-hidden="true"
        />
        {item.name}
      </a>
    </li>
  );
}

export default async function SideNavigation() {
  const { sideNavigation } = await loadAppNavigation();
  return (
    <ul role="navigation" className="-mx-2 space-y-1">
      {sideNavigation.map(item => (
        <SideNavigationEntry initialItem={item} />
      ))}
    </ul>
  );
}
