import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";

const UserManage = () => {
  // const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading
        title="Người dùng"
        desc="Quản lí người dùng"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Thêm người dùng
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
