"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { prospectusSchema, ProspectusSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createProspectus, updateProspectus } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const ProspectusForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProspectusSchema>({
    resolver: zodResolver(prospectusSchema),
    defaultValues: {
      title: data?.title || "",
      file: data?.file || "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [updateFile, setUpdateFile] = useState<string>(data?.file || "");

  const [state, formAction] = useFormState(
    type === "create" ? createProspectus : updateProspectus,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);

    // Prepare the data to be sent to the server action
    const payload = {
      ...formData,
      file: updateFile || file?.secure_url,
      id: data?.id, // Include the ID for updates
    };

    // Call the server action
    formAction(payload);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setIsLoading(false);
      toast.success(`Prospectus has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
    if (state.error) {
      setIsLoading(false);
      toast.error(state.error);
    }
  }, [state, router, type, setOpen]);

  useEffect(() => {
    if (data) {
      setUpdateFile(data.file);
    }
  }, [data]);

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Prospectus" : "Update Prospectus"}
      </h1>

      {/* Title Field */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Prospectus Information
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors?.title}
          />
        </div>
      </div>

      {/* File Upload with Cloudinary */}
      <CldUploadWidget
        uploadPreset="school"
        onSuccess={(result, { widget }) => {
          setFile(result.info);
          widget.close();
        }}
      >
        {({ open }) => (
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => open()}
          >
            <label className="text-xs text-gray-500">Prospectus File</label>
            <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {updateFile || file ? (
                <span className="text-sm text-gray-700">
                  File uploaded!
                   {/* {updateFile || file.secure_url} */}
                </span>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500">Upload a file</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CldUploadWidget>

      {/* Hidden ID Field for Updates */}
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

export default ProspectusForm;

