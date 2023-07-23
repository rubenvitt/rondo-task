interface HrefProp {
  href: string;
  action?: never;
}

interface ActionProp {
  action: () => void;
  href?: never;
}

export function Button() {
  return <button></button>;
}
