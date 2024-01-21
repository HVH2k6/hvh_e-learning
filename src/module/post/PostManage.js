import Button from "components/button/Button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userRole } from "utils/constants";

const PostManage = () => {
  const { userInfo } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "courses");
    const q = query(colRef, where("title", "!=", ""));

    onSnapshot(q, (snapshort) => {
      const relust = [];
      console.log("file: CourseMange.js:26 ~ onSnapshot ~ relust:", relust);
      snapshort.forEach((doc) => {
        relust.push({
          id: doc.id,
          ...doc.data(),
        });
        console.log(relust);
      });
      setCourses(relust);
    });
  }, []);
  const handleDeleteCourse = async (courseId) => {
    if (userInfo?.role !== userRole.ADMIN) {
      // Kiểm tra quyền hạn tại đây và hiển thị thông báo trong giao diện người dùng nếu cần.
      // ...
    } else {
      try {
        // Bước 1: Lấy danh sách bài học thuộc về khóa học
        const lessonsCollection = collection(db, "lessons");
        const lessonsQuery = query(
          lessonsCollection,
          where("courseId", "==", courseId)
        );
        const lessonsSnapshot = await getDocs(lessonsQuery);
  
        // Xóa tất cả bài học thuộc về khóa học
        lessonsSnapshot.forEach(async (lessonDoc) => {
          const lessonId = lessonDoc.id;
  
          // Bước 2: Lấy danh sách small lesson của bài học
          const lessonData = lessonDoc.data();
          const listLesson = lessonData.list_lesson || {};
  
          // Xóa tất cả small lesson của bài học
          for (const smallLessonId in listLesson) {
            const smallLessonRef = doc(lessonsCollection, lessonId);
            await deleteDoc(smallLessonRef);
          }
  
          // Xóa bài học
          await deleteDoc(lessonDoc.ref);
        });
  
        // Bước 3: Xóa khóa học
        const courseRef = doc(db, "courses", courseId);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteDoc(courseRef);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
  
        
        // ...
      } catch (error) {
        console.error("Lỗi khi xóa khóa học: ", error);
        // Xử lý lỗi nếu có
        // ...
      }
    }
  };
  
  if (courses.length <= 0) return null;
  return (
    <div className="mt-10 container">
      {courses.map((item, index) => (
        <tr class="border-b dark:border-neutral-500" key={index}>
          <td class="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
          <td class="whitespace-nowrap px-6 py-4">{item.title}</td>
          <td class="whitespace-nowrap px-6 py-4">{item.author}</td>
          <td class="whitespace-nowrap px-6 py-4 flex items-center gap-x-5">
            <button
              className="px-3 py-2 bg-red-500 font-semibold "
              onClick={() => {
                handleDeleteCourse(item.id);
              }}
            >
              Xóa
            </button>
            <Button to={`/manage/update-course?id=${item.id}`} className="w-20 ">
              Sửa
            </Button>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default PostManage;
