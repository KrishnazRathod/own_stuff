import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";

const Header = styled(AppBar)`
  z-index: 1201;
  background-color: #3f51b5; /* Solid color background */
  height: 70px;
`;

const Heading = styled(Typography)`
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  margin-left: 20px;
  flex-grow: 1;
  cursor: pointer;
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "14ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const HeaderBar = ({ open, handleDrawer }) => {
  const logo = "https://via.placeholder.com/35/FFFFFF/000000?text=OS"; // Simple placeholder logo

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Header open={open}>
      <Toolbar>
        <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: "20px", color: "#fff" }}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="logo" style={{ width: 35, cursor: "pointer" }} />
        <Heading>Own Stuff</Heading>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <IconButton sx={{ color: "#ffffff" }}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton onClick={handleMenu} sx={{ color: "#ffffff" }} edge="end">
          <Avatar alt="User Name" src="https://via.placeholder.com/150" />{" "}
          {/* Simple Avatar */}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
