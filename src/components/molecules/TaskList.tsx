"use client";
import TaskListItem from "@atoms/TaskListItem";
import {TaskItem} from "@/types/components";
import {useQuery} from "@tanstack/react-query";
import {queries} from "@/utils/queries";

interface Props {
    initialTasks: TaskItem[]
}

export default function TaskList({initialTasks}: Props) {
    const {data: tasks} = useQuery(queries.taskItems.list("inbox"), {initialData: initialTasks})

    return <ul className="w-full divide-y divide-gray-200">
        {tasks?.map(task => <TaskListItem item={task} key={task.id}/>)}
    </ul>
}