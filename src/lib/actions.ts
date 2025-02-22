
"use server";

import { revalidatePath } from "next/cache";
import {
  ClassSchema,
  EventSchema,
  ExamSchema,
  parentSchema,
  ParentSchema,
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



type CurrentState = { success: boolean; error: boolean };

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
        students: {
          connect: validatedData.students?.map((studentId) => ({ id: studentId })) || [],
        },
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

    const currentStudentIds = currentParent.students.map((student) => student.id);
    const newStudentIds = validatedData.students || [];

    // Find students to be removed
    const studentsToRemove = currentStudentIds.filter(id => !newStudentIds.includes(id));

    // Find students to be added
    const studentsToAdd = newStudentIds.filter(id => !currentStudentIds.includes(id));

    await prisma.$transaction(async (tx) => {
      // **Step 1: Disconnect students being removed**
      if (studentsToRemove.length > 0) {
        await tx.student.updateMany({
          where: { id: { in: studentsToRemove } },
          data: { parentId: null },
        });
      }

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
      if (studentsToAdd.length > 0) {
        await tx.student.updateMany({
          where: { id: { in: studentsToAdd } },
          data: { parentId: validatedData.id },
        });
      }
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