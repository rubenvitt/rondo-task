export default function appHref(href: string) {
  return `/app${href}`;
}

export function userHref(href: string) {
  return appHref(`/user/${href}`);
}
