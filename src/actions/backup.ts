'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Backup function remains the same
export async function backupDatabase() {
  try {
    const data = {
      admins: await prisma.admin.findMany(),
      students: await prisma.student.findMany({
        include: {
          parent: true,
          class: true,
          grade: true,
          attendances: true,
          results: true,
        },
      }),
      teachers: await prisma.teacher.findMany({
        include: {
          subjects: true,
          classes: true,
          lessons: true,
        },
      }),
      parents: await prisma.parent.findMany({
        include: {
          students: true,
        },
      }),
      grades: await prisma.grade.findMany({
        include: {
          students: true,
          classess: true,
        },
      }),
      classes: await prisma.class.findMany({
        include: {
          supervisor: true,
          lessons: true,
          students: true,
          grade: true,
          events: true,
          announcements: true,
        },
      }),
      subjects: await prisma.subject.findMany({
        include: {
          teachers: true,
          lessons: true,
        },
      }),
      lessons: await prisma.lesson.findMany({
        include: {
          subject: true,
          class: true,
          teacher: true,
          exams: true,
          assignments: true,
          attendances: true,
        },
      }),
      exams: await prisma.exam.findMany({
        include: {
          lesson: true,
          results: true,
        },
      }),
      assignments: await prisma.assignment.findMany({
        include: {
          lesson: true,
          results: true,
        },
      }),
      results: await prisma.result.findMany({
        include: {
          exam: true,
          assignment: true,
          student: true,
        },
      }),
      attendances: await prisma.attendance.findMany({
        include: {
          student: true,
          lesson: true,
        },
      }),
      events: await prisma.event.findMany({
        include: {
          class: true,
        },
      }),
      announcements: await prisma.announcement.findMany({
        include: {
          class: true,
        },
      }),
      posts: await prisma.post.findMany(),
      prospectuses: await prisma.prospectus.findMany(),
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Backup failed:', error);
    throw new Error('Failed to backup database');
  }
}

// // New restore function
// export async function restoreDatabase(jsonData: string) {
//   try {
//     const data = JSON.parse(jsonData);

//     // Use transactions to ensure all operations succeed or fail together
//     await prisma.$transaction(async (prisma) => {
//       // Clear all tables in the correct order to maintain referential integrity
//       await prisma.attendance.deleteMany();
//       await prisma.result.deleteMany();
//       await prisma.exam.deleteMany();
//       await prisma.assignment.deleteMany();
//       await prisma.lesson.deleteMany();
//       await prisma.announcement.deleteMany();
//       await prisma.event.deleteMany();
//       await prisma.student.deleteMany();
//       await prisma.class.deleteMany();
//       await prisma.grade.deleteMany();
//       await prisma.subject.deleteMany();
//       await prisma.teacher.deleteMany();
//       await prisma.parent.deleteMany();
//       await prisma.admin.deleteMany();
//       await prisma.post.deleteMany();
//       await prisma.prospectus.deleteMany();

//       // Restore data in the correct order
//       if (data.admins) await prisma.admin.createMany({ data: data.admins });
//       if (data.grades) await prisma.grade.createMany({ data: data.grades });
//       if (data.subjects) await prisma.subject.createMany({ data: data.subjects });
//       if (data.teachers) await prisma.teacher.createMany({ data: data.teachers });
//       if (data.parents) await prisma.parent.createMany({ data: data.parents });
//       if (data.classes) await prisma.class.createMany({ data: data.classes });
//       if (data.students) await prisma.student.createMany({ data: data.students });
//       if (data.lessons) await prisma.lesson.createMany({ data: data.lessons });
//       if (data.exams) await prisma.exam.createMany({ data: data.exams });
//       if (data.assignments) await prisma.assignment.createMany({ data: data.assignments });
//       if (data.results) await prisma.result.createMany({ data: data.results });
//       if (data.attendances) await prisma.attendance.createMany({ data: data.attendances });
//       if (data.events) await prisma.event.createMany({ data: data.events });
//       if (data.announcements) await prisma.announcement.createMany({ data: data.announcements });
//       if (data.posts) await prisma.post.createMany({ data: data.posts });
//       if (data.prospectuses) await prisma.prospectus.createMany({ data: data.prospectuses });

//       // Restore many-to-many relationships
//       if (data.teachers) {
//         for (const teacher of data.teachers) {
//           if (teacher.subjects && teacher.subjects.length > 0) {
//             await prisma.teacher.update({
//               where: { id: teacher.id },
//               data: {
//                 subjects: {
//                   connect: teacher.subjects.map((subject: { id: number }) => ({ id: subject.id }))
//                 }
//               }
//             });
//           }
//           if (teacher.classes && teacher.classes.length > 0) {
//             await prisma.teacher.update({
//               where: { id: teacher.id },
//               data: {
//                 classes: {
//                   connect: teacher.classes.map((cls: { id: number }) => ({ id: cls.id }))
//                 }
//               }
//             });
//           }
//         }
//       }
//     });

//     return { success: true, message: 'Database restored successfully' };
//   } catch (error) {
//     console.error('Restore failed:', error);
//     throw new Error('Failed to restore database');
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// 'use server';

// import prisma from "@/lib/prisma";

// // import prisma from "./prisma";


// export async function backupDatabase() {
//   try {
//     // Fetch all data from all tables
//     const data = {
//       admins: await prisma.admin.findMany(),
//       students: await prisma.student.findMany({
//         include: {
//           parent: true,
//           class: true,
//           grade: true,
//           attendances: true,
//           results: true,
//         },
//       }),
//       teachers: await prisma.teacher.findMany({
//         include: {
//           subjects: true,
//           classes: true,
//           lessons: true,
//         },
//       }),
//       parents: await prisma.parent.findMany({
//         include: {
//           students: true,
//         },
//       }),
//       grades: await prisma.grade.findMany({
//         include: {
//           students: true,
//           classess: true,
//         },
//       }),
//       classes: await prisma.class.findMany({
//         include: {
//           supervisor: true,
//           lessons: true,
//           students: true,
//           grade: true,
//           events: true,
//           announcements: true,
//         },
//       }),
//       subjects: await prisma.subject.findMany({
//         include: {
//           teachers: true,
//           lessons: true,
//         },
//       }),
//       lessons: await prisma.lesson.findMany({
//         include: {
//           subject: true,
//           class: true,
//           teacher: true,
//           exams: true,
//           assignments: true,
//           attendances: true,
//         },
//       }),
//       exams: await prisma.exam.findMany({
//         include: {
//           lesson: true,
//           results: true,
//         },
//       }),
//       assignments: await prisma.assignment.findMany({
//         include: {
//           lesson: true,
//           results: true,
//         },
//       }),
//       results: await prisma.result.findMany({
//         include: {
//           exam: true,
//           assignment: true,
//           student: true,
//         },
//       }),
//       attendances: await prisma.attendance.findMany({
//         include: {
//           student: true,
//           lesson: true,
//         },
//       }),
//       events: await prisma.event.findMany({
//         include: {
//           class: true,
//         },
//       }),
//       announcements: await prisma.announcement.findMany({
//         include: {
//           class: true,
//         },
//       }),
//       posts: await prisma.post.findMany(),
//       prospectuses: await prisma.prospectus.findMany(),
//     };

//     return JSON.stringify(data, null, 2);
//   } catch (error) {
//     console.error('Backup failed:', error);
//     throw new Error('Failed to backup database');
//   } finally {
//     await prisma.$disconnect();
//   }
// }


