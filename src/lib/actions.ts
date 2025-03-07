
"use server";

import { revalidatePath } from "next/cache";
import {
  adminSchema,
  AdminSchema,
  announcementSchema,
  AnnouncementSchema,
  assignmentSchema,
  AssignmentSchema,
  ClassSchema,
  EventSchema,
  ExamSchema,
  gradeSchema,
  GradeSchema,
  lessonSchema,
  LessonSchema,
  parentSchema,
  ParentSchema,
  postSchema,
  PostSchema,
  prospectusSchema,
  ProspectusSchema,
  resultSchema,
  ResultSchema,
  studentSchema,
  StudentSchema,
  SubjectSchema,
  teacherSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import { currentUser, clerkClient } from "@clerk/nextjs/server";



type CurrentState = { success: boolean; error: boolean | string };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};



export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    // Validate the input data using the schema object
    const validatedData = teacherSchema.parse(data); // Use `teacherSchema`, not `TeacherSchema`

    // Create a new user in Clerk
    const clerk = await clerkClient(); // Ensure proper initialization
    const user = await clerk.users.createUser({
      username: validatedData.username,
      password: validatedData.password,
      firstName: validatedData.name,
      lastName: validatedData.surname,
      publicMetadata: { role: "teacher" },
    });

    // Create a new teacher in the database
    await prisma.teacher.create({
      data: {
        id: user.id, // Use Clerk-generated ID
        username: validatedData.username,
        name: validatedData.name,
        surname: validatedData.surname,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        address: validatedData.address,
        img: validatedData.img || null,
        bloodType: validatedData.bloodType,
        sex: validatedData.sex,
        birthday: validatedData.birthday,
        subjects: {
          connect: validatedData.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId, 10),
          })),
        },
      },
    });

    return { success: true, error: null }; // No error
  } catch (err: any) {
    console.error("Error creating teacher:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      // Extract and format Zod validation errors
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A teacher with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create teacher. Please try again." };
  }
};



export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  // Validate the input data using the schema object
  try {
    const validatedData = teacherSchema.parse(data); // Validate input data

    if (!validatedData.id) {
      return { success: false, error: "Teacher ID is required for updating." };
    }

    // Update the user in Clerk
    const clerk = await clerkClient(); // Ensure proper initialization
    const user = await clerk.users.updateUser(validatedData.id, {
      username: validatedData.username,
      ...(validatedData.password && { password: validatedData.password }), // Only update password if provided
      firstName: validatedData.name,
      lastName: validatedData.surname,
    });

    // Update the teacher in the database
    await prisma.teacher.update({
      where: {
        id: validatedData.id,
      },
      data: {
        username: validatedData.username,
        name: validatedData.name,
        surname: validatedData.surname,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        address: validatedData.address,
        img: validatedData.img || null,
        bloodType: validatedData.bloodType,
        sex: validatedData.sex,
        birthday: validatedData.birthday,
        subjects: {
          set: validatedData.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId, 10),
          })),
        },
      },
    });

    // Revalidate the path if necessary (e.g., for Next.js caching)
    // revalidatePath("/list/teachers");

    return { success: true, error: null }; // No error
  } catch (err: any) {
    console.error("Error updating teacher:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A teacher with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update teacher. Please try again." };
  }
};


export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const clerk = await clerkClient();
    
    await clerk.users.deleteUser(id);

    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  console.log(data);
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    // Await clerkClient properly
   const clerk = await clerkClient(); // Ensure proper initialization

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata:{role:"student"}
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err:any) {
    console.log(err);
    console.error("Error creating student:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      // Extract and format Zod validation errors
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A student with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create student. Please try again." };
    // return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
 
  try {
    const validatedData = studentSchema.parse(data); // Validate input data

    if (!validatedData.id) {
      return { success: false, error: "Student ID is required for updating." };
    }

    // Await clerkClient properly
   const clerk = await clerkClient(); // Ensure proper initialization

    const user = await clerk.users.updateUser(validatedData.id, {
      username: validatedData.username,
      ...(validatedData.password !== "" && { password: validatedData.password }),
      firstName: validatedData.name,
      lastName: validatedData.surname,
    });

    await prisma.student.update({
      where: {
        id: validatedData.id,
      },
      data: {
        // ...(data.password !== "" && { password: data.password }),
        username: validatedData.username,
        name: validatedData.name,
        surname: validatedData.surname,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        address: validatedData.address,
        img: validatedData.img || null,
        bloodType: validatedData.bloodType,
        sex: validatedData.sex,
        birthday: validatedData.birthday,
        gradeId: validatedData.gradeId,
        classId: validatedData.classId,
        parentId: validatedData.parentId,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err:any) {
    console.error("Error updating student:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A student with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update student. Please try again." };
  }
};


export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Await clerkClient properly
   const clerk = await clerkClient(); // Ensure proper initialization

    await clerk.users.deleteUser(id);

    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema
) => {
  try {
    // Validate input data
    const validatedData = parentSchema.parse(data);

    // Await clerkClient properly
    const clerk = await clerkClient();

    // Create a user in Clerk
    const user = await clerk.users.createUser({
      username: validatedData.username,
      password: validatedData.password,
      firstName: validatedData.name,
      lastName: validatedData.surname,
      publicMetadata: { role: "parent" },
    });

    // Create a parent record in Prisma
    await prisma.parent.create({
      data: {
        id: user.id,
        username: validatedData.username,
        name: validatedData.name,
        surname: validatedData.surname,
        email: validatedData.email || null,
        phone: validatedData.phone,
        address: validatedData.address,
        // students: {
        //   connect: validatedData.students?.map((studentId) => ({ id: studentId })) || [],
        // },
      },
    });

    // Revalidate the path if needed
    // revalidatePath("/list/parents");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating parent:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A parent with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create parent. Please try again." };
  }
};


export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema
) => {
  try {
    const validatedData = parentSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Parent ID is required for updating." };
    }

    const clerk = await clerkClient();

    await clerk.users.updateUser(validatedData.id, {
      username: validatedData.username,
      ...(validatedData.password !== "" && { password: validatedData.password }),
      firstName: validatedData.name,
      lastName: validatedData.surname,
    });

    // Fetch the current students linked to the parent
    const currentParent = await prisma.parent.findUnique({
      where: { id: validatedData.id },
      select: { students: { select: { id: true } } },
    });

    if (!currentParent) {
      return { success: false, error: "Parent not found." };
    }

    // const currentStudentIds = currentParent.students.map((student) => student.id);
    // const newStudentIds = validatedData.students || [];

    // Find students to be removed

    // const studentsToRemove = currentStudentIds.filter(id => !newStudentIds.includes(id));

    // Find students to be added
    // const studentsToAdd = newStudentIds.filter(id => !currentStudentIds.includes(id));

    await prisma.$transaction(async (tx) => {
      // **Step 1: Disconnect students being removed**
      // if (studentsToRemove.length > 0) {
      //   await tx.student.updateMany({
      //     where: { id: { in: studentsToRemove } },
      //     data: { parentId: null },
      //   });
      // }

      // **Step 2: Update Parent record**
      await tx.parent.update({
        where: { id: validatedData.id },
        data: {
          username: validatedData.username,
          name: validatedData.name,
          surname: validatedData.surname,
          email: validatedData.email || null,
          phone: validatedData.phone,
          address: validatedData.address,
        },
      });

      // **Step 3: Reconnect new students**
      // if (studentsToAdd.length > 0) {
      //   await tx.student.updateMany({
      //     where: { id: { in: studentsToAdd } },
      //     data: { parentId: validatedData.id },
      //   });
      // }
    });

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating parent:", err);

    if (err.name === 'ZodError') {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A parent with this ${field} already exists.` };
    }

    return { success: false, error: "Failed to update parent. Please try again." };
  }
};


export const deleteParent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const clerk = await clerkClient();

    // Remove parent-child relationship before deleting the parent
    const updateStudent = await prisma.student.updateMany({
      where: { parentId: id },
      data: { parentId: null }, // Set parentId to null
    });

    if (updateStudent) {
      // Delete the user in Clerk
      await clerk.users.deleteUser(id);

      // Delete the parent record in Prisma
      await prisma.parent.delete({
        where: { id },
      });
    }

    // revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting parent:", err);
    return { success: false, error: "Failed to delete parent. Ensure no related records exist." };
    // return { success: false, error: true };
  }
};


export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    // const classIdmod = data.classId  === "" ? null : data.classId;
    await prisma.event.create({
      
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId ?? null,
        // classId: classIdmod
      },
    });

    // revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating event:", err);
    return { success: false, error: true };
  }
};

export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId ?? null,
      },
    });

    // revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error updating event:", err);
    return { success: false, error: true };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting event:", err);
    return { success: false, error: true };
  }
};



export const createLesson = async (
  currentState: any, // Adjust the type as needed
  data: LessonSchema
) => {
  try {
    const validatedData = lessonSchema.parse(data);

     // Ensure teacherId is provided and is a valid string
     if (!validatedData.teacherId) {
      return { success: false, error: "Teacher ID is required." };
    }

    await prisma.lesson.create({
      data: {
        name: validatedData.name,
        day: validatedData.day || "", // Derived from startTime in the form
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        subjectId: validatedData.subjectId,
        classId: validatedData.classId,
        teacherId: validatedData.teacherId,
      },
    });

    // revalidatePath("/list/lessons"); // Revalidate the lessons page
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating lesson:", err);

    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A lesson with this ${field} already exists.` };
    }

    return { success: false, error: "Failed to create lesson. Please try again." };
  }
};

export const updateLesson = async (
  currentState: CurrentState, 
  data: LessonSchema
) => {
  try {
    const validatedData = lessonSchema.parse(data)

    if (!validatedData.id) {
      return { success: false, error: "Lesson ID is required for updating." }
    }

    await prisma.lesson.update({
      where: {
        id: validatedData.id,
      },
      data: {
        name: validatedData.name,
        day: validatedData.day,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        subjectId: validatedData.subjectId,
        classId: validatedData.classId,
        teacherId: validatedData.teacherId,
      },
    })

    // revalidatePath("/list/lessons")
    return { success: true, error: false }
  } catch (err: any) {
    console.error("Error updating lesson:", err)

    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ")
      return { success: false, error: `Validation error: ${errors}` }
    }

    if (err.code === "P2002") {
      const field = err.meta?.target?.[0]
      return { success: false, error: `A lesson with this ${field} already exists.` }
    }

    return { success: false, error: "Failed to update lesson. Please try again." }
  }
}

export const deleteLesson = async (currentState: CurrentState, data: FormData) => {
  const id = data.get("id") as string
  try {
    await prisma.lesson.delete({
      where: {
        id: Number.parseInt(id, 10),
      },
    })

    // revalidatePath("/list/lessons")
    return { success: true, error: false }
  } catch (err) {
    console.error("Error deleting lesson:", err)
    return { success: false, error: "Failed to delete lesson. Ensure no related records exist." }
  }
}


export const createAdmin = async (
  currentState: CurrentState,
  data: AdminSchema
) => {
  try {
    // Validate the input data using the schema object
    const validatedData = adminSchema.parse(data);

    // Create a new user in Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.createUser({
      username: validatedData.username,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.surname,
      publicMetadata: { role: "admin" },
    });

    // Create a new admin in the database
    await prisma.admin.create({
      data: {
        id: user.id, // Use Clerk-generated ID
        username: validatedData.username,
        firstName: validatedData.firstName,
        surname: validatedData.surname
      },
    });

    return { success: true, error: null };
  } catch (err: any) {
    console.error("Error creating admin:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `An admin with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create admin. Please try again." };
  }
};

export const updateAdmin = async (
  currentState: CurrentState,
  data: AdminSchema
) => {
  try {
    // Validate the input data using the schema object
    const validatedData = adminSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Admin ID is required for updating." };
    }

    // Update the user in Clerk
    const clerk = await clerkClient();
    await clerk.users.updateUser(validatedData.id, {
      username: validatedData.username,
      firstName: validatedData.firstName,
      lastName: validatedData.surname,
      ...(validatedData.password !== "" && { password: validatedData.password }),
    });

    // Update the admin in the database
    await prisma.admin.update({
      where: {
        id: validatedData.id,
      },
      data: {
        username: validatedData.username,
        firstName: validatedData.firstName,
        surname: validatedData.surname,
      },
    });

    return { success: true, error: null };
  } catch (err: any) {
    console.error("Error updating admin:", err);

    // Handle validation errors from Zod
    if (err.name === 'ZodError') {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Clerk-specific errors
    if (err.errors?.[0]?.message) {
      return { success: false, error: err.errors[0].message };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return { success: false, error: `An admin with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update admin. Please try again." };
  }
};

export const deleteAdmin = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const clerk = await clerkClient();

    // Delete the user in Clerk
    await clerk.users.deleteUser(id);

    // Delete the admin in the database
    await prisma.admin.delete({
      where: {
        id: id,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting admin:", err);
    return { success: false, error: "Failed to delete admin. Ensure no related records exist." };
  }
};

export const createAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = announcementSchema.parse(data);

    // Create the announcement in the database
    await prisma.announcement.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: validatedData.date,
        classId: validatedData.classId || null, // Optional classId
      },
    });

    // Revalidate the path to refresh the announcements list
    // revalidatePath("/list/announcements");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating announcement:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `An announcement with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create announcement. Please try again." };
  }
};

export const updateAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = announcementSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Announcement ID is required for updating." };
    }

    // Update the announcement in the database
    await prisma.announcement.update({
      where: {
        id: validatedData.id,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: validatedData.date,
        classId: validatedData.classId || null, // Optional classId
      },
    });

    // Revalidate the path to refresh the announcements list
    // revalidatePath("/list/announcements");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating announcement:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `An announcement with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update announcement. Please try again." };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    // Delete the announcement from the database
    await prisma.announcement.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // Revalidate the path to refresh the announcements list
    // revalidatePath("/list/announcements");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error deleting announcement:", err);

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Announcement not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to delete announcement. Please try again." };
  }
};


/**
 * Create a new Grade record.
 */
export const createGrade = async (
  currentState: CurrentState,
  data: GradeSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = gradeSchema.parse(data);

    // Create the Grade record in the database
    await prisma.grade.create({
      data: {
        level: validatedData.level,
      },
    });

    // Revalidate the path to refresh the grades list
    // revalidatePath("/list/grades");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating grade:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A grade with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create grade. Please try again." };
  }
};

/**
 * Update an existing Grade record.
 */
export const updateGrade = async (
  currentState: CurrentState,
  data: GradeSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = gradeSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Grade ID is required for updating." };
    }

    // Update the Grade record in the database
    await prisma.grade.update({
      where: {
        id: validatedData.id,
      },
      data: {
        level: validatedData.level,
      },
    });

    // Revalidate the path to refresh the grades list
    // revalidatePath("/list/grades");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating grade:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A grade with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update grade. Please try again." };
  }
};

/**
 * Delete a Grade record.
 */
export const deleteGrade = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    // Delete the Grade record from the database
    await prisma.grade.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // Revalidate the path to refresh the grades list
    // revalidatePath("/list/grades");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error deleting grade:", err);

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Grade not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to delete grade. Please try again." };
  }
};


/**
 * Create a new Assignment record.
 */
export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = assignmentSchema.parse(data);

    // Create the Assignment record in the database
    await prisma.assignment.create({
      data: {
        title: validatedData.title,
        startDate: validatedData.startDate,
        dueDate: validatedData.dueDate,
        lessonId: validatedData.lessonId,
      },
    });

    // Revalidate the path to refresh the assignments list
    // revalidatePath("/list/assignments");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating assignment:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `An assignment with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create assignment. Please try again." };
  }
};

/**
 * Update an existing Assignment record.
 */
export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = assignmentSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Assignment ID is required for updating." };
    }

    // Update the Assignment record in the database
    await prisma.assignment.update({
      where: {
        id: validatedData.id,
      },
      data: {
        title: validatedData.title,
        startDate: validatedData.startDate,
        dueDate: validatedData.dueDate,
        lessonId: validatedData.lessonId,
      },
    });

    // Revalidate the path to refresh the assignments list
    // revalidatePath("/list/assignments");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating assignment:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `An assignment with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update assignment. Please try again." };
  }
};

/**
 * Delete an Assignment record.
 */
export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    // Delete the Assignment record from the database
    await prisma.assignment.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // Revalidate the path to refresh the assignments list
    // revalidatePath("/list/assignments");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error deleting assignment:", err);

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Assignment not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to delete assignment. Please try again." };
  }
};


export const createResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = resultSchema.parse(data);

    if (validatedData.examId && validatedData.assignmentId) {
      return { success: false, error: "Select Only Assignment or exam" };
    }

    // Create the Result record in the database
    await prisma.result.create({
      data: {
        score: validatedData.score,
        examId: validatedData.examId || null,
        assignmentId: validatedData.assignmentId || null,
        studentId: validatedData.studentId,
      },
    });

    // Revalidate the path to refresh the results list
    revalidatePath("/list/results");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating result:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A result with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create result. Please try again." };
  }
};

export const updateResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = resultSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Result ID is required for updating." };
    }

    // Update the Result record in the database
    await prisma.result.update({
      where: {
        id: validatedData.id,
      },
      data: {
        score: validatedData.score,
        examId: validatedData.examId || null,
        assignmentId: validatedData.assignmentId || null,
        studentId: validatedData.studentId,
      },
    });

    // Revalidate the path to refresh the results list
    revalidatePath("/list/results");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating result:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Result not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update result. Please try again." };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    // Delete the Result record from the database
    await prisma.result.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // Revalidate the path to refresh the results list
    revalidatePath("/list/results");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error deleting result:", err);

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Result not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to delete result. Please try again." };
  }
};


export const createPost = async (
  currentState: CurrentState,
  data: PostSchema
) => {
  try {
    const validatedData = postSchema.parse(data);

    await prisma.post.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        image: validatedData.image,
      },
    });

    // revalidatePath("/list/posts");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating post:", err);

    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A post with this ${field} already exists.` };
    }

    return { success: false, error: "Failed to create post. Please try again." };
  }
};

export const updatePost = async (
  currentState: CurrentState,
  data: PostSchema
) => {
  try {
    const validatedData = postSchema.parse(data);

    if (!validatedData.id) {
      return { success: false, error: "Post ID is required for updating." };
    }

    await prisma.post.update({
      where: {
        id: validatedData.id,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        image: validatedData.image,
      },
    });

    // revalidatePath("/list/posts");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating post:", err);

    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    if (err.code === "P2025") {
      return { success: false, error: "Post not found." };
    }

    return { success: false, error: "Failed to update post. Please try again." };
  }
};

export const deletePost = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // revalidatePath("/list/posts");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error deleting post:", err);

    if (err.code === "P2025") {
      return { success: false, error: "Post not found." };
    }

    return { success: false, error: "Failed to delete post. Please try again." };
  }
};


export const createProspectus = async (
  currentState: CurrentState,
  formData: ProspectusSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = prospectusSchema.parse(formData);

    // Create the prospectus record in the database
    await prisma.prospectus.create({
      data: {
        title: validatedData.title,
        file: validatedData.file || "",
      },
    });

    // Revalidate the path to refresh the prospectus list
    // revalidatePath("/list/prospectus");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error creating prospectus:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., unique constraint violations)
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return { success: false, error: `A prospectus with this ${field} already exists.` };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to create prospectus. Please try again." };
  }
};

export const updateProspectus = async (
  currentState: CurrentState,
  formData: ProspectusSchema
) => {
  try {
    // Validate the input data using the schema
    const validatedData = prospectusSchema.parse(formData);

    if (!validatedData.id) {
      return { success: false, error: "Prospectus ID is required for updating." };
    }

    // Update the prospectus record in the database
    await prisma.prospectus.update({
      where: {
        id: validatedData.id,
      },
      data: {
        title: validatedData.title,
        file: validatedData.file,
      },
    });

    // Revalidate the path to refresh the prospectus list
    // revalidatePath("/list/prospectus");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error updating prospectus:", err);

    // Handle validation errors from Zod
    if (err.name === "ZodError") {
      const errors = err.errors.map((e: any) => e.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Prospectus not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to update prospectus. Please try again." };
  }
};


export const deleteProspectus = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  try {
    // Delete the prospectus record from the database
    await prisma.prospectus.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    // Revalidate the path to refresh the prospectus list
    // revalidatePath("/list/prospectus");

    return { success: true, error: false };
  } catch (err: any) {
    console.error("Error deleting prospectus:", err);

    // Handle Prisma-specific errors (e.g., record not found)
    if (err.code === "P2025") {
      return { success: false, error: "Prospectus not found." };
    }

    // Handle other generic errors
    return { success: false, error: "Failed to delete prospectus. Please try again." };
  }
};

// app/actions/assignmentActions.ts


export const fetchStudentsForAssignment = async (assignmentId: number) => {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { lesson: { include: { class: { include: { students: true } } } } },
    });

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    return assignment.lesson.class.students;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw new Error("Failed to fetch students");
  }
};

// app/actions/resultActions.ts

export const saveStudentResults = async (
  assignmentId: number,
  results: { studentId: string; score: number }[]
) => {
  try {
    await Promise.all(
      results.map((result) =>
        prisma.result.create({
          data: {
            score: result.score,
            assignmentId: assignmentId,
            studentId: result.studentId,
          },
        })
      )
    );
    return { success: true };
  } catch (err) {
    console.error("Error saving student results:", err);
    throw new Error("Failed to save student results");
  }
};

export const fetchStudentsForExam = async (examId: number) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        lesson: {
          include: {
            class: {
              include: {
                students: true,
              },
            },
          },
        },
      },
    });

    if (!exam) {
      throw new Error("Exam not found");
    }

    return exam.lesson.class.students;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw new Error("Failed to fetch students");
  }
};

export const saveExamResults = async (
  examId: number,
  results: { studentId: string; score: number }[]
) => {
  try {
    await Promise.all(
      results.map((result) =>
        prisma.result.create({
          data: {
            score: result.score,
            examId: examId,
            studentId: result.studentId,
          },
        })
      )
    );
    return { success: true };
  } catch (err) {
    console.error("Error saving student results:", err);
    throw new Error("Failed to save student results");
  }
};

export const fetchStudentsForLesson = async (lessonId: number) => {
  const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { class: { include: { students: true } } },
  });
  return lesson?.class.students || [];
};

export const saveAttendance = async (lessonId: number, attendanceRecords: { studentId: string; present: boolean }[]) => {
  await Promise.all(
      attendanceRecords.map(record =>
          prisma.attendance.create({
              data: {
                  date: new Date(),
                  present: record.present,
                  studentId: record.studentId,
                  lessonId: lessonId,
              },
          })
      )
  );
};

export const fetchAttendanceForLesson = async (lessonId: number) => {
  const attendance = await prisma.attendance.findMany({
      where: { lessonId },
  });
  return attendance;
};

// export const saveExamResults = async (
//   examId: number,
//   results: { studentId: string; score: number }[]
// ) => {
//   try {
//     await Promise.all(
//       results.map((result) =>
//         prisma.result.create({
//           data: {
//             score: result.score,
//             examId: examId,
//             studentId: result.studentId,
//           },
//         })
//       )
//     );
//     return { success: true };
//   } catch (err) {
//     console.error("Error saving student results:", err);
//     throw new Error("Failed to save student results");
//   }
// };