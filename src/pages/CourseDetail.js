import Layout from "components/layout/Layout";
import { LoadingSpinner } from "components/loading";
import LoadingLazy from "components/loading/LoadingLazy";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const param = useParams();
  console.log("CourseDetail ~ param:", param.slug)
  const [lesson, setLesson] = useState([]);
  
  const [document, setDocument] = useState("");
  const [homework, setHomework] = useState("");
  const [videoHomework, setVideoHomework] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  let [linkVideoLesson, setLinkVideoLesson] = useState("");
  if (linkVideoLesson.includes("https://www.youtube.com/watch?v=")) {
    linkVideoLesson = linkVideoLesson.replace(
      "https://www.youtube.com/watch?v=",
      ""
    );
  } else if (linkVideoLesson.includes("https://youtu.be/")) {
    linkVideoLesson = linkVideoLesson.replace("https://youtu.be/", "").trim();
  }
  const [nameLesson, setNameLesson] = useState("");

  const [chapterId, setChapterId] = useState(null);
  console.log("CourseDetail ~ chapterId:", chapterId)
  // const [scrollOY, setScrollOY] = useState(0);

  const [courseReady, setCourseReady] = useState(false); // Kiểm tra xem courseId đã sẵn sàng hay chưa

  useEffect(() => {
    // Truy vấn Firebase để lấy ID của khóa học dựa trên param.slug
    const colRef = collection(db, "chapters");
    const q = query(colRef, where("slug_chapter", "==", param.slug));

    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Tìm thấy khóa học với slug tương ứng
        snapshot.forEach((doc) => {
          setChapterId(doc.id);
          setCourseReady(true); // Đã xác định courseId
        });
      } else {
        // Không tìm thấy khóa học với slug tương ứng
        setChapterId(null);
        setCourseReady(true); // Đã xác định rằng không có khóa học tương ứng
      }
    });
  }, [param.slug]);

  useEffect(() => {
    // Chỉ fetch lessons khi courseId đã sẵn sàng
    if (!courseReady) {
      return;
    }

    const colRef = collection(db, "lessons");

    try {
      if (!chapterId) {
        toast.error("Không tìm thấy khóa học tương ứng với slug này!");
        return;
      }
      const q = query(colRef, where("chapterId", "==", chapterId));

      onSnapshot(q, (snapshort) => {
        const relust = [];

        snapshort.forEach((doc) => {
          relust.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setLesson(relust);
      });
    } catch (error) {
      console.log(error);
    }
  }, [chapterId, courseReady]);

  const filteredLessons = lesson.filter((item) =>
    item.name_lesson.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (window.innerWidth <= 768) {
    window.addEventListener("scroll", function () {
      // setScrollOY(window.scrollY);
    });
  }

  return (
    <Layout>
      <div className="grid grid-cols-[350px_1fr] mobile">
        <div className="">
          <div className="w-full py-3 flex items-center justify-center bg-slate-400">
            Danh sách bài học
          </div>
          <input
            className="w-full h-10 rounded-xl border-2 my-3 px-2 py-1"
            placeholder="Tìm kiếm bài học"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="px-3 max-h-[600px] overflow-y-auto scroll-custom">
            {filteredLessons && filteredLessons.length > 0 ? (
              filteredLessons
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((item) => (
                  <div
                    className="border-b-2 border-slate-500 last:border-none cursor-pointer bg-slate-200 px-5 py-3"
                    key={item.id}
                    onClick={() => {
                      setNameLesson(item.name_lesson);
                      setLinkVideoLesson(item.link_lesson);
                      setDocument(item.link_document);
                      setHomework(item.homework);
                      setVideoHomework(item.video_homework);

                      if (window.innerWidth <= 768) {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {item.name_lesson.length > 40 ? (
                      <>{item.name_lesson.slice(0, 40) + "..."}</>
                    ) : (
                      <>{item.name_lesson}</>
                    )}
                  </div>
                ))
            ) : (
              <div className="flex justify-center">
              <LoadingLazy></LoadingLazy>
              </div>
            )}
          </div>
        </div>
        <div className="mx-10 mobile-frame dark:text-white">
          {linkVideoLesson && linkVideoLesson.length > 0 ? (
            <>
              <h1 className="text-3xl font-semibold  mb-5 max-md:text-2xl">
                {nameLesson}
              </h1>
              <div className="max-w-6xl mx-auto">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${linkVideoLesson}`}
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-2">
                  <h2 className="text-2xl font-semibold mb-3 ">Tài liệu:</h2>
                  <a
                    href={document}
                    target="_blank"
                   
                   
                    className="text-blue-500 ml-2 inline-block"
                  >
                    Xem ngay
                  </a>
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-semibold mb-3 ">Bài tập:</h2>
                  <a
                    href={homework}
                    className="text-blue-500 ml-2 inline-block"
                    target={"_blank"}
                  >
                    Xem ngay
                  </a>
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-semibold mb-3 ">
                    Video giải bài tập:
                  </h2>
                  <a
                    href={videoHomework}
                    className="text-blue-500 ml-2 inline-block"
                    target={"_blank"}
                  >
                    Xem ngay
                  </a>
                </div>
              </div>
            </>
          ) : (
            <p>Chọn video để xem</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
