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

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
// import { createResult, updateResult } from "@/lib/actions";
// import { useFormState } from "react-dom";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const ResultForm = ({
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
//   } = useForm<ResultSchema>({
//     resolver: zodResolver(resultSchema),
//   });

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isExam, setIsExam] = useState<boolean>(true);

//   // Use the appropriate server action based on the form type
//   const [state, formAction] = useFormState(
//     type === "create" ? createResult : updateResult,
//     {
//       success: false,
//       error: false,
//     }
//   );

//   const onSubmit = handleSubmit((data) => {
//     setIsLoading(true);
//     formAction(data);
//   });

//   const router = useRouter();

//   useEffect(() => {
//     if (state.success) {
//       toast.success(`Result has been ${type === "create" ? "created" : "updated"}!`);
//       setOpen(false);
//       router.refresh();
//     }
//     if (state.error) {
//       setIsLoading(false);
//       toast.error(state.error);
//     }
//   }, [state, router, type, setOpen]);

//   const { exams, assignments, students } = relatedData;

//   return (
//     <form
//       className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-xl max-w-2xl mx-auto"
//       onSubmit={onSubmit}
//     >
//       <h1 className="text-2xl font-bold text-gray-800">
//         {type === "create" ? "Create a New Result" : "Update Result"}
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Score Input */}
//         <InputField
//           label="Score"
//           name="score"
//           defaultValue={data?.score}
//           register={register}
//           error={errors?.score}
//           type="number"
//           inputProps={{ min: 0, max: 100 }}
//         />


//             <label className="text-sm font-medium text-gray-700">Type</label>
//             <div className="flex gap-2">
//                 <button onClick={() => setIsExam(!isExam)}>Click</button>
                
//                 {/* <label htmlFor="exam" className="text-sm text-gray-600">
//                     Exam
//                 </label> */}
//             </div>

//         {/* Student Dropdown */}

//         {/* Exam Dropdown */}
//         {
//             isExam &&
//                 <div className="flex flex-col gap-2">
//                     <label className="text-sm font-medium text-gray-700">Exam</label>
//                     <select
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                         {...register("examId")}
//                         defaultValue={data?.examId}
                        
//                     >
//                         <option value="">Select an Exam</option>
//                         {exams.map((exam: { id: number; title: string }) => (
//                         <option value={exam.id} key={exam.id} className="p-2">
//                             {exam.title}
//                         </option>
//                         ))}
//                     </select>
//                     {errors.examId?.message && (
//                         <p className="text-xs text-red-500 mt-1">
//                         {errors.examId.message.toString()}
//                         </p>
//                     )}
//                     </div>
//         }

//         {/* Assignment Dropdown */}
//         {
//             !isExam && 
//                 <div className="flex flex-col gap-2">
//                     <label className="text-sm font-medium text-gray-700">Assignment</label>
//                     <select
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                         {...register("assignmentId")}
//                         defaultValue={data?.assignmentId}
//                     >
//                         <option value="">Select an Assignment</option>
//                         {assignments.map((assignment: { id: number; title: string }) => (
//                         <option value={assignment.id} key={assignment.id} className="p-2">
//                             {assignment.title}
//                         </option>
//                         ))}
//                     </select>
//                     {errors.assignmentId?.message && (
//                         <p className="text-xs text-red-500 mt-1">
//                         {errors.assignmentId.message.toString()}
//                         </p>
//                     )}
//                 </div>
//         }

//         {/* Student Dropdown */}
//         {/* <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-gray-700">Student</label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//             {...register("studentId")}
//             defaultValue={data?.studentId}
//           >
//             <option value="">Select a Student</option>
//             {students.map((student: { id: string; name: string; surname: string }) => (
//               <option value={student.id} key={student.id} className="p-2">
//                 {student.name} {student.surname}
//               </option>
//             ))}
//           </select>
//           {errors.studentId?.message && (
//             <p className="text-xs text-red-500 mt-1">
//               {errors.studentId.message.toString()}
//             </p>
//           )}
//         </div> */}

//         {/* Hidden ID Field for Updates */}
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
//       </div>

//       {/* Error Message */}
//       {state.error && (
//         <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <span className="text-sm text-red-600">Something went wrong! Please try again.</span>
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-300"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center gap-2">
//             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             <span>Processing...</span>
//           </div>
//         ) : (
//           type === "create" ? "Create Result" : "Update Result"
//         )}
//       </button>
//     </form>
//   );
// };

// export default ResultForm;