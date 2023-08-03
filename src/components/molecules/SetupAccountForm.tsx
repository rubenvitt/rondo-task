'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useRouter } from 'next/navigation';
import { NewUserProps } from '@/server/user';
import { queries } from '@/utils/queries';
import logger from '@/utils/logging';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';

export default function SetupAccountForm() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<NewUserProps>({
    defaultValues: {},
  });
  const { push } = useRouter();
  const { mutateAsync } = useMutation<any, any, NewUserProps>(
    queries.user.queryKey,
    async props => {
      logger.info('Going to save name');
      return queries.user.setupAccount().mutate(props);
    },
    {
      onSuccess: () => {
        logger.info('Redirecting to app');
        push('/app');
      },
      onError: () => {
        setError('root', { type: 'value', message: 'Something went wrong' });
      },
    }
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit(async data => {
          await mutateAsync(data);
        })}
      >
        <Input
          label="Your name"
          errorLabel={errors.name?.message}
          inputProps={{
            ...register('name', {
              required: true,
              onChange: () => clearErrors('name'),
            }),
          }}
        />
        <div className="mt-4">
          <Button type="submit">Save my name 🚀</Button>
        </div>

        {errors.root?.message && (
          <p className="mt-2 text-sm text-red-600">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}
