import React, { Fragment } from "react";
import LayoutDashboard from "layout/LayoutDashboard";
import ListLogger from "modules/logger/ListLogger";

const AdminDashBoardPage = () => {
  return (
    <div>
      <Fragment>
        <div>
          <ListLogger></ListLogger>
        </div>
      </Fragment>
    </div>
  );
};

export default AdminDashBoardPage;
