"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  examSchema,
  ExamSchema,
} from "@/lib/formValidationSchemas";
import {
  createExam,
  updateExam,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ExamForm = ({
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
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    // console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setIsLoading(false);
      toast.success(`Exam has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
    if (state.error) {
      setIsLoading(false);
      toast.error(state.error);
    }
  }, [state, router, type, setOpen]);

  const { lessons } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new exam" : "Update the exam"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Start Date"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type="datetime-local"
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type="datetime-local"
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
          <label className="text-xs text-gray-500">Lesson</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonId")}
            defaultValue={data?.teachers}
          >
            {lessons.map((lesson: { id: number; name: string }) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {isLoading ? "Loading..." : (type === "create" ? "Create" : "Update")}
      </button>
    </form>
  );
};

export default ExamForm;

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import {
//   examSchema,
//   ExamSchema,
//   subjectSchema,
//   SubjectSchema,
// } from "@/lib/formValidationSchemas";
// import {
//   createExam,
//   createSubject,
//   updateExam,
//   updateSubject,
// } from "@/lib/actions";
// import { useFormState } from "react-dom";
// import { Dispatch, SetStateAction, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const ExamForm = ({
//   type,
//   data,
//   setOpen,
//   relatedData,
// }: {
//   type: "create" | "update";
//   data?: any;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   relatedData?: any;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ExamSchema>({
//     resolver: zodResolver(examSchema),
//   });

//   // AFTER REACT 19 IT'LL BE USEACTIONSTATE

//   const [state, formAction] = useFormState(
//     type === "create" ? createExam : updateExam,
//     {
//       success: false,
//       error: false,
//     }
//   );

//   const onSubmit = handleSubmit((data) => {
//     console.log(data);
//     formAction(data);
//   });

//   const router = useRouter();

//   useEffect(() => {
//     if (state.success) {
//       toast(`Exam has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//   }, [state, router, type, setOpen]);

//   const { lessons } = relatedData;

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a new exam" : "Update the exam"}
//       </h1>

//       <div className="flex justify-between flex-wrap gap-4">
//         <InputField
//           label="Exam title"
//           name="title"
//           defaultValue={data?.title}
//           register={register}
//           error={errors?.title}
//         />
//         <InputField
//           label="Start Date"
//           name="startTime"
//           defaultValue={data?.startTime}
//           register={register}
//           error={errors?.startTime}
//           type="datetime-local"
//         />
//         <InputField
//           label="End Date"
//           name="endTime"
//           defaultValue={data?.endTime}
//           register={register}
//           error={errors?.endTime}
//           type="datetime-local"
//         />
//         {data && (
//           <InputField
//             label="Id"
//             name="id"
//             defaultValue={data?.id}
//             register={register}
//             error={errors?.id}
//             hidden
//           />
//         )}
//         <div className="flex flex-col gap-2 w-full md:w-1/4">
//           <label className="text-xs text-gray-500">Lesson</label>
//           <select
//             className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//             {...register("lessonId")}
//             defaultValue={data?.teachers}
//           >
//             {lessons.map((lesson: { id: number; name: string }) => (
//               <option value={lesson.id} key={lesson.id}>
//                 {lesson.name}
//               </option>
//             ))}
//           </select>
//           {errors.lessonId?.message && (
//             <p className="text-xs text-red-400">
//               {errors.lessonId.message.toString()}
//             </p>
//           )}
//         </div>
//       </div>
//       {state.error && (
//         <span className="text-red-500">Something went wrong!</span>
//       )}
//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default ExamForm;

// // "use client";
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { Fira_Code } from 'next/font/google';
// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import { z } from 'zod';
// // import InputField from '../InputField';
// // import Image from 'next/image';

// // const schema = z.object({
// //     username: z
// //         .string()
// //         .min(3, { message: 'Username must be at least 3 characters' })
// //         .max(20, { message: 'Username must not be more than 20 characters' }),

// //     email: z.string().email({message:"invalid email address"}),

// //     password: z.string().min(8, {message:"password must be at least 8 characters"}),

// //     firstName: z.string().min(1, {message:"First name is required"}),

// //     lastName: z.string().min(1, {message:"Last name is required"}),

// //     phone: z.string().min(11, {message:"Phone numbmer should be 11 characters"}).max(11,{message:"Phone numbmer should be 11 characters"}),

// //     address: z.string().min(5, {message:"address is required"}),

// //     bloodType: z.string().min(1, {message:"blood type is required"}),

// //     birthday: z.date({message:"Birthday is required"}),

// //     sex: z.enum(["male", "female"], {message:"Sex is required"}),
// //     img: z.instanceof(File,{message:"Image is required"}),

// //   });

// //   type Inputs = z.infer<typeof schema>;

// // const ExamForm = ({type, data}:{type:"create" | "update"; data?:any}) => {

// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors },
// //       } = useForm<Inputs>({
// //         resolver: zodResolver(schema),
// //       });

// //       const onSubmit = handleSubmit((data) =>{
// //         console.log(data)
// //         // submit the form to your API or database here
// //       })

      
// //   return (
// //     <form className='flex flex-col gap-8' onSubmit={onSubmit}>
// //         <h1 className='text-xl font-semibold'>Creae a new exam</h1>
// //         <span className='text-xs text-gray-400 font-medium'>Authentication information</span>
        
        
// //         <div className='flex justify-between flex-wrap gap-4'>
// //             <InputField 
// //                 label='username'
// //                 name='username'
// //                 defaultValue={data?.username}
// //                 register={register}
// //                 error={errors.username}
// //             />

// //             <InputField 
// //                 label='email'
// //                 name='email'
// //                 type='email'
// //                 defaultValue={data?.email}
// //                 register={register}
// //                 error={errors.email}
// //             />

// //             <InputField 
// //                 label='password'
// //                 name='password'
// //                 type='password'
// //                 defaultValue={data?.password}
// //                 register={register}
// //                 error={errors.password}
// //             />

// //         </div>
        

// //         <span className='text-xs text-gray-400 font-medium'>Personal information</span>

// //         <div className='flex justify-between flex-wrap gap-4'>

// //             <InputField 
// //                 label='First Name'
// //                 name='firstName'
// //                 defaultValue={data?.firstName}
// //                 register={register}
// //                 error={errors.firstName}
// //             />
            
// //             <InputField 
// //                 label='Last Name'
// //                 name='lastName'
// //                 defaultValue={data?.lastName}
// //                 register={register}
// //                 error={errors.lastName}
// //             />
            
// //             <InputField 
// //                 label='Phone Number'
// //                 name='phone'
// //                 defaultValue={data?.phone}
// //                 register={register}
// //                 error={errors.phone}
// //             />
            
// //             <InputField 
// //                 label='Address'
// //                 name='address'
// //                 defaultValue={data?.address}
// //                 register={register}
// //                 error={errors.address}
// //             />
            
// //             <InputField 
// //                 label='Blood Type'
// //                 name='bloodType'
// //                 defaultValue={data?.bloodType}
// //                 register={register}
// //                 error={errors.bloodType}
// //             />

// //             <InputField 
// //                 label='Birth Day'
// //                 name='birthDay'
// //                 defaultValue={data?.birthDay}
// //                 register={register}
// //                 error={errors.birthday}
// //                 type='date'
// //             />

// //             <div className='flex flex-col gap-2 w-full md:w-1/4'>
// //                 <label className='text-xs text-gray-500'>Sex</label>
// //             <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none w-full' {...register("sex")} defaultValue={data?.sex}>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //             </select>
// //                 {errors.sex?.message && <p className='text-xs text-red-600'> {errors.sex?.message.toString()} </p> }
// //             </div>
            
// //             <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
// //                 <label className='text-xs text-gray-500  flex items-center gap-2 cursor-pointer' htmlFor='img'>
// //                     <Image 
// //                         src='/upload.png'
// //                         alt=""
// //                         width={28}
// //                         height={28}
// //                     />
// //                     <span>Upload photo</span>
// //                 </label>
// //                 <input type="file" id="img" {...register("img")}
// //                     accept="image/*" // Restricts file selection to image types
// //                     className='hidden'
// //                 />
// //                 {errors.img?.message && <p className='text-xs text-red-600'> {errors.img?.message.toString()} </p> }
// //             </div>

// //         </div>

// //         <button className='bg-blue-400 text-white p-2 rounded-md'>{type ==="create" ? "Create" : "Update"}</button>
// //     </form>
// //   )
// // }

// // export default ExamForm
