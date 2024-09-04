import React from "react";
import Sidebar from "./Sidebar";

const UserLayout = ({ children }) => {
  return (
    <div>
      <div className="mt-2 mt-4 py-4">
        <h2 className="text-center fw-bolder ">User Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <p>
              <Sidebar />
            </p>
          </div>
          <div className="col-12 col-lg-8 user-dahboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
