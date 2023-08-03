import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { queries, staleTimes } from '@/utils/queries';
import {
  AppNavigation,
  NavigationItem,
  NavigationItemWithIcon,
} from '@/server/navigation';

function appendCurrentProp(item: NavigationItemWithIcon, pathname: string) {
  return {
    ...item,
    current: item.href === pathname,
  };
}

export function useNavigation(initialNavigation: AppNavigation) {
  const { data } = useQuery(
    queries.navigation().queryKey,
    queries.navigation().queryFn,
    {
      initialData: () => initialNavigation,
      staleTime: staleTimes.veryVeryLong,
    }
  );
  const pathname = usePathname();

  return useMemo<AppNavigation>(
    () => ({
      sideNavigation:
        data?.sideNavigation.map(item => appendCurrentProp(item, pathname)) ??
        [],
      userNavigation:
        data?.userNavigation.map(item => appendCurrentProp(item, pathname)) ??
        [],
      teams: data?.teams.map(item => appendCurrentProp(item, pathname)) ?? [],
    }),
    [data?.sideNavigation, data?.teams, data?.userNavigation, pathname]
  );
}

export function useNavigationItem<T extends NavigationItem>(item: T) {
  const pathname = usePathname();
  const current = useMemo(() => item.href === pathname, [item.href, pathname]);

  return { ...item, current };
}
