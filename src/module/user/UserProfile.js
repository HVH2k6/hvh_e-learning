// import { Button } from "components/button";
// import { Field } from "components/field";
// import ImageUpload from "components/image/ImageUpload";
// import { Input } from "components/input";
// import { Label } from "components/label";
// import { useAuth } from "contexts/auth-context";
// import DashboardHeading from "module/dashboard/DashboardHeading";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// import useFirebaseImage from "hooks/useFirebaseImage";
// import { useEffect } from "react";
// import { useState } from "react";
// import { getAuth, updateProfile } from "firebase/auth";
// import { db } from "firebase-app/firebase-config";

// const UserProfile = () => {
//   const { control, handleSubmit } = useForm({
//     mode: "onChange",
//   });
//   const { userInfo, updateUser } = useAuth();
//   const [defaultValues, setDefaultValues] = useState({
//     fullname: "",
//     username: "",
//     // birthday: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (userInfo) {
//       setDefaultValues({
//         fullname: userInfo.fullname || "",
//         username: userInfo.username || "",
//         // birthday: userInfo.birthday || "",
//         phone: userInfo.phone || "",
//         email: userInfo.email || "",
//         password: "",
//         confirmPassword: "",
//       });
//     }
//   }, [userInfo]);

//   const handleUpdateProfile = async (data) => {
//     setLoading(true);
  
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (user) {
//         await updateProfile(user, {
//           displayName: data.username,
//         });
  
//         await db.collection("users").doc(user.uid).update({
//           fullname: data.fullname,
//           username: data.username,
//           birthday: data.birthday,
//           phone: data.phone,
//           email: data.email,
//         });
  
//         toast.success("Profile updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("An error occurred while updating profile");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="">
//       <DashboardHeading
//         title="Account information"
//         desc="Update your account information"
//       ></DashboardHeading>
//       <form onSubmit={handleSubmit(handleUpdateProfile)}>
//         <div className="text-center mb-10">
//           <ImageUpload className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"></ImageUpload>
//         </div>
//         <div className="form-layout">
//           <Field>
//             <Label>Fullname</Label>
//             <input
//               // control={control}
//               className="w-[350px] h-[50px] rounded-lg border-[1px] border-grayf1 px-2 py-1"
//               type="text"
//               name="fullname"
//               placeholder="Enter your fullname"
//               defaultValue={defaultValues.fullname}
//             />
//           </Field>
//           <Field>
//             <Label>Username</Label>
//             <input
//               // control={control}
//               className="w-[350px] h-[50px] rounded-lg border-[1px] border-grayf1 px-2 py-1"
//               type="text"
//               name="username"
//               placeholder="Enter your username"
//               defaultValue={defaultValues.username}
//             />
//           </Field>
//         </div>
//         <div className="form-layout">
//           {/* <Field>
//             <Label>Date of Birth</Label>
//             <input
//               // control={control}
//               className="w-[350px] h-[50px] rounded-lg border-[1px] border-grayf1 px-2 py-1"
//               type="text"
//               name="birthday"
//               placeholder="Enter your birthday"
//               defaultValue={defaultValues.birthday}
//             />
//           </Field> */}
//           <Field>
//             <Label>Mobile Number</Label>
//             <input
//               // control={control}
//               className="w-[350px] h-[50px] rounded-lg border-[1px] border-grayf1 px-2 py-1"
//               type="text"
//               name="phone"
//               placeholder="Enter your phone"
//               defaultValue={defaultValues.phone}
//             />
//           </Field>
//         </div>
//         <div className="form-layout">
//           <Field>
//             <Label>Email</Label>
//             <input
//               // control={control}
//               className="w-[350px] h-[50px] rounded-lg border-[1px] border-grayf1 px-2 py-1"
//               type="text"
//               name="email"
//               placeholder="Enter your email"
//               defaultValue={defaultValues.email}
//             />
//           </Field>
          
//         </div>
//         <div className="form-layout">
//           <Field>
//             <Label>New Password</Label>
//             <Input
//               control={control}
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//             ></Input>
//           </Field>
//           <Field>
//             <Label>Confirm Password</Label>
//             <Input
//               control={control}
//               name="confirmPassword"
//               type="password"
//               placeholder="Enter your confirm password"
//             ></Input>
//           </Field>
//         </div>
//         <Button kind="primary" className="mx-auto w-[200px]" type="submit">
//           Update
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;
import React from 'react';

const UserProfile = () => {
  return (
    <div>
      
    </div>
  );
};

export default UserProfile;