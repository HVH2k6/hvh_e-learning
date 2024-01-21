import slugify from "slugify";
import React, { useEffect } from "react";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { Button } from "components/button";
import { auth, db } from "firebase-app/firebase-config";
import { userRole, userStatus } from "utils/constants";
import ButtonGoogle from "components/button/ButtonGoogle";

const schema = yup.object({
  fullname: yup.string().required("Vui lòng nhập tên của bạn"),
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email của bạn"),
  password: yup
    .string()
    .min(7, "Mật khẩu của bạn phải đủ 7 kí tự hoặc hơn")
    .required("Vui lòng nhập khẩu"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });

    toast.success("Đăng kí tài khoản thành công ");
    navigate("/");
  };
  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log("file: SignInPage.js:69 ~ handleLoginGoogle ~ result:", result)
      const { displayName, email } = result.user;
  
      // Check if the user already exists in the "users" collection
      const colRef = collection(db, "users");
      const querySnapshot = await getDocs(query(colRef, where("email", "==", email)));
  
      if (querySnapshot.empty) {
        // User does not exist, create a new user
        await addDoc(colRef, {
          fullname: displayName || "",
          email: email || "",
          username: slugify(displayName, { lower: true }),
          avatar:result?.user?.photoURL || "",
          status: userStatus.ACTIVE,
          role: userRole.USER,
          
        });
        toast.success("Đăng nhập thành công và tạo tài khoản mới");
      } else {
        // User already exists, perform necessary actions
        toast.success("Đăng nhập thành công");
      }
  
      // Navigate or perform other actions here
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Trang đăng kí";
  }, []);
  return (
    <AuthenticationPage>
     <div className="flex items-center justify-center">
      {/* <ButtonGoogle onClick={handleLoginGoogle}></ButtonGoogle> */}
    </div>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Họ tên</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Nhập họ tên của bạn"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Bạn đã có tài khoản? <NavLink to={"/sign-in"}>Đăng nhập</NavLink>{" "}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Đăng kí
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
