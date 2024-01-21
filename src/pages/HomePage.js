import CourseCard from "components/course/CourseCard";
import Layout from "components/layout/Layout";
import CountDown from "components/time/CountDown";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "courses");
    const q = query(colRef, where("status", "==", 1));

    onSnapshot(q, (snapshort) => {
      const relust = [];
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
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  if (courses.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="grid grid-cols-5 gap-5 max-md:grid-cols-1">
          {courses ? (
            courses.map((course) => (
              <CourseCard key={course.id} data={course}></CourseCard>
            ))
          ) : (
            <>loading</>
          )}
        </div>
      <CountDown></CountDown>

      </div>
    </Layout>
  );
};

export default HomePage;
