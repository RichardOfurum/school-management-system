"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { postSchema, PostSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createPost, updatePost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const PostForm = ({
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
    setValue,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      image: data?.image || "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [img, setImg] = useState<any>();
  const [updateImg, setUpdateImg] = useState<string>(data?.image || "");

  const [state, formAction] = useFormState(
    type === "create" ? createPost : updatePost,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    try {
        setIsLoading(true);

        // Prepare the data to be sent to the server action
        const payload = {
          ...formData,
          image: img?.secure_url || updateImg, // Use the new image URL if uploaded, otherwise keep the existing one
        };
    
        if (type === "update" && data?.id) {
          payload.id = data.id; // Include the post ID for updates
        }
    
        formAction(payload);
    } catch (error) {
      toast.success("Something went wrong, please try again!");
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setIsLoading(false);
      toast.success(`Post has been ${type === "create" ? "created" : "updated"}!`);
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
      // Pre-fill form fields with existing data
      setValue("title", data.title);
      setValue("description", data.description);
      setUpdateImg(data.image); // Set the image URL for updates
    }
  }, [data, setValue]);

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Post" : "Update Post"}
      </h1>

      {/* Post Title */}
      <div className="space-y-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
      </div>

      {/* Image Upload with Cloudinary */}
      <div className="space-y-4">
        <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            setImg(result.info); // Set the new image data
            setUpdateImg(""); // Clear the existing image URL to ensure the new image is used
            widget.close();
          }}
        >
          {({ open }) => (
            <div
              className="flex flex-col gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <label className="text-xs text-gray-500">Post Image</label>
              <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {img?.secure_url || updateImg ? (
                  <Image
                    src={img?.secure_url || updateImg}
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
                    <span className="text-xs text-gray-500">Upload an image</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CldUploadWidget>
      </div>

      {/* Description (Text Area) */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description")}
          defaultValue={data?.description}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={5}
          placeholder="Enter post description..."
        />
        {errors.description?.message && (
          <p className="text-xs text-red-500 mt-1">{errors.description.message.toString()}</p>
        )}
      </div>

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

export default PostForm;
