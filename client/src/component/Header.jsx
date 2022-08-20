import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountMenu from "./AccountMenu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  grow: {
    [theme.breakpoints.up("sm")]: {
      flexGrow: 1,
    },
  },
  gridVersions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-around",
    },
  },
  desktopVersion: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexGrow: 3,
    },
  },
  sectionMobile: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem>
          <Typography variant="subtitle2">Home</Typography>
        </MenuItem>
      </Link>
      <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem>
          <Typography variant="subtitle2">About</Typography>
        </MenuItem>
      </Link>
      <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem>
          <Typography variant="subtitle2">Contact</Typography>
        </MenuItem>
      </Link>

      {userInfo ? (
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              sx={{ backgroundColor: "red", fontWeight: "bold" }}
            >
              <Logout sx={{ color: "#ffff", fontWeight: "bold", p: "3px" }} />
              Login
            </Button>
          </MenuItem>
        </Link>
      ) : (
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <Typography style={{ color: "#fff" }} variant="subtitle2" noWrap>
              <AccountMenu />
            </Typography>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.gridVersions}>
          <Typography variant="h6" className={classes.grow}>
            AUTHENTICATION
          </Typography>
          <div className={classes.desktopVersion}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="subtitle2">Home</Typography>
            </Link>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="subtitle2">About</Typography>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="subtitle2">Contact</Typography>
            </Link>

            {userInfo ? (
              <Typography variant="subtitle2">
                <AccountMenu />
              </Typography>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  sx={{ backgroundColor: "red", fontWeight: "bold", m: "5px" }}
                >
                  <Login
                    sx={{ color: "#ffff", fontWeight: "bold", p: "3px" }}
                  />
                  Login
                </Button>
              </Link>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
