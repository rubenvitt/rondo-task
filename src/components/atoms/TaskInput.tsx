'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'react-aria-components';
import { NewTaskItem, ParentItemProps } from '@/server/actions';
import { queries } from '@/utils/queries';
import { Button } from '@atoms/Button';

type TaskInputProps = {
  parent: ParentItemProps;
};

export default function TaskInput({ parent }: TaskInputProps) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<{
    label: string;
  }>();
  const { mutateAsync } = useMutation<any, any, NewTaskItem>(
    queries.items.user.create(parent).queryKey,
    queries.items.user.create(parent).mutate
  );

  return (
    <form
      className="flex border focus-within:ring-2 focus-within:ring-offset-2 rounded-md focus-within:ring-primary-600 group"
      onSubmit={handleSubmit(async data => {
        await mutateAsync({
          label: data.label,
          completed: false,
        });
        reset();
      })}
    >
      <Input
        {...register('label', { required: true })}
        placeholder="What do you need to get done?"
        className="flex-1 border-0 focus:ring-0 rounded-md placeholder-gray-300"
      />
      <Button type="submit">Create new</Button>
    </form>
  );
}
