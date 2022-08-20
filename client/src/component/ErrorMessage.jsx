import * as React from "react";
import Alert from "@mui/material/Alert";

export default function ErrorMessage({ severity = "info", children }) {
  return (
    <Alert sx={{ margin: "100px" }} variant="outlined" severity={severity}>
      <h1>ERROR 404 ROUTES NOT FOUND</h1>
    </Alert>
  );
}
