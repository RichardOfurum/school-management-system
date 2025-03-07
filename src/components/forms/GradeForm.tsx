"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { gradeSchema, GradeSchema } from "@/lib/formValidationSchemas";
import { createGrade, updateGrade } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const GradeForm = ({
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
  } = useForm<GradeSchema>({
    resolver: zodResolver(gradeSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Use the appropriate server action based on the form type
  const [state, formAction] = useFormState(
    type === "create" ? createGrade : updateGrade,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Grade has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
      setIsLoading(false);
    }
    if (state.error) {
      setIsLoading(false);
      toast.error(state.error); // Display the specific error message
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8 scrollbar-thin" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new grade" : "Update the grade"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Grade Level"
          name="level"
          type="number"
          defaultValue={data?.level}
          register={register}
          error={errors?.level}
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
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {isLoading ? "Loading..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default GradeForm;