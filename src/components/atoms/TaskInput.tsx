"use client";
import React from "react";
import {useForm} from "react-hook-form";
import {addItemToInbox} from "@/server/actions";
import {useMutation} from "@tanstack/react-query";
import {TaskItem} from "@/types/components";
import {queries, queryClient} from "@/utils/queries";

interface Props {
}

export default function TaskInput({}: Props) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<{
        label: string
    }>();
    const {
        mutateAsync
    } = useMutation<any, any, Pick<TaskItem, "label" | "completed">>(["tasks", "inbox"], async taskItem => await addItemToInbox(taskItem), {
        onSuccess() {
            queryClient.invalidateQueries(queries.taskItems.list)
        }
    })

    return <form className="flex border" onSubmit={handleSubmit(async data => {
        await mutateAsync({
            label: data.label,
            completed: false
        });
        reset()
    })}>
        <input {...register("label", {required: true})}
               className="flex-1 focus:ring-2 focus:ring-inset focus:ring-primary-600 border-0"/>
        <button className="border-0 px-3 ring-1 ring-inset ring-gray-300 hover:bg-primary-400" type="submit">
            Hinzufügen
        </button>
    </form>;
}