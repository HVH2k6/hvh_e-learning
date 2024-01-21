import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { userRole, userStatus } from "utils/constants";
import slugify from "slugify";
import ButtonGoogle from "components/button/ButtonGoogle";

const schema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email của bạn"),
  password: yup
    .string()
    .min(7, "Mật khẩu của bạn phải đủ 7 kí tự hoặc hơn")
    .required("Vui lòng nhập khẩu"),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Trang đăng nhập";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("Thông tin đăng nhập sai vui lòng kiểm tra lại");
    }
    
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
  
  console.log("file: SignInPage.js:50 ~ SignInPage ~ userInfo:", userInfo)
  return (
    <AuthenticationPage>
    <div className="flex items-center justify-center">
      {/* <ButtonGoogle onClick={handleLoginGoogle}></ButtonGoogle> */}
    </div>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="passwor">Mật khẩu</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Bạn chưa có tài khoản?{" "}
          <NavLink to={"/sign-up"}>Đăng kí tài khoản</NavLink>{" "}
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
        Đăng nhập
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
