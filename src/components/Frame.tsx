import React, { Fragment } from "react";
import Facebook from "../assets/facebook.svg";
import Github from "../assets/github.svg";
import Instagram from "../assets/instagram.svg";
import LinkedIn from "../assets/linkedin.svg";
import Logo from "../assets/logo.svg";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import Twitter from "../assets/twitter.svg";
import "../styles/frame.css";
import { getThemeStyles, useTheme } from "../theme";

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
	const { color: fill } = getThemeStyles(theme);

	return (
		<div className="top-nav">
			<Logo style={{ fill }} />
			{theme === "dark" ? (
				<Sun
					style={{ fill }}
					onClick={() => setTheme("light")}
					className="dark-mode-toggle icon"
				/>
			) : (
				<Moon
					style={{ fill }}
					onClick={() => setTheme("dark")}
					className="dark-mode-toggle icon"
				/>
			)}
		</div>
	);
};

const LeftNav = () => {
	const [theme] = useTheme();
	const { color: fill } = getThemeStyles(theme);
	return (
		<div className="left-nav">
			<a
				href="https://twitter.com/YashGup14686444"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Twitter className="icon social" style={{ fill }} />
			</a>
			<a
				href="https://facebook.com/gyuapstha"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Facebook className="icon social" style={{ fill }} />
			</a>
			<a
				href="https://www.linkedin.com/in/gyuapstha/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<LinkedIn className="icon social" style={{ fill }} />
			</a>
			<a
				href="https://instagram.com/__yash.gupta_/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Instagram className="icon social" style={{ fill }} />
			</a>
			<a
				href="https://github.com/gyash24x7"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Github className="icon social" style={{ fill }} />
			</a>
		</div>
	);
};

const RightNav = () => {
	const [theme] = useTheme();
	const { color } = getThemeStyles(theme);
	return (
		<div className="right-nav">
			<a style={{ color }} href="mailto://yash.gupta.0519@gmail.com">
				yash.gupta.0519@gmail.com
			</a>
		</div>
	);
};
