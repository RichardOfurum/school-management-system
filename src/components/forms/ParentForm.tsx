"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ParentSchema, parentSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createParent, updateParent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ParentForm = ({
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
  } = useForm<ParentSchema>({
    resolver: zodResolver(parentSchema),
    defaultValues: data || {},
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [selectedStudents, setSelectedStudents] = useState<string[]>(data?.students || []);

  const [state, formAction] = useFormState(
    type === "create" ? createParent : updateParent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    formAction(data);
    console.log(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setIsLoading(false);
      toast.success(`Parent has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
    if (state.error) {
      setIsLoading(false);
      toast.error(state.error);
    }
  }, [state, router, type, setOpen]);

  // Safely access the students array from relatedData
  // const students = relatedData?.students || [];

//   console.log(students);

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = event.target;
//     const studentObj = students.find((s:any) => s.id === value); // Get full student object

//     if (!studentObj) return; // Prevent errors if student is not found

//     setSelectedStudents((prev) =>
//         checked ? [...prev, studentObj] : prev.filter((s:any) => s.id !== value)
//     );
// };

  // useEffect(() => {
  //   if (data?.students) {
  //       setSelectedStudents(data.students);
  //   }
  //   }, [data]);

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Parent" : "Update Parent"}
      </h1>

      {/* Authentication Information */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Authentication Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
            register={register}
            error={errors?.password}
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="First Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
          <InputField
            label="Last Name"
            name="surname"
            defaultValue={data?.surname}
            register={register}
            error={errors?.surname}
          />
          <InputField
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
          />
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors?.phone}
          />
          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors?.address}
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

      {/* Assign Students */}
      {/* <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Assign Students
        </h2>
        <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600">Students</label>
                    <div className="border border-gray-300 rounded-md p-4 space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                      
                        {students.map((student: { id: string; name: string; surname: string }) => (
                            <label
                            key={student.id}
                            className="flex items-center space-x-2 text-sm"
                            >

                                <input
                                    type="checkbox"
                                    value={student.id}
                                    {...register("students")}
                                    checked={selectedStudents.some((s:any) => s.id === student.id)} // Fix: Compare objects correctly
                                    onChange={handleCheckboxChange}
                                    className="rounded-md ring-[1.5px] ring-gray-300 focus:ring-blue-500"
                                />

                            <span>{student.name + " " + student.surname}</span>
                            </label>
                        ))}
                    </div>

                {errors.students?.message && (
                    <p className="text-xs text-red-400">
                    {errors.students.message.toString()}
                    </p>
                )}
                </div>
      </div> */}

      {/* Error Message */}
      {state.error && (
        <div className="text-red-500 text-sm mt-4">{state.error}</div>
      )}

      {/* Submit Button */}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ParentForm;

