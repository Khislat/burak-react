import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { Height } from "@mui/icons-material";

const activeUsers = [
	{ productName: "Martin", memberImage: "/img/martin.webp" },
	{ productName: "Justin", memberImage: "/img/justin.webp" },
	{ productName: "Rose", memberImage: "/img/rose.webp" },
	{ productName: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
	return (
		<div className={"active-users-frame"}>
			<Container>
				<Stack className={"main"}>
					<Box className={"category-title"}>Active Users</Box>
					<Stack className={"cards-frame"}>
						<CssVarsProvider>
							{activeUsers.length !== 0 ? (
								activeUsers.map((user, index) => (
									<Card key={index} variant="outlined" className="card">
										<CardOverflow>
											<AspectRatio ratio="1">
												<img
													src={user.memberImage}
													alt={user.productName}
													style={{ height: "100%" }}
												/>
											</AspectRatio>
										</CardOverflow>
										<CardOverflow>
											<Box className="member-nickname">{user.productName}</Box>
										</CardOverflow>
									</Card>
								))
							) : (
								<Box className="no-data">No Active Users!</Box>
							)}
						</CssVarsProvider>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
