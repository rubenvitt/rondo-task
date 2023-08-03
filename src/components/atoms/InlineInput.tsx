import React from 'react';
import { Input, InputProps } from 'react-aria-components';
import { classNames } from '@/utils/styling';

interface InlineInputProps extends InputProps {
  label: string;
}

export default function InlineInput({ label, ...rest }: InlineInputProps) {
  return (
    <Input
      aria-label={label}
      className={classNames(
        `block w-full rounded-md caret-primary-700 caret- border-0 py-1 ring-inset text-gray-900 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6`
      )}
      {...rest}
    />
  );
}
