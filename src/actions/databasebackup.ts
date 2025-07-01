'use server';

import prisma from "@/lib/prisma";


// Backup entire database
export async function backupDatabase() {
  try {
    const data = {
      admins: await prisma.admin.findMany(),
      students: await prisma.student.findMany(),
      teachers: await prisma.teacher.findMany(),
      parents: await prisma.parent.findMany(),
      grades: await prisma.grade.findMany(),
      classes: await prisma.class.findMany(),
      subjects: await prisma.subject.findMany(),
      lessons: await prisma.lesson.findMany(),
      exams: await prisma.exam.findMany(),
      assignments: await prisma.assignment.findMany(),
      results: await prisma.result.findMany(),
      attendances: await prisma.attendance.findMany(),
      events: await prisma.event.findMany(),
      announcements: await prisma.announcement.findMany(),
      posts: await prisma.post.findMany(),
    //   prospectuses: await prisma.prospectus.findMany(),
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Backup failed:', error);
    throw new Error('Failed to backup database');
  } finally {
    await prisma.$disconnect();
  }
}