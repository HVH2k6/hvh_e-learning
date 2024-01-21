import Button from "components/button/Button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";

const CreateChapter = () => {
  let param = useParams();

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name_chapter: "",
      slug_chapter: "",
    },
  });

  const [courseId, setCourseId] = useState(null); // Lưu ID của khóa học dựa trên param.slug
  const [nameCourse, setNameCourse] = useState(null); // Lưu ID của khóa học dựa trên param.slug

  console.log("file: CreateLesson.js:25 ~ CreateLesson ~ courseId:", courseId);

  useEffect(() => {
    // Truy vấn Firebase để lấy ID của khóa học dựa trên param.slug
    const colRef = collection(db, "courses");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("slug", "==", param.slug)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        
        // Lấy ID của khóa học từ doc
        setCourseId(doc.id);
        setNameCourse(doc.data().title);
      });
    });
  }, [param.slug]);

  const handleUploadLesson = async (values) => {
    try {
      // Kiểm tra xem đã lấy được ID của khóa học chưa
      if (!courseId) {
        toast.error("Không tìm thấy khóa học tương ứng với slug này!");
        return;
      }

      const cloneValues = { ...values };

      cloneValues.slug_chapter = slugify(
        values.slug_chapter || values.name_chapter,
        { lower: true }
      );

      const colRef = collection(db, "chapters");
      await addDoc(colRef, {
        ...cloneValues,
        courseId: courseId, // Sử dụng ID của khóa học đã lấy được
        nameCourse: nameCourse,
        name_chapter: values.name_chapter,

        createdAt: serverTimestamp(),
      });
      toast.success("Create new lesson successfully!");
      reset({
        name_chapter: "",
        slug_chapter: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi tạo bài học.");
    } finally {
      // Thực hiện các tác vụ sau khi thêm bài học (nếu cần)
    }
  };

  return (
    <div>
      <form
        className="container mt-10 grid grid-cols-2 gap-x-10 gap-y-8"
        onSubmit={handleSubmit(handleUploadLesson)}
        autoComplete="off"
      >
        <Field>
          <Label>Tên bài học</Label>
          <Input
            control={control}
            name="name_chapter"
            className="border-2 border-stone-400"
          />
        </Field>

       

        <Button type="submit">Tạo</Button>
      </form>
    </div>
  );
};

export default CreateChapter;
