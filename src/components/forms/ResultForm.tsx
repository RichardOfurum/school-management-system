"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { ResultSchema, resultSchema } from '@/lib/formValidationSchemas';
import { createResult, updateResult } from '@/lib/actions';
import { useFormState } from "react-dom";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const ResultForm = ({
    type,
    data,
    setOpen,
    relatedData,
    userId,
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
    userId?: string;
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useUser();
    const role = user?.publicMetadata.role;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResultSchema>({
        resolver: zodResolver(resultSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createResult : updateResult,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((formData) => {
        setIsSubmitting(true);
        formAction(formData);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success(`Result has been ${type === "create" ? "created" : "updated"}!`);
            router.refresh();
            setOpen(false);
        }

        if (state.error) {
            setIsSubmitting(false);
            toast.error(state.error);
        }
    }, [state, router, type, setOpen]);

    const { exams, assignments, students } = relatedData;

    return (
        <form
            className='flex flex-col gap-8 overflow-auto max-h-[600px] h-auto scrollbar-thin'
            onSubmit={onSubmit}
        >
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new result" : "Update the result"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Score"
                    name="score"
                    type="number"
                    defaultValue={data?.score}
                    register={register}
                    error={errors?.score}
                />
                <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Student</label>
                    <select
                        {...register("studentId")}
                        className="border border-gray-300 rounded-md p-2"
                        defaultValue={data?.studentId}
                    >
                        {students.map((student: { id: string; name: string; surname: string }) => (
                            <option key={student.id} value={student.id}>
                                {student.name} {student.surname}
                            </option>
                        ))}
                    </select>
                    {errors.studentId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.studentId.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Exam</label>
                    <select
                        {...register("examId")}
                        className="border border-gray-300 rounded-md p-2"
                        defaultValue={data?.examId}
                    >
                        <option value="">Select an exam</option>
                        {exams.map((exam: { id: number; title: string }) => (
                            <option key={exam.id} value={exam.id}>
                                {exam.title}
                            </option>
                        ))}
                    </select>
                    {errors.examId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.examId.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Assignment</label>
                    <select
                        {...register("assignmentId")}
                        className="border border-gray-300 rounded-md p-2"
                        defaultValue={data?.assignmentId}
                    >
                        <option value="">Select an assignment</option>
                        {assignments.map((assignment: { id: number; title: string }) => (
                            <option key={assignment.id} value={assignment.id}>
                                {assignment.title}
                            </option>
                        ))}
                    </select>
                    {errors.assignmentId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.assignmentId.message.toString()}
                        </p>
                    )}
                </div>
            </div>

            {state.error && (
                <span className="text-red-500">Something went wrong!</span>
            )}

            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Loading..." : type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ResultForm;
