"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { createExam, updateExam, fetchStudentsForExam, saveExamResults } from "@/lib/actions";
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
  const [showStudentResults, setShowStudentResults] = useState<boolean>(false);
  const [studentResults, setStudentResults] = useState<
    { studentId: string; name: string; score: number }[]
  >([]);

  // Use the appropriate server action based on the form type
  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
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

  const handleShowStudentResults = async () => {
    if (type === "update" && data?.id) {
      try {
        const students = await fetchStudentsForExam(data.id);
        setStudentResults(
          students.map((student: any) => ({
            studentId: student.id,
            name: `${student.name} ${student.surname}`,
            score: 0,
          }))
        );
        setShowStudentResults(true);
      } catch (err) {
        console.error("Error fetching students:", err);
        toast.error("Failed to fetch students");
      }
    }
  };

  const handleSaveStudentResults = async () => {
    try {
      await saveExamResults(
        data.id,
        studentResults.map((result) => ({ studentId: result.studentId, score: result.score }))
      );
      toast.success("Student results saved successfully!");
    } catch (err) {
      console.error("Error saving student results:", err);
      toast.error("Failed to save student results");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create a New Exam" : "Update Exam"}
      </h1>

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Exam Title"
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Lesson</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              {...register("lessonId")}
              defaultValue={data?.lessonId}
            >
              {lessons.map((lesson: { id: number; name: string }) => (
                <option value={lesson.id} key={lesson.id} className="p-2">
                  {lesson.name}
                </option>
              ))}
            </select>
            {errors.lessonId?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lessonId.message.toString()}
              </p>
            )}
          </div>
        </div>

        {state.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-sm text-red-600">Something went wrong! Please try again.</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            type === "create" ? "Create Exam" : "Update Exam"
          )}
        </button>
      </form>

      {type === "update" && (
        <div className="mt-6">
          <p
            className="md:w-auto px-6 py-3  text-black font-semibold rounded-lg cursor-pointer w-fit hover:text-gray-600"
            onClick={handleShowStudentResults}
          >
            Enter Students&apos; Exam Results
          </p>

          {showStudentResults && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Students&apos; Results</h2>
              <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {studentResults.map((result, index) => (
                  <div key={result.studentId} className="flex flex-row gap-2 mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      {result.name}
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={result.score}
                      onChange={(e) => {
                        const newResults = [...studentResults];
                        newResults[index].score = parseInt(e.target.value);
                        setStudentResults(newResults);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all mt-4"
                onClick={handleSaveStudentResults}
              >
                Save Results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamForm;
