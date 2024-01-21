import { Button } from "components/button";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const ChapterManage = () => {
  const [chapter, setChapter] = useState([]);
  const [filter, setFilter] = useState(undefined);
  useEffect(() => {
    const colRef = collection(db, "chapters");
    const newRef = filter
      ? query(
          colRef,
          where("name_chapter", ">=", filter),
          where("name_chapter", "<=", filter + "utf8")
        )
      : colRef;

    onSnapshot(newRef, (snapshort) => {
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
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const handleDeleteLesson = async (lessonId) => {
    await deleteDoc(doc(db, "lessons", lessonId));
  };

  return (
    <div className="container dark:text-white">
      <h1 className="text-3xl font-semibold">Danh sách bài học</h1>
      
      <div className="w-80 h-12 rounded-lg my-5 ">
        <input
          type="text"
          className="w-full h-full rounded-lg border-2 outline-none p-2 "
          placeholder="Tìm kiếm bài học"
          onChange={handleInputFilter}
        />
      </div>
      <div className="max-h-[500px] content-list-lesson scroll-custom">
        <table className="">
          <thead>
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Tên</th>
              <th>Thuộc khóa học</th>

              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {chapter
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((item, index) => (
                <tr
                  class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                  key={index}
                >
                  <td class="whitespace-nowrap px-6 py-4">{index + 1}</td>

                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                    {item.id.slice(0, 25) + "..."}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {item.name_chapter.slice(0, 40) + "..."}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {item.nameCourse.slice(0, 25) + "..."}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <button
                      className="px-5 py-3 bg-red-500 font-semibold rounded-lg text-white mr-5"
                      onClick={() => {
                        handleDeleteLesson(item.id);
                      }}
                    >
                      Xóa
                    </button>
                    <Button
                      to={`/manage/update-lesson?id=${item.id}`}
                      className="w-20 "
                    >
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChapterManage;
