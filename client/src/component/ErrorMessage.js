import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

export default function ErrorMessage({ severity = "info", children }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="outlined" severity={severity}>
        <h1>Error Message</h1>
        <h1>Error Message</h1>
        <h1>Error Message</h1>
        <h1>Error Message</h1>
      </Alert>
    </Stack>
  );
}
