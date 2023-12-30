// Import statements
"use client";
import * as React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ThemeRegistry from "@/configs/ThemeRegistry";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Footer from "@/components/Footer";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./style.css";

// LINKS and linkStyle definitions

const LINKS = [
  { text: "PROFIL DESA", href: "/profil" },
  { text: "STATISTIK PENDUDUK", href: "/statistik" },
  { text: "POTENSI DESA", href: "/potensi" },
  { text: "ARTIKEL", href: "/artikel" },
  { text: "GALERI", href: "/galeri" },
];

const linkStyle = {
  gap: "1em",
  fontWeight: "550",
  color: "#17437A",
  cursor: "pointer",
  marginRight: "26px",
  marginLeft: "28px",
  alignItems: "center",
  display: "flex",
  padding: "0px 10px",
  height: "72px",
  position: "relative",
  textDecoration: "none",
};
const queryClient = new QueryClient();

// RootLayout component definition

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>(""); // State to track the active tab

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleTabClick = (text: string) => {
    setActiveTab(text);
  };

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeRegistry>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar
                sx={{ backgroundColor: "background.paper", justifyContent: "space-between" }}
              >
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{ fontWeight: "bold", color: "#17437A", zIndex: 2000 }}
                >
                  DERA
                </Typography>
                {isMobile ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    sx={{ color: "#17437A", zIndex: 2000 }}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <div className="links-container">
                    {LINKS.map((link, index) => (
                      <Link legacyBehavior href={link.href} key={link.text} passHref>
                        <Typography
                          variant="inherit"
                          noWrap
                          color="black"
                          sx={{
                            ...linkStyle,
                            borderBottom: activeTab === link.text ? "2px solid #17437A" : linkStyle.borderBottom,
                            marginRight: index === LINKS.length - 1 ? "0" : "16px",
                          }}
                          onClick={() => handleTabClick(link.text)}
                        >
                          {link.text}
                        </Typography>
                      </Link>
                    ))}
                  </div>
                )}
              </Toolbar>
            </AppBar>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerClose}
              sx={{ zIndex: 2001 }}
            >
              <List>
                {LINKS.map((link) => (
                  <ListItem
                    button
                    key={link.text}
                    onClick={handleDrawerClose}
                    sx={{ color: "#17437A" }}
                  >
                    <Link legacyBehavior href={link.href} passHref>
                      <Typography
                        variant="inherit"
                        noWrap
                        color="black"
                        sx={linkStyle}
                      >
                        {link.text}
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{ marginTop: isMobile ? "56px" : "0" }}
            >
              {children}
            </Box>
            <Footer />
          </ThemeRegistry>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
