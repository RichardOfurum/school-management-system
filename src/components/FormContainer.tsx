import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement"
    | "admin"
    | "grade"
    | "post"
    | "prospectus";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  // let relatedData = {};
  let relatedData: Record<string, any> = {}; // Ensure relatedData is always initialized

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "admin":
        relatedData = {}
        break;
      
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
     
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        const Studentparents = await prisma.parent.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { classes: studentClasses, grades: studentGrades, parents: Studentparents};
        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: assignmentLessons };
        break;
        // ##############################################
        case "result":
        const resultExams = await prisma.exam.findMany({
            select: { id: true, title: true },
        });
        const resultAssignments = await prisma.assignment.findMany({
            select: { id: true, title: true },
        });
        const resultStudents = await prisma.student.findMany({
            select: { id: true, name: true, surname: true },
        });
        relatedData = { exams: resultExams, assignments: resultAssignments, students: resultStudents };
        break;
      // /##############################################/
      case "lesson":
        const subjectLesson = await prisma.subject.findMany({
          select: { id: true, name: true },
        });

        const classLesson = await prisma.class.findMany({
          select: { id: true, name: true },
        });

        const teacherLesson = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });

        relatedData = { subjects: subjectLesson, classes: classLesson, teachers:teacherLesson };

        break;

      case "parent":
          // const studentList = await prisma.student.findMany({
          //   select: { id: true, name: true, surname: true },
          // });
          // relatedData = { students: studentList };
          relatedData = {}
          break;
      case "grade":
          relatedData = {}
          break;
      case "event":
          const classEvents = await prisma.class.findMany({
            select: { id: true, name: true, },
          });
          relatedData = { classes: classEvents };
          break;
      case "announcement":
          const classAnnouncement = await prisma.class.findMany({
            select: { id: true, name: true, },
          });
          relatedData = { classes: classAnnouncement };
          break;
      case "post":  
          relatedData = {};
          break;
      case "prospectus":  
          relatedData = {};
          break;

        default:
          relatedData = {}; // Ensuring it never remains undefined
    }
  }

  // console.log(relatedData);
  // console.log("this is the form container");
  // console.log(table)

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
