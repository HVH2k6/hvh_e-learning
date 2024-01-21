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

const CreateLesson = () => {
  let param = useParams();

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name_lesson: "",
      slug_lesson: "",
    },
  });

  const [chapterId, setChapterId] = useState(null); 
  const [nameCourse, setNameCourse] = useState(null);
 



  useEffect(() => {
    // Truy vấn Firebase để lấy ID của khóa học dựa trên param.slug
    const colRef = collection(db, "chapters");
    const q = query(
      colRef,
      
      where("slug_chapter", "==", param.slug)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        
        // Lấy ID của khóa học từ doc
        setChapterId(doc.id);
        setNameCourse(doc.data().name_chapter);
      });
    });
  }, [param.slug]);

  const handleUploadLesson = async (values) => {
    try {
      // Kiểm tra xem đã lấy được ID của khóa học chưa
      if (!chapterId) {
        toast.error("Không tìm thấy khóa học tương ứng với slug này!");
        return
      }

      const cloneValues = { ...values };

      cloneValues.slug_lesson = slugify(
        values.slug_lesson || values.name_lesson,
        { lower: true }
      );

      const colRef = collection(db, "lessons");
      await addDoc(colRef, {
        ...cloneValues,
        chapterId: chapterId, // Sử dụng ID của khóa học đã lấy được
        nameCourse: nameCourse,
        link_lesson: values.link_lesson,
        link_document: values.link_document,
        homework: values.homework,
        video_homework: values.video_lesson,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new lesson successfully!");
      reset({
        name_lesson: "",
        slug_lesson: "",
        link_lesson: "",
        link_document: "",
        homework: "",
        video_lesson: "",
        
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
          <Input control={control} name="name_lesson" className="border-2 border-stone-400"/>
        </Field>
        <Field>
          <Label>Link bài học</Label>
          <Input control={control} name="link_lesson" className="border-2 border-stone-400"/>
        </Field>
        <Field>
            <Label>Link tài liệu</Label>
            <Input control={control} name="link_document" className="border-2 border-stone-400"/>
        </Field>
        <Field>
          <Label>Bài tập</Label>
          <Input control={control} name="homework" className="border-2 border-stone-400"/>
        </Field>
        <Field>
          <Label>Video giải</Label>
          <Input control={control} name="video_lesson" className="border-2 border-stone-400"/>
        </Field>
        {/* <Field>
          <Label>Slug</Label>
          <Input control={control} name="slug_lesson" className="border-2 border-stone-400"/>
        </Field> */}

        <Button type="submit">Tạo</Button>
      </form>
    </div>
  );
};

export default CreateLesson;
