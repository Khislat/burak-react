import React from "react";
import moment from "moment";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

export default function PausedOrders() {
	return (
		<TabPanel value={"1"}>
			<Stack>
				{[1, 2].map((ele, index) => {
					return (
						<Box key={index} className="order-main-box">
							<Box className="order-box-scroll">
								{[1, 2, 3].map((ele2, index2) => {
									return (
										<Box key={index2} className="orders-name-price">
											<img
												src={"/img/lavash.webp"}
												className="order-dish-img"
											/>
											<p className="title-dish">Lavash</p>
											<Box className="price-box">
												<p>$10</p>
												<img src={"/icons/close.svg"} />
												<p>2</p>
												<img src={"/icons/pause.svg"} />
												<p style={{ marginLeft: "15px" }}>$20</p>
											</Box>
										</Box>
									);
								})}
							</Box>

							<Box className="total-price-box">
								<Box className="box-total">
									<p>Product price</p>
									<p>$60</p>
									<img src={"/icons/plus.svg"} style={{ marginLeft: "0px" }} />
									<p>Delivery cost</p>
									<p>$5</p>
									<img
										src={"/icons/pause.svg"}
										style={{ marginLeft: "0px" }}
									/>
									<p>Total</p>
									<p>$65</p>
								</Box>
								<Button variant="contained" className="cencel-button">
									CANCEL
								</Button>
								<Button variant="contained" className="payment-button">
									PAYMENT
								</Button>
							</Box>
						</Box>
					);
				})}
				{false && (
					<Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
						<img
							src={"/icons/noimage-list.svg"}
							style={{ width: 300, height: 300 }}
						/>
					</Box>
				)}
			</Stack>
		</TabPanel>
	);
}
