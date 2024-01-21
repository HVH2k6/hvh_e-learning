import Layout from 'components/layout/Layout';
import { db } from 'firebase-app/firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ListChapter = () => {
    const param = useParams();
  const [courseId, setCourseId] = useState(null);
  // const [scrollOY, setScrollOY] = useState(0);
  const [chapters, setChapters] = useState([]);

  const [courseReady, setCourseReady] = useState(false); // Kiểm tra xem courseId đã sẵn sàng hay chưa

  useEffect(() => {
    // Truy vấn Firebase để lấy ID của khóa học dựa trên param.slug
    const colRef = collection(db, "courses");
    const q = query(colRef, where("slug", "==", param.slug));

    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Tìm thấy khóa học với slug tương ứng
        snapshot.forEach((doc) => {
          setCourseId(doc.id);
          setCourseReady(true); // Đã xác định courseId
        });
      } else {
        // Không tìm thấy khóa học với slug tương ứng
        setCourseId(null);
        setCourseReady(true); // Đã xác định rằng không có khóa học tương ứng
      }
    });
  }, [param.slug]);

  useEffect(() => {
    // Chỉ fetch lessons khi courseId đã sẵn sàng
    if (!courseReady) {
      return;
    }

    const colRef = collection(db, "chapters");

    try {
      if (!courseId) {
        toast.error("Không tìm thấy khóa học tương ứng với slug này!");
        return;
      }
      const q = query(colRef, where("courseId", "==", courseId));

      onSnapshot(q, (snapshort) => {
        const relust = [];

        snapshort.forEach((doc) => {
          relust.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setChapters(relust);
      });
    } catch (error) {
      console.log(error);
    }
  }, [courseId, courseReady]);
  useEffect(() => {
    document.title = "Trang học tập ";
  }, []);
    return (
       <Layout>
         <div className="container">
        <h3 className='text-3xl font-semibold my-10 '>Danh sách chương</h3>
         <div className='grid grid-cols-4 gap-5 max-md:grid-cols-1'>
          {chapters && chapters.map((chapter) => (
            <NavLink to={`././${chapter.slug_chapter}`} className="w-full h-12 bg-blue-500 font-semibold text-white rounded-xl p-2 flex items-center justify-center" key={chapter.id}>
              {chapter.name_chapter}   
            </NavLink>
          ))}
        </div>
         </div>
       </Layout>

    );
};

export default ListChapter;