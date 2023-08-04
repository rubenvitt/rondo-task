'use server';

import appHref, { userHref } from '@/utils/href';

export interface NavigationItem {
  name: string;
  href: string;
}

export interface NavigationItemWithIcon extends NavigationItem {
  icon: string;
}

export interface AppNavigation {
  sideNavigation: NavigationItemWithIcon[];
  userNavigation: any[];
  teams: any[];
}

export default async function loadAppNavigation(): Promise<AppNavigation> {
  'use server';

  const sideNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'fa-house' },
    { name: 'Inbox', href: '/inbox', icon: 'fa-inbox' },
    { name: 'Calendar', href: '/calendar', icon: 'fa-calendar-week' },
  ].map(item => ({ ...item, href: appHref(item.href) }));

  const userNavigation = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Sign out', href: '#' },
  ].map(item => ({ ...item, href: userHref(item.href) }));
  // TODO: remove me
  const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H' },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T' },
    { id: 3, name: 'Workcation', href: '#', initial: 'W' },
  ];

  return { sideNavigation, userNavigation, teams };
}
