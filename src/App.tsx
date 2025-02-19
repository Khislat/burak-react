import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./app/screens/homePage";
import ProductsPage from "./app/screens/productsPage";
import OrdersPage from "./app/screens/ordersPage";
import UserPage from "./app/screens/userPage";
import HomeNavbar from "./app/components/headers/HomeNavbar";
import OtherNavbar from "./app/components/headers/OtherNavbar";
import Footer from "./app/components/footer";
import HelpPage from "./app/screens/helpPage";
import Test from "./app/screens/Test";
import useBasket from "./app/hooks/useBasket";
import AuthenticationModal from "./app/components/auth";
import "./css/app.css";
import "./css/navbar.css";
import "./css/footer.css";
import { T } from "./lib/types/common";
import { sweetErrorHandling, sweetTopSuccessAlert } from "./lib/sweetAlert";
import { Message } from "@mui/icons-material";
import { Messages } from "./lib/config";
import MemberService from "./app/services/MemberService";
import { useGlobals } from "./app/hooks/useGlobals";

function App() {
	const location = useLocation();
	const { setAuthMember } = useGlobals();
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
	const [signupOpen, setSignupOpen] = useState<boolean>(false);
	const [loginOpen, setLoginOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	/** HANDLERS **/

	const handleSignupClose = () => setSignupOpen(false);
	const handleLoginClose = () => setLoginOpen(false);

	const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseLogout = () => setAnchorEl(null);
	const handleLogoutRequest = async () => {
		try {
			const member = new MemberService();
			await member.logout();

			await sweetTopSuccessAlert("success", 700);
			setAuthMember(null);
		} catch (err) {
			console.log(err);
			sweetErrorHandling(Messages.error1);
		}
	};

	return (
		<>
			{location.pathname === "/" ? (
				<HomeNavbar
					cartItems={cartItems}
					onAdd={onAdd}
					onRemove={onRemove}
					onDelete={onDelete}
					onDeleteAll={onDeleteAll}
					setSignupOpen={setSignupOpen}
					setLoginOpen={setLoginOpen}
					anchorEl={anchorEl}
					handleLogoutClick={handleLogoutClick}
					handleCloseLogout={handleCloseLogout}
					handleLogoutRequest={handleLogoutRequest}
				/>
			) : (
				<OtherNavbar
					cartItems={cartItems}
					onAdd={onAdd}
					onRemove={onRemove}
					onDelete={onDelete}
					onDeleteAll={onDeleteAll}
					setSignupOpen={setSignupOpen}
					setLoginOpen={setLoginOpen}
					anchorEl={anchorEl}
					handleLogoutClick={handleLogoutClick}
					handleCloseLogout={handleCloseLogout}
					handleLogoutRequest={handleLogoutRequest}
				/>
			)}
			<Switch>
				<Route path="/products">
					<ProductsPage onAdd={onAdd} />
				</Route>
				<Route path="/orders">
					<OrdersPage />
				</Route>
				<Route path="/member-page">
					<UserPage />
				</Route>
				<Route path="/help">
					<HelpPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
			<Footer />

			<AuthenticationModal
				signupOpen={signupOpen}
				loginOpen={loginOpen}
				handleLoginClose={handleLoginClose}
				handleSignupClose={handleSignupClose}
			/>
		</>
	);
}

export default App;
