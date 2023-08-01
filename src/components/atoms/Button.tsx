import React from 'react';
import Link from 'next/link';

interface HrefProp {
  href: string;
  action?: never;
  type: never;
}

interface ActionProp {
  action?: () => void;
  href?: never;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

type Props = React.PropsWithChildren<HrefProp | ActionProp>;

export default function Button({ action, children, href, type }: Props) {
  if (href) {
    return (
      <Link
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-primary-500"
        href={href}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={action}
      type={type}
      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-primary-500"
    >
      {children}
    </button>
  );
}
