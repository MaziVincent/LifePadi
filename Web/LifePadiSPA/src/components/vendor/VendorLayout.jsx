import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Box,
	CssBaseline,
	Divider,
	Button,
	useTheme,
	useMediaQuery,
	Tooltip,
	Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/images/Logo(dark).svg";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useLogout from "../../hooks/useLogout";

const drawerWidth = 220;

const navItems = [
	{ text: "Dashboard", icon: <DashboardIcon />, path: "/vendor" },
	{ text: "Products", icon: <StoreIcon />, path: "/vendor/products" },
];

const VendorLayout = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [mode, setMode] = useState(
		() => localStorage.getItem("lp-vendor-theme") || "light"
	);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const logout = useLogout();
	const location = useLocation();

	useEffect(() => {
		localStorage.setItem("lp-vendor-theme", mode);
		const root = document.documentElement;
		if (mode === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
	}, [mode]);

	const toggleMode = () =>
		setMode((prev) => (prev === "light" ? "dark" : "light"));

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
	const handleLogout = async () => {
		await logout();
		// Optionally redirect
	};

	const drawer = (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				bgcolor: mode === "dark" ? "rgba(24,24,24,.9)" : "background.paper",
				backdropFilter: "blur(6px)",
			}}>
			<Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
				<img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
				<Typography
					variant="h6"
					fontWeight={700}
					color={mode === "dark" ? "secondary" : "primary"}>
					Vendor
				</Typography>
			</Box>
			<Divider />
			<List>
				{navItems.map((item) => {
					const active = location.pathname === item.path;
					return (
						<ListItem
							button
							key={item.text}
							component={Link}
							to={item.path}
							onClick={() => setMobileOpen(false)}
							sx={{
								borderRadius: 2,
								mb: 0.5,
								color: active
									? mode === "dark"
										? "secondary.main"
										: "primary.main"
									: "text.secondary",
								bgcolor: active
									? mode === "dark"
										? "darkHover"
										: "grey.100"
									: "transparent",
								"&:hover": {
									bgcolor: active
										? mode === "dark"
											? "darkHover"
											: "grey.200"
										: mode === "dark"
										? "darkHover"
										: "grey.100",
								},
							}}>
							<ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{ fontWeight: active ? 600 : 400 }}
								primary={item.text}
							/>
						</ListItem>
					);
				})}
			</List>
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}>
				<LightModeIcon
					fontSize="small"
					color={mode === "light" ? "warning" : "disabled"}
				/>
				<Switch size="small" checked={mode === "dark"} onChange={toggleMode} />
				<DarkModeIcon
					fontSize="small"
					color={mode === "dark" ? "secondary" : "disabled"}
				/>
			</Box>
			<Divider />
			<Button
				startIcon={<LogoutIcon />}
				color="error"
				sx={{ m: 2 }}
				onClick={handleLogout}>
				Logout
			</Button>
		</Box>
	);

	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100vh",
				bgcolor: mode === "dark" ? "#121212" : "grey.50",
				transition: "background-color .3s",
			}}>
			<CssBaseline />
			<AppBar
				position="fixed"
				color={mode === "dark" ? "default" : "inherit"}
				elevation={0}
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					backdropFilter: "blur(8px)",
					bgcolor:
						mode === "dark" ? "rgba(33,33,33,.85)" : "rgba(255,255,255,.85)",
					borderBottom: (theme) =>
						`1px solid ${mode === "dark" ? "#333" : "#e5e7eb"}`,
				}}>
				<Toolbar>
					{isMobile && (
						<IconButton
							color="inherit"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
					)}
					<img
						src={logo}
						alt="Logo"
						style={{ width: 36, height: 36, marginRight: 12 }}
					/>
					<Typography
						variant="h6"
						fontWeight={700}
						sx={{
							flexGrow: 1,
							color: mode === "dark" ? "secondary.main" : "primary.main",
						}}>
						Vendor Dashboard
					</Typography>
					<Tooltip
						title={
							mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
						}>
						<IconButton
							onClick={toggleMode}
							color="inherit"
							size="small"
							sx={{ ml: 1 }}>
							{mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
				<Drawer
					variant={isMobile ? "temporary" : "permanent"}
					open={isMobile ? mobileOpen : true}
					onClose={handleDrawerToggle}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: "block", md: "block" },
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: { xs: 2, md: 4 },
					mt: 8,
					minHeight: "100vh",
					bgcolor: mode === "dark" ? "#181818" : "background.default",
					transition: "background-color .3s",
				}}>
				<Outlet />
				<Box
					sx={{
						mt: 8,
						textAlign: "center",
						color: mode === "dark" ? "darkSecondaryText" : "text.secondary",
						fontSize: 14,
					}}>
					&copy; {new Date().getFullYear()} LifePadi. All rights reserved.
				</Box>
			</Box>
		</Box>
	);
};

export default VendorLayout;
