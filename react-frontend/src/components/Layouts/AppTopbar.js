import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import client from "../../services/restClient";
import Email from "../../assets/icons/Email.js";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import "./Notification.css";
import NotificationMenu from "./NotificationMenu.js";

const AppTopbar = (props) => {
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const [ticker, setTicker] = useState("");
  const label = process.env.REACT_APP_PROJECT_LABEL;
  const [profiles, setProfiles] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const initializeCacheStructure = async () => {
    try {
      if (!props.user?._id) return;

      const response = await props.getCache();
      const currentCache = response.results;

      const usersResponse = await client.service("users").find({
        query: { $limit: 10000 },
      });
      const currentUserData = usersResponse.data.find(
        (u) => u._id === props.user._id
      );

      if (!currentUserData) return;

      const defaultCacheStructure = {
        profiles: [currentUserData].map((user) => ({
          profileId: user._id,
          role: user.role || "Unknown Role",
          preferences: {
            dashboardCards: ["recentItems", "pinnedItems", "teamMembers"],
            pastTabsAry: [
              {
                icon: "pi pi-times",
                iconPos: "right",
                label: "branches",
                mainMenu: 7,
                url: "/branches",
              },
            ],
            settings: {},
          },
        })),
        selectedUser: selectedUser || currentUserData?._id,
      };

      if (!currentCache || !currentCache.profiles) {
        await props.setCache(defaultCacheStructure);
        console.log("Cache initialized with user-specific preferences");
      }
    } catch (error) {
      console.error("Error initializing cache structure:", error);
    }
  };

  useEffect(() => {
    initializeCacheStructure();
  }, [props.user]);

  useEffect(() => {
    const handlePatchedUser = (user) => {
      if (props.user?._id === user?._id) {
        props.logout();
      }
      setTicker(`patched ${user.name}`);
    };

    client.service("users").on("patched", handlePatchedUser);

    return () => {
      client.service("users").off("patched", handlePatchedUser);
    };
  }, [props.user?._id, props.logout]);

  const showMenu = (e) => {
    if (userMenuRef?.current) userMenuRef.current.show(e);
  };

  useEffect(() => {
    if (!props.user?._id) return;

    const fetchUsers = async () => {
      try {
        const res = await client.service("users").find({
          query: { $limit: 10000 },
        });
        const currentUser = res.data.find((user) => user._id === props.user._id);
        if (currentUser) setProfiles([currentUser]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [props.user]);

  useEffect(() => {
    const formattedUserItems = profiles.map((user) => ({
      id: user._id,
      name: user.name || "Unknown",
      role: user.role || "Unknown Role",
      status: "success",
    }));
    setUserItems(formattedUserItems);

    if (!selectedUser && formattedUserItems[0]) {
      setSelectedUser(formattedUserItems[0].id);
    }
  }, [profiles]);

  useEffect(() => {
    const updateSelectedUserInCache = async () => {
      try {
        const currentCache = await props.getCache();

        if (currentCache && currentCache.selectedUser !== selectedUser) {
          const updatedCache = { ...currentCache, selectedUser };

          await props.setCache(updatedCache);
          console.log("Cache updated with new selected user:", selectedUser);
        }
      } catch (error) {
        console.error("Error updating cache with selected user:", error);
      }
    };

    if (selectedUser) updateSelectedUserInCache();
  }, [selectedUser, props]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    console.log(`Selected user ID: ${userId}`);
  };

  const items = [
  ...userItems.map((user) => ({
    label: (
      <div className="container flex flex-row ms-0" style={{ width: "350px" }}>
        <div className="ps-0">
          <Avatar
            label={user.name.charAt(0).toUpperCase()}
            className="mr-2"
            shape="circle"
            size="large"
            style={{
              borderRadius: "50%",
              backgroundColor: "#D30000",
              color: "#ffffff",
            }}
          />
        </div>
        <div className="container flex-grow">
          <div
            className="justify-start mb-2"
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#2A4454",
              textAlign: "left",
              width: "12rem",
            }}
          >
            {user.name}
          </div>
          <div className="flex justify-start align-items-end">
            <Tag value={user.role} severity={user.status} />
          </div>
        </div>
      </div>
    ),
    command: () => {
      console.log(`Selected user object:`, user);
    },
  })),
  { separator: true },
  {
    label: "Log Out",
    icon: "pi pi-fw pi-sign-out",
    template: (item) => (
      <ul className="p-menu-list p-reset">
        <li className="p-menu-list p-reset" key={item.label}>
          <a className="p-menuitem-link" onClick={onLogout} role="menuitem">
            <span className={"p-menuitem-icon pi pi-sign-out text-primary"}></span>
            <span className={"p-menuitem-text text-primary"}>{item.label}</span>
          </a>
        </li>
      </ul>
    ),
  },
];


  const onLogout = async (e) => {
    try {
      await props.logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return props.isLoggedIn ? (
    <div className="layout-topbar">
      <Link to="/dashboard">
        <div className="flex items-center gap-2 cursor-pointer min-w-max">
          <img src={"./assets/logo/oyachess.svg"} height={30} alt="logo" />
          <h3 style={{ fontFamily: "MarlinGeo", fontWeight: "bolder", margin: 0, color: "black" }}>
            {label !== "" ? label : "My App"}
          </h3>
        </div>
      </Link>
      {ticker}

      {props.showSideMenuButton ? (
        <button
          type="button"
          className="p-link layout-menu-button layout-topbar-button"
          onClick={props.onToggleMenuClick}
        >
          <i className="pi pi-bars" />
        </button>
      ) : null}

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={
          "layout-topbar-menu lg:flex origin-top" +
          (props.mobileTopbarMenuActive ? " layout-topbar-menu-mobile-active" : "")
        }
      >
        <Link to="/inbox">
          <Email />
        </Link>
        <NotificationMenu />
      </ul>

      <Menu
        model={items}
        popup
        ref={userMenuRef}
        id="user-popup-menu"
        key={selectedUser}
        style={{ width: "310px" }}
      />

      {props.isLoggedIn ? (
        <Avatar
          label={props.user.name ? props.user.name.charAt(0).toUpperCase() : " "}
          className="mr-2 ml-2"
          shape="circle"
          onClick={showMenu}
          aria-controls="user-popup-menu"
          aria-haspopup
          style={{ borderRadius: "50%", backgroundColor: "#D30000", color: "#ffffff" }}
        />
      ) : (
        <Button
          label="login"
          className="p-button-rounded"
          onClick={() => navigate("/login")}
        />
      )}
    </div>
  ) : null;
};

const mapState = (state) => {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
};

const mapDispatch = (dispatch) => ({
  logout: () => dispatch.auth.logout(),
  getCache: () => dispatch.cache.get(),
  setCache: (data) => dispatch.cache.set(data),
});

export default connect(mapState, mapDispatch)(AppTopbar);
