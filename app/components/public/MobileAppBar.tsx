"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "@/app/lib/theme/ColorModeIconDropdown";
import { useState } from "react";
import Link from "next/link";

export default function MobileAppBar({ session }: { session: any }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
      <ColorModeIconDropdown size="medium" />
      <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: "var(--template-frame-height, 0px)",
          },
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <MenuItem>Features</MenuItem>
          <MenuItem>Testimonials</MenuItem>
          <MenuItem>Highlights</MenuItem>
          <MenuItem>Pricing</MenuItem>
          <MenuItem>FAQ</MenuItem>
          <MenuItem>Blog</MenuItem>
          <Divider sx={{ my: 3 }} />
          {session?.user ? (
            <>
              <MenuItem>
                <form
                  action={async () => {
                    "use server";
                    await (await import("@/auth")).signOut({ redirectTo: "/" });
                  }}
                  style={{ width: "100%" }}
                >
                  <Button color="primary" variant="contained" fullWidth>
                    Log out
                  </Button>
                </form>
              </MenuItem>

              <MenuItem>
                <Button
                  LinkComponent={Link}
                  href="/admin"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Admin
                </Button>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Button
                  LinkComponent={Link}
                  href="/sing-up"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Sign up
                </Button>
              </MenuItem>

              <MenuItem>
                <Button
                  LinkComponent={Link}
                  href="/sign-in"
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  Sign in
                </Button>
              </MenuItem>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
