"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  classSchema,
  ClassSchema,
} from "@/lib/formValidationSchemas";
import {
  createClass,
  updateClass,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
      setIsLoading(false);
    }
    if(state.error){
      setIsLoading(false);
      toast.error(state.error); // Display the specific error message
    }
  }, [state, router, type, setOpen]);

  // const { teachers, grades } = relatedData;
  const { teachers = [], grades = [] } = relatedData || {};

  console.log("teachers", teachers);
  console.log("grades", grades);
  console.log("relatedData", relatedData);

  return (
    <form className="flex flex-col gap-8 scrollbar-thin" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option
                  value={teacher.id}
                  key={teacher.id}
                  selected={data && teacher.id === data.supervisorId}
                >
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: number }) => (
              <option
                value={grade.id}
                key={grade.id}
                selected={data && grade.id === data.gradeId}
              >
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {
          isLoading ? "loading..." : (type === "create" ? "Create" : "Update")
        }
      </button>
    </form>
  );
};

export default ClassForm;


// "use client";
// import { zodResolver } from '@hookform/resolvers/zod';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import InputField from '../InputField';
// import Image from 'next/image';

// const schema = z.object({
//     username: z
//         .string()
//         .min(3, { message: 'Username must be at least 3 characters' })
//         .max(20, { message: 'Username must not be more than 20 characters' }),

//     email: z.string().email({message:"invalid email address"}),

//     password: z.string().min(8, {message:"password must be at least 8 characters"}),

//     firstName: z.string().min(1, {message:"First name is required"}),

//     lastName: z.string().min(1, {message:"Last name is required"}),

//     phone: z.string().min(11, {message:"Phone numbmer should be 11 characters"}).max(11,{message:"Phone numbmer should be 11 characters"}),

//     address: z.string().min(5, {message:"address is required"}),

//     bloodType: z.string().min(1, {message:"blood type is required"}),

//     birthday: z.date({message:"Birthday is required"}),

//     sex: z.enum(["male", "female"], {message:"Sex is required"}),
//     img: z.instanceof(File,{message:"Image is required"}),

//   });

//   type Inputs = z.infer<typeof schema>;

// const ClassForm = ({type, data}:{type:"create" | "update"; data?:any}) => {

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//       } = useForm<Inputs>({
//         resolver: zodResolver(schema),
//       });

//       const onSubmit = handleSubmit((data) =>{
//         console.log(data)
//         // submit the form to your API or database here
//       })

      
//   return (
//     <form className='flex flex-col gap-8' onSubmit={onSubmit}>
//         <h1 className='text-xl font-semibold'>Creae a new class</h1>
//         <span className='text-xs text-gray-400 font-medium'>Authentication information</span>
        
        
//         <div className='flex justify-between flex-wrap gap-4'>
//             <InputField 
//                 label='username'
//                 name='username'
//                 defaultValue={data?.username}
//                 register={register}
//                 error={errors.username}
//             />

//             <InputField 
//                 label='email'
//                 name='email'
//                 type='email'
//                 defaultValue={data?.email}
//                 register={register}
//                 error={errors.email}
//             />

//             <InputField 
//                 label='password'
//                 name='password'
//                 type='password'
//                 defaultValue={data?.password}
//                 register={register}
//                 error={errors.password}
//             />

//         </div>
        

//         <span className='text-xs text-gray-400 font-medium'>Personal information</span>

//         <div className='flex justify-between flex-wrap gap-4'>

//             <InputField 
//                 label='First Name'
//                 name='firstName'
//                 defaultValue={data?.firstName}
//                 register={register}
//                 error={errors.firstName}
//             />
            
//             <InputField 
//                 label='Last Name'
//                 name='lastName'
//                 defaultValue={data?.lastName}
//                 register={register}
//                 error={errors.lastName}
//             />
            
//             <InputField 
//                 label='Phone Number'
//                 name='phone'
//                 defaultValue={data?.phone}
//                 register={register}
//                 error={errors.phone}
//             />
            
//             <InputField 
//                 label='Address'
//                 name='address'
//                 defaultValue={data?.address}
//                 register={register}
//                 error={errors.address}
//             />
            
//             <InputField 
//                 label='Blood Type'
//                 name='bloodType'
//                 defaultValue={data?.bloodType}
//                 register={register}
//                 error={errors.bloodType}
//             />

//             <InputField 
//                 label='Birth Day'
//                 name='birthDay'
//                 defaultValue={data?.birthDay}
//                 register={register}
//                 error={errors.birthday}
//                 type='date'
//             />

//             <div className='flex flex-col gap-2 w-full md:w-1/4'>
//                 <label className='text-xs text-gray-500'>Sex</label>
//             <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none w-full' {...register("sex")} defaultValue={data?.sex}>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//             </select>
//                 {errors.sex?.message && <p className='text-xs text-red-600'> {errors.sex?.message.toString()} </p> }
//             </div>
            
//             <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
//                 <label className='text-xs text-gray-500  flex items-center gap-2 cursor-pointer' htmlFor='img'>
//                     <Image 
//                         src='/upload.png'
//                         alt=""
//                         width={28}
//                         height={28}
//                     />
//                     <span>Upload photo</span>
//                 </label>
//                 <input type="file" id="img" {...register("img")}
//                     accept="image/*" // Restricts file selection to image types
//                     className='hidden'
//                 />
//                 {errors.img?.message && <p className='text-xs text-red-600'> {errors.img?.message.toString()} </p> }
//             </div>

//         </div>

//         <button className='bg-blue-400 text-white p-2 rounded-md'>{type ==="create" ? "Create" : "Update"}</button>
//     </form>
//   )
// }

// export default ClassForm
