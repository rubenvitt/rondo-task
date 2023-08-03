'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { NewTaskItem, ParentItemProps } from '@/server/actions';
import { queries, queryClient } from '@/utils/queries';

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
    queries.items.user.create(parent).mutate,
    {
      onSuccess() {
        queryClient.invalidateQueries(queries.items.queryKey);
      },
    }
  );

  return (
    <form
      className="flex border"
      onSubmit={handleSubmit(async data => {
        await mutateAsync({
          label: data.label,
          completed: false,
        });
        reset();
      })}
    >
      <input
        {...register('label', { required: true })}
        className="flex-1 focus:ring-2 focus:ring-inset focus:ring-primary-600 border-0"
      />
      <button
        className="border-0 px-3 ring-1 ring-inset ring-gray-300 hover:bg-primary-400"
        type="submit"
      >
        Hinzufügen
      </button>
    </form>
  );
}
