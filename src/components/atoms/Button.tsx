'use client';

import React from 'react';
import Link from 'next/link';
import { Button as AriaButton } from 'react-aria-components';

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

type ButtonProps = React.PropsWithChildren<HrefProp | ActionProp>;
type IconButtonProps = React.PropsWithoutRef<
  (HrefProp | ActionProp) & {
    icon: string;
    iconClassName?: string;
    label: string;
  }
>;

type InternalProps = React.PropsWithChildren<
  (HrefProp | ActionProp) & { className: string }
>;

function InternalButton({
  action,
  children,
  href,
  type,
  className,
}: InternalProps) {
  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <AriaButton onPress={action} type={type} className={className}>
      {children}
    </AriaButton>
  );
}

export function Button(props: ButtonProps) {
  return (
    <InternalButton
      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-primary-500"
      {...props}
    />
  );
}

export const defaultIconClassName =
  'h-5 text-gray-500 group-hover:text-gray-900';
export const defaultIconButtonClassName =
  'group rounded-md bg-white px-2.5 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-primary-500';

export function IconButton({
  icon,
  label,
  iconClassName = defaultIconClassName,
  ...props
}: IconButtonProps) {
  return (
    <InternalButton className={defaultIconButtonClassName} {...props}>
      <span className="sr-only">{label}</span>
      <i className={`fa-regular fa-fw ${icon} ${iconClassName}}`} />
    </InternalButton>
  );
}
