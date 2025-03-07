// "use client";

// import { zodResolver } from '@hookform/resolvers/zod';
// import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import InputField from '../InputField';
// import { LessonSchema, lessonSchema } from '@/lib/formValidationSchemas';
// import { createLesson, updateLesson, fetchStudentsForLesson, saveAttendance, fetchAttendanceForLesson } from '@/lib/actions';
// import { useFormState } from "react-dom";
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';

// const LessonForm = ({
//     type,
//     data,
//     setOpen,
//     relatedData,
//     userId,
// }: {
//     type: "create" | "update";
//     data?: any;
//     setOpen: Dispatch<SetStateAction<boolean>>;
//     relatedData?: any;
//     userId?: string;
// }) => {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showAttendance, setShowAttendance] = useState(false);
//     const [students, setStudents] = useState<any[]>([]);
//     const [attendanceRecords, setAttendanceRecords] = useState<{ studentId: string; present: boolean }[]>([]);

//     const { user } = useUser();
//     const role = user?.publicMetadata.role;

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LessonSchema>({
//         resolver: zodResolver(lessonSchema),
//     });

//     const [state, formAction] = useFormState(
//         type === "create" ? createLesson : updateLesson,
//         {
//             success: false,
//             error: false,
//         }
//     );

//     const onSubmit = handleSubmit((formData) => {
//         setIsSubmitting(true);
//         const startTime = new Date(formData.startTime);
//         const dayOfWeek = startTime.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
//         const updatedData = { ...formData, day: dayOfWeek, teacherId: role === 'teacher' ? user?.id : formData.teacherId };
//         console.log(updatedData);
//         formAction(updatedData);
//     });

//     const router = useRouter();

//     useEffect(() => {
//         if (state.success) {
//             toast.success(`Lesson has been ${type === "create" ? "created" : "updated"}!`);
//             router.refresh();
//             setOpen(false);
//         }

//         if (state.error) {
//             setIsSubmitting(false);
//             toast.error(state.error);
//         }
//     }, [state, router, type, setOpen]);

//     const { subjects, classes, teachers } = relatedData;

//     const handleShowAttendance = async () => {
//         try {
//             if (!showAttendance) {
//                 const students = await fetchStudentsForLesson(data.id);
//                 const existingAttendance = await fetchAttendanceForLesson(data.id);

//                 const initialAttendanceRecords = students.map((student: any) => {
//                     const existingRecord = existingAttendance.find((att: any) => att.studentId === student.id);
//                     return {
//                         studentId: student.id,
//                         present: existingRecord ? existingRecord.present : false,
//                     };
//                 });

//                 setStudents(students);
//                 setAttendanceRecords(initialAttendanceRecords);
//             }
//             setShowAttendance(!showAttendance); // Toggle the visibility
//         } catch (err) {
//             console.error("Error fetching students or attendance:", err);
//             toast.error("Failed to fetch students or attendance records.");
//         }
//     };

//     const handleAttendanceChange = (studentId: string, present: boolean) => {
//         setAttendanceRecords(prevRecords =>
//             prevRecords.map(record =>
//                 record.studentId === studentId ? { ...record, present } : record
//             )
//         );
//     };

//     const handleSaveAttendance = async () => {
//         try {
//             await saveAttendance(data.id, attendanceRecords);
//             toast.success("Attendance records saved successfully!");
//         } catch (err) {
//             console.error("Error saving attendance records:", err);
//             toast.error("Failed to save attendance records.");
//         }
//     };

//     return (
//         <form
//             className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
//             onSubmit={onSubmit}
//         >
//             <h1 className="text-2xl font-bold text-gray-800">
//                 {type === "create" ? "Create a New Lesson" : "Update the Lesson"}
//             </h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputField
//                     label="Lesson Name"
//                     name="name"
//                     defaultValue={data?.name}
//                     register={register}
//                     error={errors?.name}
//                 />
//                 <InputField
//                     label="Start Time"
//                     name="startTime"
//                     type="datetime-local"
//                     defaultValue={data?.startTime}
//                     register={register}
//                     error={errors?.startTime}
//                 />
//                 <InputField
//                     label="End Time"
//                     name="endTime"
//                     type="datetime-local"
//                     defaultValue={data?.endTime}
//                     register={register}
//                     error={errors?.endTime}
//                 />
//                 {data && (
//                     <InputField
//                         label="Id"
//                         name="id"
//                         defaultValue={data?.id}
//                         register={register}
//                         error={errors?.id}
//                         hidden
//                     />
//                 )}
//             </div>

//             <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-700">Subject</label>
//                 <select
//                     {...register("subjectId")}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     defaultValue={data?.subjectId}
//                 >
//                     {subjects.map((subject: { id: number; name: string }) => (
//                         <option key={subject.id} value={subject.id}>
//                             {subject.name}
//                         </option>
//                     ))}
//                 </select>
//                 {errors.subjectId?.message && (
//                     <p className="text-xs text-red-500 mt-1">
//                         {errors.subjectId.message.toString()}
//                     </p>
//                 )}
//             </div>

//             <div className="flex flex-col gap-2">
//                 <label className="text-sm font-medium text-gray-700">Class</label>
//                 <select
//                     {...register("classId")}
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     defaultValue={data?.classId}
//                 >
//                     {classes.map((classItem: { id: number; name: string }) => (
//                         <option key={classItem.id} value={classItem.id}>
//                             {classItem.name}
//                         </option>
//                     ))}
//                 </select>
//                 {errors.classId?.message && (
//                     <p className="text-xs text-red-500 mt-1">
//                         {errors.classId.message.toString()}
//                     </p>
//                 )}
//             </div>

//             <div className="flex flex-col gap-2">
//                 {role === "admin" ? (
//                     <>
//                         <label className="text-sm font-medium text-gray-700">Teacher</label>
//                         <select
//                             {...register("teacherId")}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             defaultValue={data?.teacherId}
//                         >
//                             {teachers.map((teacher: { id: string; name: string; surname: string }) => (
//                                 <option key={teacher.id} value={teacher.id}>
//                                     {teacher.name} {teacher.surname}
//                                 </option>
//                             ))}
//                         </select>
//                     </>
//                 ) : (
//                     <input
//                         type="text"
//                         {...register("teacherId")}
//                         defaultValue={userId}
//                         hidden
//                     />
//                 )}
//                 {errors.teacherId?.message && (
//                     <p className="text-xs text-red-500 mt-1">
//                         {errors.teacherId.message.toString()}
//                     </p>
//                 )}
//             </div>

//             {type === 'update' && (
//                 <div className="flex flex-col gap-4">
//                     <button
//                         type="button"
//                         className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
//                         onClick={handleShowAttendance}
//                     >
//                         {showAttendance ? "Hide Attendance" : "Enter Attendance"}
//                     </button>

//                     {showAttendance && (
//                         <div className="flex flex-col gap-4">
//                             {students.map((student) => (
//                                 <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                                     <span className="text-sm font-medium text-gray-700">
//                                         {student.name} {student.surname}
//                                     </span>
//                                     <input
//                                         type="checkbox"
//                                         checked={attendanceRecords.find(record => record.studentId === student.id)?.present || false}
//                                         onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
//                                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                     />
//                                 </div>
//                             ))}
//                             <button
//                                 type="button"
//                                 className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
//                                 onClick={handleSaveAttendance}
//                             >
//                                 Save Attendance
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {state.error && (
//                 <span className="text-sm text-red-500">Something went wrong!</span>
//             )}

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//                 disabled={isSubmitting}
//             >
//                 {isSubmitting ? "Loading..." : type === "create" ? "Create Lesson" : "Update Lesson"}
//             </button>
//         </form>
//     );
// };

// export default LessonForm;

"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { LessonSchema, lessonSchema } from '@/lib/formValidationSchemas';
import { createLesson, updateLesson, fetchStudentsForLesson, saveAttendance, fetchAttendanceForLesson } from '@/lib/actions';
import { useFormState } from "react-dom";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const LessonForm = ({
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
    const [showAttendance, setShowAttendance] = useState(false);
    const [students, setStudents] = useState<any[]>([]);
    const [attendanceRecords, setAttendanceRecords] = useState<{ studentId: string; present: boolean }[]>([]);

    const { user } = useUser();
    const role = user?.publicMetadata.role;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LessonSchema>({
        resolver: zodResolver(lessonSchema),
    });

    const [state, formAction] = useFormState(
        type === "create" ? createLesson : updateLesson,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((formData) => {
        setIsSubmitting(true);
        const startTime = new Date(formData.startTime);
        const dayOfWeek = startTime.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const updatedData = { ...formData, day: dayOfWeek, teacherId: role === 'teacher' ? user?.id : formData.teacherId };
        console.log(updatedData);
        formAction(updatedData);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success(`Lesson has been ${type === "create" ? "created" : "updated"}!`);
            router.refresh();
            setOpen(false);
        }

        if (state.error) {
            setIsSubmitting(false);
            toast.error(state.error);
        }
    }, [state, router, type, setOpen]);

    const { subjects, classes, teachers } = relatedData;

    const handleShowAttendance = async () => {
        try {
            if (!showAttendance) {
                const students = await fetchStudentsForLesson(data.id);
                const existingAttendance = await fetchAttendanceForLesson(data.id);

                const initialAttendanceRecords = students.map((student: any) => {
                    const existingRecord = existingAttendance.find((att: any) => att.studentId === student.id);
                    return {
                        studentId: student.id,
                        present: existingRecord ? existingRecord.present : false,
                    };
                });

                setStudents(students);
                setAttendanceRecords(initialAttendanceRecords);
            }
            setShowAttendance(!showAttendance); // Toggle the visibility
        } catch (err) {
            console.error("Error fetching students or attendance:", err);
            toast.error("Failed to fetch students or attendance records.");
        }
    };

    const handleAttendanceChange = (studentId: string, present: boolean) => {
        setAttendanceRecords(prevRecords =>
            prevRecords.map(record =>
                record.studentId === studentId ? { ...record, present } : record
            )
        );
    };

    const handleSaveAttendance = async () => {
        try {
            await saveAttendance(data.id, attendanceRecords);
            toast.success("Attendance records saved successfully!");
        } catch (err) {
            console.error("Error saving attendance records:", err);
            toast.error("Failed to save attendance records.");
        }
    };

    return (
        <form
            className='flex flex-col gap-8 overflow-auto max-h-[600px] h-auto scrollbar-thin'
            onSubmit={onSubmit}
        >
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create a new lesson" : "Update the lesson"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Lesson name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                <InputField
                    label="Start Time"
                    name="startTime"
                    type="datetime-local"
                    defaultValue={data?.startTime}
                    register={register}
                    error={errors?.startTime}
                />
                <InputField
                    label="End Time"
                    name="endTime"
                    type="datetime-local"
                    defaultValue={data?.endTime}
                    register={register}
                    error={errors?.endTime}
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

            <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600">Subject</label>
                <select
                    {...register("subjectId")}
                    className="border border-gray-300 rounded-md p-2"
                    defaultValue={data?.subjectId}
                >
                    {subjects.map((subject: { id: number; name: string }) => (
                        <option key={subject.id} value={subject.id}>
                            {subject.name}
                        </option>
                    ))}
                </select>
                {errors.subjectId?.message && (
                    <p className="text-xs text-red-400">
                        {errors.subjectId.message.toString()}
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600">Class</label>
                <select
                    {...register("classId")}
                    className="border border-gray-300 rounded-md p-2"
                    defaultValue={data?.classId}
                >
                    {classes.map((classItem: { id: number; name: string }) => (
                        <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                        </option>
                    ))}
                </select>
                {errors.classId?.message && (
                    <p className="text-xs text-red-400">
                        {errors.classId.message.toString()}
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                {role === "admin" ? (
                    <>
                        <label className="text-xs font-medium text-gray-600">Teacher</label>
                        <select
                            {...register("teacherId")}
                            className="border border-gray-300 rounded-md p-2"
                            defaultValue={data?.teacherId}
                        >
                            {teachers.map((teacher: { id: string; name: string; surname: string }) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name} {teacher.surname}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <input
                        type="text"
                        {...register("teacherId")}
                        defaultValue={userId}
                        hidden
                    />
                )}
                {errors.teacherId?.message && (
                    <p className="text-xs text-red-400">
                        {errors.teacherId.message.toString()}
                    </p>
                )}
            </div>

            {type === 'update' && (
                <div className="flex flex-col gap-4">
                    <p
                        className=" text-black p-2 font-semibold cursor-pointer"
                        onClick={handleShowAttendance}
                    >
                        {showAttendance ? "Hide Attendance" : "Enter Attendance"}
                    </p>

                    {showAttendance && (
                        <div className="flex flex-col gap-4">
                            {students.map((student) => (
                                <div key={student.id} className="flex items-center gap-4 justify-between bg-gray-50 p-4 rounded-md">
                                    <span>{student.name} {student.surname}</span>
                                    <input
                                        type="checkbox"
                                        checked={attendanceRecords.find(record => record.studentId === student.id)?.present || false}
                                        onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                className="bg-green-600 text-white p-2 rounded-md"
                                onClick={handleSaveAttendance}
                            >
                                Save Attendance
                            </button>
                        </div>
                    )}
                </div>
            )}

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

export default LessonForm;
