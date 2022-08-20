import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Link, useHistory } from "react-router-dom";
import Typograhy from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Admin from "./Admin";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  const AdminHandler = () => {
    history.push("/admin");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
        {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt="User" src={userInfo?.pic}></Avatar>

            {/* {userInfo.first_name} */}
            <Typograhy color="#fff" sx={{ textTransform: "uppercase", m: 1 }}>
              {userInfo?.first_name}
            </Typograhy>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem>
            <Avatar alt="User" src={userInfo?.pic} /> My account
          </MenuItem>
        </Link>
        <Divider />

        {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}> */}
        {userInfo && userInfo.isAdmin ? (
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              onClick={AdminHandler}
              style={{ color: "white", backgroundColor: "#3F51B5" }}
            >
              <ListItemIcon sx={{ m: "auto", color: "white" }}>
                Admin
              </ListItemIcon>
            </MenuItem>
          </Link>
        ) : null}
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {/* </Link> */}
      </Menu>
    </React.Fragment>
  );
}
