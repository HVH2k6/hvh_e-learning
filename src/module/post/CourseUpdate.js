
import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import { categoryStatus, userRole } from "utils/constants";

const CourseUpdate = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const courseId = params.get("id");
  const navigate = useNavigate();
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    if (userInfo?.role !== userRole.ADMIN) {
      Swal.fire("Bạn không đủ quyền hạn để thực hiện hành động này");
      return;
    }
  
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "courses", courseId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [courseId, reset]);
  const watchStatus = watch("status");
  const { userInfo } = useAuth();

  const handleUpdateCourse = async (values) => {
    if (userInfo?.role !== userRole.ADMIN) {
      Swal.fire("Bạn không đủ quyền hạn để thực hiện hành động này");
      return;
    }
    const colRef = doc(db, "courses", courseId);
    await updateDoc(colRef, {
      title: values.title,
      slug: slugify(values.slug || values.title, { lower: true }),
      status: Number(values.status),
      author:values.author,
      image,
    });
    toast.success("Update category successfully!");
    navigate("/");
  };
  if (!courseId) return null;
  return (
    <div>
     
      <form onSubmit={handleSubmit(handleUpdateCourse)}>
        <div className="form-layout">
        <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
              <Label>Tên tác giả</Label>
              <Input
                control={control}
                name="author"
                placeholder="Nhập tên gv..."
              ></Input>
            </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Trạng thái</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Hiện
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Ẩn
              </Radio>
            </div>
          </Field>
        </div>
        <Button
        
          type="submit"
         
        >
         Sửa
        </Button>
      </form>
    </div>
  );
};

export default CourseUpdate;
