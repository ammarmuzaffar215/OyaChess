import { useState } from "react";
import { connect } from "react-redux";
import { classNames } from "primereact/utils";

import AppMenu from "./AppMenu.js";
import AppFooter from "../AppFooter.js";
import AppSideBarProvider from "./AppSideBarProvider.js";

import Toggle from "../../../assets/icons/Toggle.js";
import Documents from "../../../assets/icons/Documents.js";
import Stack from "../../../assets/icons/Stack.js";
import Users from "../../../assets/icons/Users.js";
import Files from "../../../assets/icons/Files.js";
import Data from "../../../assets/icons/Data.js";
import Messaging from "../../../assets/icons/Messaging.js";
import MailSent from "../../../assets/icons/MailSent.js";
import Tests from "../../../assets/icons/Tests.js";
import Home from "../../../assets/icons/Home.js";
// ~cb-add-import~

const AppSideBar = (props) => {
  const { activeKey: initialActiveKey, activeDropdown: initialActiveDropdown, user } = props;

  const [activeKey, setActiveKey] = useState(initialActiveKey);
  const [activeDropdown, setActiveDropdown] = useState(initialActiveDropdown);
  const [open, setOpen] = useState(true);

  const isStudent = user?.role?.toLowerCase() === "student";
  console.log("Sidebar user role:", user?.role); // Debug log

  return (
    <>
      <div
        className={classNames(
          "duration-300 flex-shrink-0",
          open ? "w-[280px]" : "w-[calc(3rem+20px)]"
        )}
      ></div>
      <AppSideBarProvider
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        open={open}
        setOpen={setOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      >
        <div
          className={classNames(
            "fixed z-[100] flex flex-col top-20 left-0 h-[calc(100vh-5rem)] overflow-y-hidden overflow-x-hidden flex-shrink-0 shadow bg-[#F8F9FA] border-r border-[#DEE2E6] border-solid duration-300",
            open ? "w-[280px]" : "w-[calc(3rem+20px)]"
          )}
        >
          <div className="flex-grow gap-1 p-2 overflow-x-hidden overflow-y-auto no-scrollbar">
            <div className="flex gap-3 px-3 py-[10px]">
              <span className="cursor-pointer" onClick={() => setOpen(!open)}>
                <Toggle />
              </span>
            </div>

            {/* Dashboard */}
            <AppMenu icon={<Home />} label="Dashboard" menuKey="dashboard" to="/dashboard" />

            {/* Gamelogs */}
            <AppMenu icon={<Documents />} label="Gamelogs" menuKey="gamelogs" to="/gamelogs" />

            {/* Only show these if NOT a student */}
            {!isStudent && (
              <>
                <AppMenu icon={<Stack />} label="Packages" menuKey="packages" to="/packages" />
                <AppMenu icon={<Users />} label="Enrollments" menuKey="enrollments" to="/enrollments" />
                <AppMenu icon={<Data />} label="Items" menuKey="items" to="/items" />
              </>
            )}

            {/* Shared Menus */}
            <AppMenu icon={<Files />} label="Materials" menuKey="materials" to="/materials" />
            {/* <AppMenu icon={<Tests />} label="Puzzles" menuKey="puzzles" to="/puzzles" /> */}
            {/* ~cb-add-menu~ */}
          </div>
          <div
            className={classNames(
              "text-center duration-300",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            <AppFooter />
          </div>
        </div>
      </AppSideBarProvider>
    </>
  );
};

// Connect to Redux to get user info
const mapState = (state) => ({
  user: state.auth.user,
});

export default connect(mapState)(AppSideBar);
