import Button from "components/button/Button";
import { Radio } from "components/checkbox";

import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { postStatus } from "utils/constants";

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      slug: "",
      status: 2,
      image: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");

  const handleUploadCourse = async (values) => {
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);

      // const slugExists = await checkSlugExists(cloneValues.slug);
      // if (slugExists) {
      //   const randomId = generateRandomId();
      //   cloneValues.slug = `${cloneValues.slug}-${randomId}`;
      //   console.log("New Slug:", cloneValues.slug); // In ra slug mới tạo
      // }
      const colRef = collection(db, "courses");
      await addDoc(colRef, {
        
        
        ...cloneValues,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        author: "",
        image: "",
      });
      handleResetUpload();
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const {userInfo} = useAuth()
  if(!userInfo){
    return null
  }
  return (
   
      
      <div>
        <div className="container mt-7">
          <form
            onSubmit={handleSubmit(handleUploadCourse)}
            className="w-[800px] mx-auto"
            autoComplete="off"
          >
            <Field>
              <Label>Tên khóa học</Label>
              <Input
                control={control}
                name="title"
                placeholder="Nhập tên khóa học"
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
              <Label>Đường dẫn</Label>
              <Input
                control={control}
                name="slug"
                placeholder="Nhập đường dẫn"
              ></Input>
            </Field>
            <Field>
              <Label>Ảnh </Label>
              <ImageUpload
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                className="h-[300px]"
                progress={progress}
                image={image}
              ></ImageUpload>
            </Field>
            <Field>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Hiển thị
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Ẩn
              </Radio>
            </Field>
            <Button
              type="submit"
              className="mx-auto w-[250px]"
              isLoading={loading}
              disabled={loading}
            >
              Đăng
            </Button>
          </form>
        </div>
      </div>
    
  );
};

export default PostAddNew;
