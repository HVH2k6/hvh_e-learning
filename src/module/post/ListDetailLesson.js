import { Button } from "components/button";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const LessonCourseDetail = () => {
  const [chapter, setChapter] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "chapters");
    

    onSnapshot(colRef, (snapshort) => {
      const relust = [];
      snapshort.forEach((doc) => {
        relust.push({
          id: doc.id,
          ...doc.data(),
        });
        console.log(relust);
      });
      setChapter(relust);
    });
  }, []);
  if (chapter.length <= 0) return <p>Không có khóa học</p>;
  return (
    <div className="container mt-10">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Tên khóa học
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chapter.map((item, index) => (
                    <tr
                      class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      key={index}
                    >
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {item.id}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">{item.name_chapter}</td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <Button to={`/manage/lesson/create/${item.slug_chapter}`}>
                          Thêm
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCourseDetail;
