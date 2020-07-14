import cx from "classnames";
import { useContext, useEffect } from "react";
import Typed from "typed.js";
import styles from "../styles/intro.module.css";
import { ThemeContext } from "../utils";

export const Intro = () => {
	const { colors } = useContext(ThemeContext);

	useEffect(() => {
		new Typed("#typed", {
			loop: true,
			strings: [
				"I am a Frontend Developer.",
				"I work on the Backend too.",
				"I build things for the web.",
				"And for Mobile as well."
			],
			typeSpeed: 50,
			backSpeed: 60
		});
	}, []);

	return (
		<div className={cx(styles.introContainer, "container")}>
			<div>
				<h4>Hi, my name is</h4>
				<h1>Yash Gupta.</h1>
				<div>
					<span id="typed"></span>
				</div>
				<h4 className={styles.intro}>
					An IIT Madras graduate, based in Kanpur, India specializing in
					building remarkable websites, applications and everything in between.
				</h4>
				<a href="mailto:contact@gyuapstha.me" target="_blank">
					<button className="app-button" style={{ color: colors.fgColor }}>
						Get In Touch
					</button>
				</a>
			</div>
		</div>
	);
};