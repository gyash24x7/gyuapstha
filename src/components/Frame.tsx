import React, { Fragment } from "react";
import Logo from "../assets/logo.svg";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import "../styles/frame.css";
import { useTheme } from "../theme";

export const Frame = () => {
	return (
		<Fragment>
			<TopNav />
			<LeftNav />
			<RightNav />
		</Fragment>
	);
};

const TopNav = () => {
	const [theme, setTheme] = useTheme();

	return (
		<div className="top-nav">
			<img src={Logo} alt="" className="logo" />
			{theme === "dark" ? (
				<img
					src={Sun}
					alt=""
					className="icon dark-mode-toggle"
					onClick={() => setTheme("light")}
				/>
			) : (
				<img
					src={Moon}
					alt=""
					className="icon dark-mode-toggle"
					onClick={() => setTheme("dark")}
				/>
			)}
		</div>
	);
};

const LeftNav = () => {
	return <div className="left-nav"></div>;
};

const RightNav = () => {
	return <div className="right-nav"></div>;
};
