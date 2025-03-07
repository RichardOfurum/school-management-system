import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(10, { message: "Username must be at least 10 characters long!" }),
    // .max(20, { message: "Username must be at most 20 characters long!" }),
  // password: z
  //   .string()
  //   .min(8, { message: "Password must be at least 8 characters long!" })
  //   .optional()
  //   .or(z.literal("")),
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters long!" })
  .refine(
    (value) => /[A-Z]/.test(value),
    "Password must contain at least one capital letter!"
  )
  .refine(
    (value) => /[0-9]/.test(value),
    "Password must contain at least one number!"
  )
  .refine(
    (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
    "Password must contain at least one special character!"
  )
  .optional()
  .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(10, { message: "Username must be at least 10 characters long!" }),
    // .max(20, { message: "Username must be at most 20 characters long!" }),
  // password: z
  //   .string()
  //   .min(8, { message: "Password must be at least 8 characters long!" })
  //   .optional()
  //   .or(z.literal("")),
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters long!" })
  .refine(
    (value) => /[A-Z]/.test(value),
    "Password must contain at least one capital letter!"
  )
  .refine(
    (value) => /[0-9]/.test(value),
    "Password must contain at least one number!"
  )
  .refine(
    (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
    "Password must contain at least one special character!"
  )
  .optional()
  .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;


export const parentSchema = z.object({
  id: z.string().optional(), // Optional for creation, required for updates
  username: z
    .string()
    .min(10, { message: "Username must be at least 10 characters long!" }),
    // .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must contain at least one capital letter!"
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must contain at least one number!"
    )
    .refine(
      (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      "Password must contain at least one special character!"
    )
    .optional()
    .or(z.literal("")), // Optional for updates, required for creation
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")), // Optional field
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long!" })
    .max(15, { message: "Phone number must be at most 15 digits long!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  // students: z.array(z.string()).optional(), // Array of student IDs
});

export type ParentSchema = z.infer<typeof parentSchema>;


export const eventSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  classId: z.coerce.number().optional(), // Optional foreign key
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time!",
  path: ["endTime"], // This targets the specific field in the error message
});

export type EventSchema = z.infer<typeof eventSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  name: z.string().min(1, { message: "Lesson name is required!" }),
  day: z.string().optional(), // Optional because it will be derived from 
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  subjectId: z.coerce.number().min(1, { message: "Subject ID is required!" }),
  classId: z.coerce.number().min(1, { message: "Class ID is required!" }),
  teacherId: z.string().optional(),
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time!",
  path: ["endTime"], // This targets the specific field in the error message
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const adminSchema = z.object({
  id: z.string().optional(), // Optional for creation, required for updates
  username: z.string().min(1, { message: "Username is required!" }).max(50, { message: "Username must be at most 50 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must contain at least one capital letter!"
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must contain at least one number!"
    )
    .refine(
      (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      "Password must contain at least one special character!"
    )
    .optional()
    .or(z.literal("")), // Optional for updates, required for creation
});

export type AdminSchema = z.infer<typeof adminSchema>;


export const announcementSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  date: z.coerce.date({ message: "Date is required!" }),
  classId: z.coerce.number().optional(), // Optional foreign key
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;


export const gradeSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  level: z.coerce.number().min(1, { message: "Grade level is required!" }).refine(
    (value) => Number.isInteger(value),
    { message: "Grade level must be an integer!" }
  ),
  createdAt: z.coerce.date().optional(), // Automatically set by the database
  updatedAt: z.coerce.date().optional(), // Automatically set by the database
});

export type GradeSchema = z.infer<typeof gradeSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  title: z.string().min(1, { message: "Title is required!" }),
  startDate: z.coerce.date({ message: "Start date is required!" }),
  dueDate: z.coerce.date({ message: "Due date is required!" }),
  lessonId: z.coerce.number().min(1, { message: "Lesson ID is required!" }),
  createdAt: z.coerce.date().optional(), // Automatically set by the database
  updatedAt: z.coerce.date().optional(), // Automatically set by the database
}).refine((data) => data.dueDate > data.startDate, {
  message: "Due date must be after start date!",
  path: ["dueDate"], // This targets the specific field in the error message
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const resultSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  score: z.coerce.number().min(0, { message: "Score must be a non-negative number!" }),

  examId: z.coerce.number().optional(), // Optional foreign key
  assignmentId: z.coerce.number().optional(), // Optional foreign key
  studentId: z.string().min(1, { message: "Student ID is required!" }),

  createdAt: z.coerce.date().optional(), // Automatically set by the database
  updatedAt: z.coerce.date().optional(), // Automatically set by the database
});

export type ResultSchema = z.infer<typeof resultSchema>;


export const postSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  title: z.string().min(1, { message: "Post Title required!" }),
  description: z.string().min(1, { message: "Post description required!" }), // Corrected typo here
  image: z.string().optional(),
  createdAt: z.coerce.date().optional(), // Automatically set by the database
  updatedAt: z.coerce.date().optional(), // Automatically set by the database
});

export type PostSchema = z.infer<typeof postSchema>;

export const prospectusSchema = z.object({
  id: z.coerce.number().optional(), // Optional for creation, required for updates
  title: z.string()
    .min(1, { message: "Title required!" })
    .max(100, { message: "Title must be less than 100 characters!" }),
  file: z.string().optional(),
});

export type ProspectusSchema = z.infer<typeof prospectusSchema>;