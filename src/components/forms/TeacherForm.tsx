"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
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
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [img, setImg] = useState<any>();
  const [updateImg, setUpdateImg] = useState<string>();

  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: null,
    }
  );

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    formAction({ ...data, img: updateImg && type === "update" ? updateImg : img?.secure_url});
    // formAction({ ...formData, img: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setIsLoading(false);
      toast.success(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }

    if (state.error) {
      setIsLoading(false);
      toast.error(state.error);
    }
  }, [state, router, type, setOpen]);

  useEffect(() =>{
    if(data){
      setUpdateImg(data.img);
    }
  },[]);

  const { subjects } = relatedData;

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Teacher" : "Update Teacher"}
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
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
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

      {/* Image Upload with Cloudinary */}
      <CldUploadWidget
            uploadPreset="school"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <div
                className="flex flex-col gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <label className="text-xs text-gray-500">Profile Photo</label>
                <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {updateImg || img ?  (
                    <Image
                      src={updateImg || img.secure_url}
                      alt="Uploaded"
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Image
                        src="/upload.png"
                        alt="Upload"
                        width={28}
                        height={28}
                      />
                      <span className="text-xs text-gray-500">Upload a photo</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CldUploadWidget>

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
            error={errors.name}
          />
          <InputField
            label="Last Name"
            name="surname"
            defaultValue={data?.surname}
            register={register}
            error={errors.surname}
          />
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors.phone}
          />
          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors.address}
          />
          <InputField
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
            register={register}
            error={errors.bloodType}
          />
          <InputField
            label="Birthday"
            name="birthday"
            defaultValue={data?.birthday?.toISOString().split("T")[0]}
            register={register}
            error={errors.birthday}
            type="date"
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

      {/* Additional Information */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Additional Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sex Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Sex</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("sex")}
              defaultValue={data?.sex}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.sex?.message && (
              <p className="text-xs text-red-500">{errors.sex.message.toString()}</p>
            )}
          </div>

          {/* Subjects Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Subjects</label>
            <select
              multiple
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 scrollbar-thin"
              {...register("subjects")}
              defaultValue={data?.subjects}
            >
              {subjects.map((subject: { id: number; name: string }) => (
                <option value={subject.id} key={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {errors.subjects?.message && (
              <p className="text-xs text-red-500">{errors.subjects.message.toString()}</p>
            )}
          </div>

          
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="text-red-500 text-sm mt-4">
          {state.error}
        </div>
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

export default TeacherForm;
