"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EventSchema, eventSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createEvent, updateEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EventForm = ({
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
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: data || {},
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [state, formAction] = useFormState(
    type === "create" ? createEvent : updateEvent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    // No need to manually check for empty string; react-hook-form handles it
    setIsLoading(true);
    formAction(formData);
    console.log(formData);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setIsLoading(false);
      toast.success(`Event has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
    if (state.error) {
      setIsLoading(false);
      toast.error(state.error);
    }
  }, [state, router, type, setOpen]);

  const classes = relatedData?.classes || [];

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Event" : "Update Event"}
      </h1>

      {/* Event Information */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Event Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors?.title}
          />
          <InputField
            label="Description"
            name="description"
            defaultValue={data?.description}
            register={register}
            error={errors?.description}
          />
          <InputField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            defaultValue={data?.startTime ? new Date(data.startTime).toISOString().slice(0, 16) : ""}
            register={register}
            error={errors?.startTime}
          />
          <InputField
            label="End Time"
            name="endTime"
            type="datetime-local"
            defaultValue={data?.endTime ? new Date(data.endTime).toISOString().slice(0, 16) : ""}
            register={register}
            error={errors?.endTime}
          />
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">Class</label>
            <select
              {...register("classId", {
                setValueAs: (value) => (value === "" ? undefined : Number(value)),
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={data?.classId || ""}
            >
              <option value="">Select a class</option>
              {classes.map((cls: { id: number; name: string }) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            {errors.classId?.message && (
              <p className="text-xs text-red-500 mt-1">{errors.classId.message.toString()}</p>
            )}
          </div>
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

export default EventForm;
