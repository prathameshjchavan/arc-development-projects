import React from "react";
import { styled } from "@mui/material/styles";

export default function Footer(props) {
	const Footer = styled("footer")(({ theme }) => ({
		backgroundColor: theme.palette.common.blue,
		width: "100%",
		zIndex: 1302,
		position: "relative",
	}));

	const Image = styled("img")(({ theme }) => ({
		width: "25em",
		verticalAlign: "bottom",
		[theme.breakpoints.down("md")]: {
			width: "21em",
		},
		[theme.breakpoints.down("xs")]: {
			width: "15em",
		},
	}));

	return (
		<Footer>
			<Image alt="black decorative slash" src="/assets/footerAdornment.svg" />
		</Footer>
	);
}
