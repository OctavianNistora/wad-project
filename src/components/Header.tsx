import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useAuthState } from "../states/auth/authState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import useRefCallback from "../hooks/useRefCallback";
import { DRAWER_WIDTH } from "./SideNav";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const [ref, setRef] = useRefCallback()

  const [rightWidth, setRightWidth] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    if(ref?.current?.clientWidth) setRightWidth(ref?.current?.clientWidth)
  },[ref])

  if (!user) {
    return null;
  }

  return (
    <Stack pl={`${DRAWER_WIDTH}px`} flex="0 0 auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        px={2}
      >
        <Box width={`${rightWidth}px`} />
        <Typography noWrap variant="h2" align="center" color="cyan">
          Events List
        </Typography>
        <Box ref={setRef}>
          <Box
            onClick={handleClick}
            sx={{
              cursor: "pointer",
            }}
          >
            <Avatar alt={user.displayName || ""} />
          </Box>
          {user?.displayName?.charAt(0).toUpperCase()}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Stack>
              <MenuItem onClick={() => navigate("/profile")}>
                Edit Profile
              </MenuItem>
              <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
            </Stack>
          </Menu>
        </Box>
      </Stack>
      <Divider />
    </Stack>
  );
}
