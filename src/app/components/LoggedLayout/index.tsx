"use client";
import * as React from "react";
import Image from "next/image";
import {
  AppBar,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Drawer,
  Collapse,
  Icon,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { theme } from "@/app/theme";
import styles from "./styles.module.css";

import menuItems from "./menuItems.json";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { logOut } from "../../../store/features/auth-slice";

const drawerWidth = 280;

interface Props {
  children: React.ReactNode;
}

export default function LoggedLayout(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const router = useRouter();

  const drawer = (
    <Box display="flex" flexDirection="column" p={1}>
      <Toolbar sx={{ p: "1rem" }}>
        <Image
          src="https://laiketurismo.com.br/wp-content/uploads/2022/03/logo-laike-turismo.png"
          alt="Laiketurismo"
          width={150}
          height={100}
        />
      </Toolbar>
      <Divider className={styles.menuDivider} />
      <List>
        {menuItems.map(
          (text, index) =>
            user.roles.some((role) => text.roles.includes(role)) && (
              <>
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      text.nested ? setOpen(!open) : router.push(text.url);
                    }}
                  >
                    <ListItemIcon className={styles.menuText}>
                      <Icon className={styles.menuText} fontSize="medium">
                        {text.icon}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={text.title}
                      className={styles.menuText}
                    />
                  </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List>
                    {text.children.map((child, idx) => (
                      <ListItem
                        key={idx}
                        disablePadding
                        className={styles.menuText}
                      >
                        <ListItemButton
                          component="a"
                          href={child.url}
                          className={styles.menuText}
                        >
                          <ListItemIcon className={styles.menuText}>
                            <Icon className={styles.menuText} fontSize="medium">
                              {child.icon}
                            </Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary={child.title}
                            className={styles.menuText}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )
        )}
      </List>
      <Button
        sx={{ mt: 5, color: "#fff", fontWeight: 700, fontSize: "1rem" }}
        onClick={() => dispatch(logOut())}
      >
        <LogoutIcon sx={{ mr: 2 }} /> Sair
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: theme.palette.background.default,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: "space-between", sm: "flex-end" },
            width: { xs: "100vw", sm: "100%" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: theme.palette.grey[900],
            }}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="https://static.tursites.com.br/data/design/user/vendas.laiketurismo.com.br/image/logo.png"
            alt="Laiketurismo"
            width={74}
            height={50}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100vh",
              background: theme.palette.primary.main,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100vh",
              background: theme.palette.primary.main,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
