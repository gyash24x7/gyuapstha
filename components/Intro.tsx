import cx from "classnames";
import { useEffect } from "react";
import Typed from "typed.js";
import styles from "../styles/intro.module.css";

export const Intro = () => {
	useEffect(() => {
		new Typed("#typed", {
			loop: true,
			strings: [
				"I am Frontend Developer.",
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
					I am a Software Engineer based in Kanpur, India specializing in
					building remarkable websites, applications and everything in between.
				</h4>
			</div>
		</div>
	);
};
