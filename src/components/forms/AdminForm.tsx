"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AdminSchema, adminSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createAdmin, updateAdmin } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminForm = ({
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
  } = useForm<AdminSchema>({
    resolver: zodResolver(adminSchema),
    defaultValues: data || {},
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [state, formAction] = useFormState(
    type === "create" ? createAdmin : updateAdmin,
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
      toast.success(`Admin has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
    if (state.error) {
      setIsLoading(false);
      toast.error(state.error);
    }
  }, [state, router, type, setOpen]);

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Admin" : "Update Admin"}
      </h1>

      {/* Authentication Information */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Authentication Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
          />
          
          {type === "create" && (
            <InputField
              label="Password"
              name="password"
              type="password"
              defaultValue={data?.password}
              register={register}
              error={errors?.password}
            />
          )}
          {type === "update" && (
            <InputField
              label="New Password (Optional)"
              name="password"
              type="password"
              defaultValue=""
              register={register}
              error={errors?.password}
            />
          )}

        </div>  
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Admin Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <InputField
                label="First Name"
                name="firstName"
                defaultValue={data?.firstName}
                register={register}
                error={errors?.firstName}
              />
              <InputField
                label="Surname"
                name="surname"
                defaultValue={data?.surname}
                register={register}
                error={errors?.surname}
              />
        </div>
      </div>

      {/* Admin ID (Hidden for Create, Visible for Update) */}
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

export default AdminForm;