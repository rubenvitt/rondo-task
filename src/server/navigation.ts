'use server';

import {
  faCalendar,
  faHome,
  faInbox,
  IconDefinition,
} from '@fortawesome/pro-thin-svg-icons';
import appHref from '@/utils/href';

export interface NavigationItem {
  name: string;
  href: string;
}

export interface NavigationItemWithIcon extends NavigationItem {
  icon: IconDefinition;
}

export interface AppNavigation {
  sideNavigation: NavigationItemWithIcon[];
  userNavigation: any[];
  teams: any[];
}

export default async function loadAppNavigation(): Promise<AppNavigation> {
  'use server';

  const sideNavigation = [
    { name: 'Dashboard', href: '/', icon: faHome },
    { name: 'Inbox', href: '/inbox', icon: faInbox },
    { name: 'Calendar', href: '/calendar', icon: faCalendar },
  ].map(item => ({ ...item, href: appHref(item.href) }));

  const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  // TODO: remove me
  const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H' },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T' },
    { id: 3, name: 'Workcation', href: '#', initial: 'W' },
  ];

  return { sideNavigation, userNavigation, teams };
}
