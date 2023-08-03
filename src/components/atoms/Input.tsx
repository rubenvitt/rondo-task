import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import {
  faExclamationCircle,
  IconDefinition,
} from '@fortawesome/pro-regular-svg-icons';
import { classNames } from '@/utils/styling';

interface InputProps {
  icon?: IconDefinition;
  label: string;
  name?: string;
  errorLabel?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({
  icon = undefined,
  label,
  name,
  errorLabel,
  inputProps,
}: InputProps) {
  const id = useMemo(
    () => inputProps?.id ?? name?.replace(/\s/g, '-').toLowerCase(),
    [inputProps?.id, name]
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon
              icon={icon}
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        )}
        <input
          name={name}
          id={id}
          className={classNames(
            `block w-full rounded-md border-0 py-1.5 ring-1 ring-inset text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`,
            icon && 'pl-10',
            errorLabel
              ? 'ring-red-500 focus:ring-red-800 placeholder:text-red-400'
              : 'ring-gray-300 focus:ring-primary-600 placeholder:text-gray-400'
          )}
          {...inputProps}
        />

        {errorLabel && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errorLabel && <p className="mt-2 text-sm text-red-600">{errorLabel}</p>}
    </div>
  );
}
