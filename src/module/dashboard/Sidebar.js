import { Button } from "components/button";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import useClickOutSide from "hooks/useClickOutSide";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
  .btn_open_menu {
    display: none;
  }
  .close_btn_menu {
    display: none;
  }
  .img-show{
    display: none;
  }
  }
  @media screen and (max-width: 1023px) {
    .menu_sidebar {
      position: fixed;
      top: 0;
      left: 0;
      background-color: #eee;
      max-width: 320px;
      width: 320px;
      z-index: 100;
      height: 100%;
      transition: 0.3s linear;
      transform: translateX(-100%);

      ${(props) =>
        props.show === true &&
        css`
          transform: translateX(0);
        `};
    }
   
    .btn_open_menu {
      display: block;
      margin-bottom: 25px;
    }
    .close_btn_menu {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      
      svg {
        width: 30px;
        height: 30px;
      }
    }
    .menu-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin:15px 10px;
      .logo{
        max-width: 40px;
        
      }
    }
    @media screen and (max-width: 760px){
    .img-show{
      display: flex;
    }
    }
  }
`;
const sidebarLinks = [
  {
    title: "Bảng quản lý",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Khóa học",
    url: "/manage/course",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Tạo chương",
    url: "/manage/chapter-table",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
    
    ),
  },
  {
    title: "Quản lý chapter",
    url: "/manage/chapter-manage",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
    </svg>
    
    
    ),
  },

  {
    title: "Bài học chi tiết",
    url: "/manage/table-lesson",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "Danh sách bài học",
    url: "/manage/list-lesson",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    
    ),
  },
  {
    title: "Người dùng",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Đăng xuất",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: () => {
      Swal.fire({
        title: "bạn có chắc chắn",
        text: "Bạn có muốn đăng xuất",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1DC071",
        cancelButtonColor: "#ef233c",
        confirmButtonText: "Xác nhận",
      }).then(async (result) => {
        if (result.isConfirmed) {
          signOut(auth);
          Swal.fire("Đăng xuất thành công");
          //hahung09092006@gmail.com 1234567hung
        }
      });
    },
  },
];
const Sidebar = () => {
  const { show, setShow, nodeRef } = useClickOutSide("button");

  return (
    <SidebarStyles show={show} ref={nodeRef}>
      <button className="btn_open_menu" onClick={() => setShow(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>

      <div className="menu_sidebar">
        <div className="menu-top">
          <NavLink to="/" className="flex items-center img-show">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
            <h1 className="title_page">HVH Blog</h1>
          </NavLink>
          <button className="close_btn_menu" onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </div>
        {sidebarLinks.map((link) => {
          if (link.onClick)
            return (
              <div
                className="menu-item"
                onClick={link.onClick}
                key={link.title}
              >
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </div>
            );
          return (
            <NavLink to={link.url} className="menu-item" key={link.title}>
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </NavLink>
          );
        })}
        <Button to="/manage/add-post" className="header-button" height="52px">
          Tạo bài viết
        </Button>
      </div>
    </SidebarStyles>
  );
};

export default Sidebar;
