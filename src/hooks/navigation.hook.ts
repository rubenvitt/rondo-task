import { useMemo } from 'react';
import {
  faCalendar,
  faChartPie,
  faCopy,
  faFolder,
  faHome,
  faUsers,
} from '@fortawesome/pro-thin-svg-icons';

export default function useAppNavigation() {
  const topNavigation = useMemo(
    () => [
      { name: 'Dashboard', href: '#', icon: faHome, current: true },
      { name: 'Team', href: '#', icon: faUsers, current: false },
      { name: 'Projects', href: '#', icon: faFolder, current: false },
      { name: 'Calendar', href: '#', icon: faCalendar, current: false },
      { name: 'Documents', href: '#', icon: faCopy, current: false },
      { name: 'Reports', href: '#', icon: faChartPie, current: false },
    ],
    []
  );

  const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  // TODO: remove me
  const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
  ];

  return { sideNavigation: topNavigation, userNavigation, teams };
}
