'use server';

import prisma from "@/lib/prisma";


// Backup entire database
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
  } finally {
    await prisma.$disconnect();
  }
}

// Full restore (delete all existing data first)
export async function fullRestoreDatabase(jsonData: string) {
  try {
    const data = JSON.parse(jsonData);

    await prisma.$transaction(async (prisma) => {
      // Clear all tables in the correct order to maintain referential integrity
      await prisma.attendance.deleteMany();
      await prisma.result.deleteMany();
      await prisma.exam.deleteMany();
      await prisma.assignment.deleteMany();
      await prisma.lesson.deleteMany();
      await prisma.announcement.deleteMany();
      await prisma.event.deleteMany();
      await prisma.student.deleteMany();
      await prisma.class.deleteMany();
      await prisma.grade.deleteMany();
      await prisma.subject.deleteMany();
      await prisma.teacher.deleteMany();
      await prisma.parent.deleteMany();
      await prisma.admin.deleteMany();
      await prisma.post.deleteMany();
      await prisma.prospectus.deleteMany();

      // Restore data in the correct order
      if (data.admins) await prisma.admin.createMany({ data: data.admins });
      if (data.grades) await prisma.grade.createMany({ data: data.grades });
      if (data.subjects) await prisma.subject.createMany({ data: data.subjects });
      if (data.teachers) await prisma.teacher.createMany({ data: data.teachers });
      if (data.parents) await prisma.parent.createMany({ data: data.parents });
      if (data.classes) await prisma.class.createMany({ data: data.classes });
      if (data.students) await prisma.student.createMany({ data: data.students });
      if (data.lessons) await prisma.lesson.createMany({ data: data.lessons });
      if (data.exams) await prisma.exam.createMany({ data: data.exams });
      if (data.assignments) await prisma.assignment.createMany({ data: data.assignments });
      if (data.results) await prisma.result.createMany({ data: data.results });
      if (data.attendances) await prisma.attendance.createMany({ data: data.attendances });
      if (data.events) await prisma.event.createMany({ data: data.events });
      if (data.announcements) await prisma.announcement.createMany({ data: data.announcements });
      if (data.posts) await prisma.post.createMany({ data: data.posts });
      if (data.prospectuses) await prisma.prospectus.createMany({ data: data.prospectuses });

      // Restore many-to-many relationships
      if (data.teachers) {
        for (const teacher of data.teachers) {
          if (teacher.subjects && teacher.subjects.length > 0) {
            await prisma.teacher.update({
              where: { id: teacher.id },
              data: {
                subjects: {
                  connect: teacher.subjects.map((subject: { id: number }) => ({ id: subject.id }))
                }
              }
            });
          }
          if (teacher.classes && teacher.classes.length > 0) {
            await prisma.teacher.update({
              where: { id: teacher.id },
              data: {
                classes: {
                  connect: teacher.classes.map((cls: { id: number }) => ({ id: cls.id }))
                }
              }
            });
          }
        }
      }
    });

    return { success: true, message: 'Database fully restored successfully' };
  } catch (error) {
    console.error('Full restore failed:', error);
    throw new Error('Failed to fully restore database');
  } finally {
    await prisma.$disconnect();
  }
}

// Partial restore (skip existing records)
export async function partialRestoreDatabase(jsonData: string) {
  try {
    const data = JSON.parse(jsonData);

    await prisma.$transaction(async (prisma) => {
      // Restore data in the correct order, skipping existing records
      if (data.admins) {
        for (const admin of data.admins) {
          await prisma.admin.upsert({
            where: { id: admin.id },
            update: {},
            create: admin,
          });
        }
      }

      if (data.grades) {
        for (const grade of data.grades) {
          await prisma.grade.upsert({
            where: { id: grade.id },
            update: {},
            create: grade,
          });
        }
      }

      if (data.subjects) {
        for (const subject of data.subjects) {
          await prisma.subject.upsert({
            where: { id: subject.id },
            update: {},
            create: subject,
          });
        }
      }

      if (data.teachers) {
        for (const teacher of data.teachers) {
          await prisma.teacher.upsert({
            where: { id: teacher.id },
            update: {},
            create: teacher,
          });
        }
      }

      if (data.parents) {
        for (const parent of data.parents) {
          await prisma.parent.upsert({
            where: { id: parent.id },
            update: {},
            create: parent,
          });
        }
      }

      if (data.classes) {
        for (const cls of data.classes) {
          await prisma.class.upsert({
            where: { id: cls.id },
            update: {},
            create: cls,
          });
        }
      }

      if (data.students) {
        for (const student of data.students) {
          await prisma.student.upsert({
            where: { id: student.id },
            update: {},
            create: student,
          });
        }
      }

      if (data.lessons) {
        for (const lesson of data.lessons) {
          await prisma.lesson.upsert({
            where: { id: lesson.id },
            update: {},
            create: lesson,
          });
        }
      }

      if (data.exams) {
        for (const exam of data.exams) {
          await prisma.exam.upsert({
            where: { id: exam.id },
            update: {},
            create: exam,
          });
        }
      }

      if (data.assignments) {
        for (const assignment of data.assignments) {
          await prisma.assignment.upsert({
            where: { id: assignment.id },
            update: {},
            create: assignment,
          });
        }
      }

      if (data.results) {
        for (const result of data.results) {
          await prisma.result.upsert({
            where: { id: result.id },
            update: {},
            create: result,
          });
        }
      }

      if (data.attendances) {
        for (const attendance of data.attendances) {
          await prisma.attendance.upsert({
            where: { id: attendance.id },
            update: {},
            create: attendance,
          });
        }
      }

      if (data.events) {
        for (const event of data.events) {
          await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: event,
          });
        }
      }

      if (data.announcements) {
        for (const announcement of data.announcements) {
          await prisma.announcement.upsert({
            where: { id: announcement.id },
            update: {},
            create: announcement,
          });
        }
      }

      if (data.posts) {
        for (const post of data.posts) {
          await prisma.post.upsert({
            where: { id: post.id },
            update: {},
            create: post,
          });
        }
      }

      if (data.prospectuses) {
        for (const prospectus of data.prospectuses) {
          await prisma.prospectus.upsert({
            where: { id: prospectus.id },
            update: {},
            create: prospectus,
          });
        }
      }

      // Restore many-to-many relationships
      if (data.teachers) {
        for (const teacher of data.teachers) {
          if (teacher.subjects && teacher.subjects.length > 0) {
            await prisma.teacher.update({
              where: { id: teacher.id },
              data: {
                subjects: {
                  connect: teacher.subjects.map((subject: { id: number }) => ({ id: subject.id }))
                }
              }
            });
          }
          if (teacher.classes && teacher.classes.length > 0) {
            await prisma.teacher.update({
              where: { id: teacher.id },
              data: {
                classes: {
                  connect: teacher.classes.map((cls: { id: number }) => ({ id: cls.id }))
                }
              }
            });
          }
        }
      }
    });

    return { success: true, message: 'Database partially restored (existing records were kept)' };
  } catch (error) {
    console.error('Partial restore failed:', error);
    throw new Error('Failed to partially restore database');
  } finally {
    await prisma.$disconnect();
  }
}