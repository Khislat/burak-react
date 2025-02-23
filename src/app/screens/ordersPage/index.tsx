import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)), // setPopularDishes commandani xosil qildik
	setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
	setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
	const { setPausedOrders, setProcessOrders, setFinishedOrders } =
		actionDispatch(useDispatch());
	const { orderBuilder, authMember } = useGlobals();
	const history = useHistory();
	const [value, setValue] = useState("1");
	const [orderInquery, serOrderInquery] = useState<OrderInquiry>({
		page: 1,
		limit: 5,
		orderStatus: OrderStatus.PAUSE,
	});

	useEffect(() => {
		const order = new OrderService();

		order
			.getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PAUSE })
			.then((data) => setPausedOrders(data))
			.catch((err) => console.log(err));

		order
			.getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PROCESS })
			.then((data) => setProcessOrders(data))
			.catch((err) => console.log(err));

		order
			.getMyOrders({ ...orderInquery, orderStatus: OrderStatus.FINISH })
			.then((data) => setFinishedOrders(data))
			.catch((err) => console.log(err));
	}, [orderInquery, orderBuilder]);

	/** HANDLEARS **/

	const handleChange = (e: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	if (!authMember) history.push("/");
	return (
		<div className="order-page">
			<Container className="order-container">
				<Stack className="order-left">
					<TabContext value={value}>
						<Box className="order-nav-frame">
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
									className="table-list">
									<Tab label="PAUSED ORDERS" value={"1"} />
									<Tab label="PROCESS ORDERS" value={"2"} />
									<Tab label="FINISHED ORDERS" value={"3"} />
								</Tabs>
							</Box>
						</Box>
						<Stack className="order-main-content">
							<PausedOrders setValue={setValue} />
							<ProcessOrders setValue={setValue} />
							<FinishedOrders />
						</Stack>
					</TabContext>
				</Stack>

				<Stack className="order-right">
					<Box className="order-info-box">
						<Box className="member-box">
							<div className="order-user-img">
								<img
									src={	authMember?.memberImage
										? `${serverApi}/${authMember.memberImage}`
										: "/icons/default-user.svg"}
									className="order-user-avatar"
								/>
								<div className="order-user-icon-box">
									<img
										src={"/icons/user-badge.svg"}
										className="order-user-prof-img"
									/>
								</div>
							</div>
							<span className="order-user-name">{authMember?.memberNick}</span>
							<span className="order-user-prof">{authMember?.memberType}</span>
						</Box>
						<Box className="liner"></Box>
						<Box className="order-user-address">
							<div className="address-loc-icon">
								<img src={"/icons/location.svg"} />
							</div>
							<div className="user-address-txt">{authMember?.memberAddress
										? authMember.memberAddress
										: "Do not exist"}</div>
						</Box>
					</Box>
					<Box className="order-payment-box">
						<Box className="order-card-input">
							<div className="order-card-number">
								<input
									type="text"
									name="cardNumber"
									placeholder="Card number: **** 4090 2002 7495"
									className="card-input-full"
								/>
								<div className="card-half">
									<input
										type="text"
										name="cardPeriod"
										placeholder="07 / 24"
										className="card-input-half"
									/>
									<input
										type="text"
										name="cardCVV"
										placeholder="CVV : 010"
										className="card-input-half"
									/>
								</div>

								<input
									type="text"
									name="cardHolder"
									placeholder="Justin Robertson"
									className="card-input-full"
								/>
							</div>
							<div className="payment-cards">
								<img src={"/icons/western-card.svg"} />
								<img src={"/icons/master-card.svg"} />
								<img src={"/icons/paypal-card.svg"} />
								<img src={"/icons/visa-card.svg"} />
							</div>
						</Box>
					</Box>
				</Stack>
			</Container>
		</div>
	);
}
