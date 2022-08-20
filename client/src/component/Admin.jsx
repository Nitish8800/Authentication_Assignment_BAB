import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/userActions";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "User ID", minWidth: 80, flex: 0.4 },

  {
    field: "email",
    headerName: "Email",
    minWidth: 130,
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    flex: 0.4,
  },

  {
    field: "isAdmin" == true ? "Admin" : "User",
    headerName: "Role",
    minWidth: 150,
    flex: 0.3,
  },
];

const Admin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.allUsers);

  //   console.log(user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const rows = [];

  user &&
    user.forEach((item) => {
      rows.push({
        id: item._id,
        isAdmin: item.isAdmin,
        email: item.email,
        name: item.name,
        phoneNumber: item.phoneNumber,
      });
    });

  console.log(rows);

  return (
    <>
      <div style={{ margin: "100px" }}>
        <h1>Admin Can See All User</h1>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default Admin;
