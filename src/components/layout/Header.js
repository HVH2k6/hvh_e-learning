import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
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
    icon:(
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
    )
    
  },
  {
    url: "/donate",
    title: "Ủng hộ",
    icon:(
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M224 24V80H168c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h56v56c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V176h56c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H320V24c0-13.3-10.7-24-24-24H248c-13.3 0-24 10.7-24 24zM559.7 392.2c17.8-13.1 21.6-38.1 8.5-55.9s-38.1-21.6-55.9-8.5L392.6 416H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288 272 193.7c-29.1 0-57.3 9.9-80 28L68.8 384H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H192 352.5c29 0 57.3-9.3 80.7-26.5l126.6-93.3zm-367-8.2l.9 0 0 0c-.3 0-.6 0-.9 0z"/></svg>
    )
  },
  {
    url: "/contact",
    title: "Liên hệ",
    icon:(
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"/></svg>
    )
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
  .logo_show{
    display: none;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .icon-header svg{
      width:25px;
      height:25px;

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
    .logo_show{
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

}
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
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link flex items-center">
                  <span className="mr-3 icon-header dark:fill-white">
                  {item.icon}
                  </span>
                  <span>
                  {item.title}
                  </span>
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
            ):(
              <div className="flex items-center">
                <img src={userInfo?.avatar} alt="" className="w-12 h-12 rounded-full object-cover"/>
                <p className="ml-2 text-sm font-semibold">{userInfo?.fullname}</p>
                <button className="ml-2 inline-block font-semibold px-3 py-2 rounded-lg bg-green-500" onClick={handleLogout}> Đăng xuất</button>
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
