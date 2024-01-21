import Button from "components/button/Button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import { userRole } from "utils/constants";

const LessonUpdate = () => {
  const {
    handleSubmit,
    control,
    
    
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const lessonId = params.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "lessons", lessonId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [lessonId, reset]);

  const { userInfo } = useAuth();

  const handleUpdateLesson = async (values) => {
    if (userInfo?.role !== userRole.ADMIN) {
      Swal.fire("Bạn không đủ quyền hạn để thực hiện hành động này");
      return;
    }
    const colRef = doc(db, "lessons", lessonId);
    await updateDoc(colRef, {
      name_lesson: values.name_lesson,
      slug_lesson: slugify(values.slug_lesson || values.name_lesson, { lower: true }),
      link_lesson: values.link_lesson,
      link_document: values.link_document,
      homework: values.homework,
      video_homework: values.video_lesson,
      
      
    });
    toast.success("Update category successfully!");
    navigate("/manage");
  };
  return (
    <div className="container mt-10">
      <form onSubmit={handleSubmit(handleUpdateLesson)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name_lesson"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug_lesson"
              placeholder="Enter your slug"
            ></Input>
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
        </div>

        <Button type="submit">Sửa</Button>
      </form>
    </div>
  );
};

export default LessonUpdate;
