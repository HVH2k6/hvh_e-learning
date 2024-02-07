import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAuth, updateProfile } from "firebase/auth";
import useFirebaseImage from "hooks/useFirebaseImage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

import { toast } from "react-toastify";

import InputPasswordToggle from "components/input/InputPasswordToggle";
import LoadingLazy from "components/loading/LoadingLazy";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const {
    control,
    handleSubmit,

    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const auth = getAuth();
  const user = auth.currentUser;

  const imageUrl = getValues("avatar");

  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);

  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const uidUser = user?.uid;
  const handleUpdateUser = async (values) => {
    if (!isValid) return;

    try {
      const colRef = doc(db, "users", uidUser);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      await updateProfile(auth.currentUser, {
        photoURL: image,
        displayName: values.fullname,
      });
      toast.success("Update user information successfully!");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", uidUser);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function fetchData() {
      if (!uidUser) {
        return <LoadingLazy></LoadingLazy>;
      }

      try {
        const colRef = doc(db, "users", uidUser);
        const docData = await getDoc(colRef);

        if (docData.exists()) {
          reset(docData.data());
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [uidUser, reset]);

  return (
    <div className="container">
      <div className="flex my-10 gap-x-10 items-center justify-center">
        <NavLink
          className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-green-400 "
          to="/"
        >
          <span className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          <span className="ml-2 font-medium text-white max-md:hidden">
            Trang chủ
          </span>
        </NavLink>
        <div className="flex items-center justify-center mx-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <h3 className="ml-5 text-3xl">Cập nhật thông tin</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="text-center mb-10">
          <ImageUpload
            className="!w-[200px] !h-[200px] !rounded-full  mx-auto"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>

        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>

            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
          {/* <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field> */}
        </div>
        <Button kind="primary" className="mx-auto w-[200px]" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
