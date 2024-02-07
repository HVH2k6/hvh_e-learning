import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "pages/HomePage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "contexts/auth-context";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/constants";
import SignInPage from "pages/SignInPage";
import DocumentPage from "pages/DocumentPage";
import SignUpPage from "pages/SignUpPage";
import DashboardLayout from "module/dashboard/DashboardLayout";
import PageNotFound from "pages/PageNotFound";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";
import CourseUpdate from "module/post/CourseUpdate";
import CourseDetail from "pages/CourseDetail";
import LessonCourseTable from "module/post/LessonCourseTable";
import CreateLesson from "module/post/CreateLesson";
import ListLesson from "module/post/ListLesson";
import LessonUpdate from "module/post/LessonUpdate";
import ChapterManage from "module/chapter/ChapterManage";
import CreateChapter from "module/chapter/CreateChapter";
import ChapterCourseTable from "module/chapter/ChapterCourseTable";
import LessonCourseDetail from "module/post/ListDetailLesson";
import ListChapter from "module/chapter/ListChapter";
import UserProfile from "module/profile/Profile";
import UserUpdate from "module/user/UserUpdate";
import DonatePage from "pages/DonatePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/sign-in",
    element: <SignInPage></SignInPage>,
  },
  {
    path: "/sign-up",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/course/:slug",
    element: <ListChapter></ListChapter>,
  },
  {
    path: "/document",
    element: <DocumentPage></DocumentPage>,
  },
  {
    path: "/course/:slug/:slug",
    element: <CourseDetail></CourseDetail>,
  },
  {
    path: "/manage",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "course",
        element: <PostManage></PostManage>,
      },
      {
        path: "add-post",
        element: <PostAddNew></PostAddNew>,
      },
      {
        path: "update-lesson",
        element: <LessonUpdate></LessonUpdate>,
      },
      {
        path: "update-course",
        element: <CourseUpdate></CourseUpdate>,
      },
      {
        path: "table-lesson",
        element: <LessonCourseTable></LessonCourseTable>,
      },
      {
        path: "lesson/detail/:slug",
        element: <LessonCourseDetail></LessonCourseDetail>,
      },
      {
        path: "chapter-table",
        element: <ChapterCourseTable></ChapterCourseTable>,
      },
      {
        path: "chapter-manage",
        element: <ChapterManage></ChapterManage>,
      },
      {
        path: "chapter/create/:slug",
        element: <CreateChapter></CreateChapter>,
      },
      {
        path: "list-lesson",
        element: <ListLesson></ListLesson>,
      },
      {
        path: "lesson/create/:slug",
        element: <CreateLesson></CreateLesson>,
      },
    ],
  },
  {
    path: "/profile",
    element: <UserProfile></UserProfile>,
  },
  {
    path: "/donate",
    element: <DonatePage></DonatePage>,
  },
  {
    path:"/user",
    element: <UserUpdate></UserUpdate>,
  },
  {
    path: "/*",
    element: <PageNotFound></PageNotFound>,
  },
]);
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      <ToastContainer />
    </ThemeProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
