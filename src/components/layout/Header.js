import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import useClickOutSide from "hooks/useClickOutSide";
import { userRole } from "utils/constants";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
const menuLinks = [
  {
    url: "/",
    title: "Trang chủ",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    
    ),
  },
  {
    url: "/document",
    title: "Tài liệu",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
  },
  {
    url: "/donate",
    title: "Ủng hộ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo_show {
    display: none;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .icon-header svg {
    width: 25px;
    height: 25px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }

  .title_page {
    font-weight: 600;
    font-size: 35px;
    margin-left: 15px;
  }
  .btn_open_menu {
    display: none;
  }
  .close_btn_menu {
    display: none;
  }
  @media screen (min-width: 761px) and (max-width: 1023.98px) {
    .logo {
      max-width: 50px;
    }
  }
  @media screen and (max-width: 760px) {
    .logo {
      max-width: 40px;
    }

    .header-main {
      padding-top: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      max-width: 320px;
      width: 320px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: #eee;
      z-index: 100;
      transform: translateX(-100%);
      transition: all 0.3s linear;
      ${(props) =>
        props.show === true &&
        css`
          transform: translateX(0);
        `};
    }
    .menu {
      display: block;
    }
    .logo_show {
      display: flex;
    }
    .title_page {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      margin-left: 15px;
    }
    .menu-item {
      width: 100%;
      height: 40px;
    }
    .btn_open_menu {
      display: block;
    }
    .btn_open_menu svg {
      width: 35px;
      height: 35px;
    }
    .close_btn_menu {
      display: block;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .close_btn_menu svg {
      width: 30px;
      height: 30px;
    }
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  const { show, setShow, nodeRef } = useClickOutSide("button");
  const handleLogout = () => {
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
      }
    });
  };
  return (
    <HeaderStyles show={show} ref={nodeRef}>
      <div className="container dark:text-white dark:fill-white">
        <div className="flex justify-between">
          <button className="btn_open_menu" onClick={() => setShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
          <NavLink to="/" className="flex items-center logo_show">
            <img srcSet="/logo.png 2x" alt="logo" className="logo " />
          </NavLink>
        </div>
        <div className="header-main">
          <button className="close_btn_menu" onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          <NavLink to="/" className="flex items-center">
            <img srcSet="/logo.png" alt="logo" className="logo w-28" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item " key={item.title}>
                <NavLink to={item.url} className="menu-link flex items-center hover:text-blue-500">
                  <span className="mr-3 icon-header dark:fill-white">
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {!userInfo ? (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Đăng nhập
            </Button>
          ) : (
            <>
              {userInfo?.role === userRole.ADMIN ? (
                <div className="header-auth">
                  <Button
                    type="button"
                    height="56px"
                    className="header-button"
                    to="/manage"
                  >
                    Quản lí
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link to="/profile">
                    <img
                      src={
                        userInfo?.avatar ||
                        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww"
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                  <p className="ml-2 text-sm font-semibold">
                    {userInfo?.fullname}
                  </p>
                  <button
                    className="ml-2 inline-block font-semibold px-3 py-2 rounded-lg bg-green-500"
                    onClick={handleLogout}
                  >
                    {" "}
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
