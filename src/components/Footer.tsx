import React, { useContext } from "react";
import { useWindowSize } from "react-use";
import Facebook from "../assets/icons/facebook.svg";
import Github from "../assets/icons/github.svg";
import Instagram from "../assets/icons/instagram.svg";
import LinkedIn from "../assets/icons/linkedin.svg";
import Twitter from "../assets/icons/twitter.svg";
import styles from "../styles/footer.module.scss";
import { ThemeContext } from "../utils";

export const Footer = () => {
	const { colors } = useContext(ThemeContext);
	const { width } = useWindowSize();

	return (
		<div className="container">
			<div className={styles.getInTouch}>
				<h2>Get in Touch</h2>
				<h4>
					I'm glad that you are interested in what I do. At present, I'm looking
					for{" "}
					<span style={{ color: colors.primary }}>
						full&#8209;time&nbsp;on&#8209;site&nbsp;job
					</span>{" "}
					offers across the globe.
				</h4>
				<h4>If you think I'll be a good fit. Drop me a message.</h4>
				<a href="mailto:contact@gyuapstha.me" target="_blank">
					<button className="app-button" style={{ color: colors.fgColor }}>
						Say Hello!
					</button>
				</a>
			</div>
			{width < 900 && (
				<div>
					<div className={styles.socialWrapper}>
						<div className={styles.sideLine}>
							<div />
						</div>
						<div className={styles.emailLink}>
							<a
								style={{ color: colors.fgColor }}
								href="mailto:yash.gupta.0519@gmail.com"
							>
								yash.gupta.0519@gmail.com
							</a>
						</div>
						<div className={styles.sideLine}>
							<div />
						</div>
					</div>
					<div className={styles.socialWrapper}>
						<div className={styles.sideLine}>
							<div />
						</div>
						<div className={styles.socialLinks}>
							<a
								href="https://facebook.com/gyuapstha"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Facebook
									className={styles.social}
									style={{ fill: colors.fgColor }}
								/>
							</a>
							<a
								href="https://twitter.com/YashGup14686444"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Twitter
									className={styles.social}
									style={{ fill: colors.fgColor }}
								/>
							</a>
							<a
								href="https://www.linkedin.com/in/gyuapstha/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<LinkedIn
									className={styles.social}
									style={{ fill: colors.fgColor }}
								/>
							</a>
							<a
								href="https://instagram.com/__yash.gupta_/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram
									className={styles.social}
									style={{ fill: colors.fgColor }}
								/>
							</a>
							<a
								href="https://github.com/gyash24x7"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github
									className={styles.social}
									style={{ fill: colors.fgColor }}
								/>
							</a>
						</div>
						<div className={styles.sideLine}>
							<div />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
