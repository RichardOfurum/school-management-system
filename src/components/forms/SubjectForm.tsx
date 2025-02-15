"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { SubjectSchema, subjectSchema } from '@/lib/formValidationSchemas';
import { createSubject, updateSubject } from '@/lib/actions';
import { useFormState } from "react-dom";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const SubjectForm = ({
    type,
    data,
    setOpen,
    relatedData,
    }: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState<string[]>(data?.teachers || []);

    useEffect(() => {
        if (data?.teachers) {
            setSelectedTeachers(data.teachers);
        }
    }, [data]);

    // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value, checked } = event.target;
    //     setSelectedTeachers((prev) =>
    //         checked ? [...prev, value] : prev.filter((id) => id !== value)
    //     );
    // };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const teacherObj = teachers.find((t:any) => t.id === value); // Get full teacher object
    
        if (!teacherObj) return; // Prevent errors if teacher is not found
    
        setSelectedTeachers((prev) =>
            checked ? [...prev, teacherObj] : prev.filter((t:any) => t.id !== value)
        );
    };
    

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
      });

      const [state, formAction] = useFormState(
        type === "create" ? createSubject : updateSubject,
        {
          success: false,
          error: false,
        }
      );

      const onSubmit = handleSubmit((data) => {
        console.log(data);
        formAction(data);
        setIsSubmitting(true);
      });

      const router = useRouter();

      useEffect(() =>{
            if (state.success) {
                toast(`Subject has been ${type === "create" ? "created": "updated"}!`);
                router.refresh();
                setOpen(false);
            }
            
            setIsSubmitting(false);
      },[state, router, type, setOpen]);

    //   const { teachers } = relatedData;
    const teachers = relatedData?.teachers || [];
      
  return (
    <form className='flex flex-col gap-8 overflow-auto max-h-[600px] h-auto scrollbar-thin' onSubmit={onSubmit}>

        <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new subject" : "Update the subject"}
            </h1>

            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <InputField
                            label="Subject name"
                            name="name"
                            defaultValue={data?.name}
                            register={register}
                            error={errors?.name}
                        />
                        {data && (
                        <InputField
                            label="Id"
                            name="id"
                            defaultValue={data?.id}
                            register={register}
                            error={errors?.id}
                            hidden
                        />
                        )}
                    </div>
                </div>


                <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600">Teachers</label>
                    <div className="border border-gray-300 rounded-md p-4 space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                      
                        {teachers.map((teacher: { id: string; name: string; surname: string }) => (
                            <label
                            key={teacher.id}
                            className="flex items-center space-x-2 text-sm"
                            >

                                <input
                                    type="checkbox"
                                    value={teacher.id}
                                    {...register("teachers")}
                                    checked={selectedTeachers.some((t:any) => t.id === teacher.id)} // Fix: Compare objects correctly
                                    onChange={handleCheckboxChange}
                                    className="rounded-md ring-[1.5px] ring-gray-300 focus:ring-blue-500"
                                />

                            <span>{teacher.name + " " + teacher.surname}</span>
                            </label>
                        ))}
                    </div>

                {errors.teachers?.message && (
                    <p className="text-xs text-red-400">
                    {errors.teachers.message.toString()}
                    </p>
                )}
                </div>
           
            {state.error && (
                <span className="text-red-500">Something went wrong!</span>
            )}

        <button className="bg-blue-400 text-white p-2 rounded-md disabled:opacity-50" 
        disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : type === "create" ? "Create" : "Update"}
        </button>
        
        {/* <button className='bg-blue-400 text-white p-2 rounded-md'>{type ==="create" ? "Create" : "Update"}</button> */}
    </form>
  )
}

export default SubjectForm
