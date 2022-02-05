import React, { useEffect, useState } from "react";
import "../style.scss";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from "@material-ui/core";
import doubleQuotes from "../../../assets/images/doubleQuotes.png";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: "auto",
		width: "auto",
		backgroundColor: "#f9d9eb",
		padding: "1em",
	},
	control: {
		padding: theme.spacing(2),
	},
	close: {
		padding: theme.spacing(2),
	},
}));

const CandidatesModal = (props) => {
	const classes = useStyles();

	return (
		<div>
			<div className="main-container">
				<Dialog
					open={props.status}
					onClose={props.handleOnClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					maxWidth="md">
					<DialogTitle id="alert-dialog-title">
						<Grid item xs={12}>
							<Grid
								container
								className={classes.close}
								alignItems="flex-end"
								justify="flex-end">
								<i
									className="fa fa-close"
									onClick={props.handleOnClose}></i>
							</Grid>
						</Grid>
						<Grid
							md={12}
							container
							justify="center"
							alignItems="center">
							<Grid
								item
								justify="center"
								md={4}
								className={"CandidateName"}>
								<b>Emily Horton</b>
								<svg
									width="300"
									height="3"
									viewBox="0 0 397 3"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<line
										x1="0.351318"
										y1="1.69629"
										x2="396.152"
										y2="1.69629"
										stroke="#E11088"
										stroke-width="2"
									/>
								</svg>
								UX Designer
							</Grid>
							<Grid
								item
								justify="center"
								className={"PlayProfileVideo"}
								alignItems="center"
								md={2}>
								<svg
									width="90"
									height="98"
									viewBox="0 0 142 149"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M131.83 43.915C137.672 54.833 140.562 67.1196 140.209 79.532C139.855 91.9443 136.271 104.042 129.818 114.601C123.364 125.16 114.272 133.805 103.46 139.663C92.6475 145.521 80.4993 148.382 68.2441 147.959C55.989 147.535 44.0618 143.842 33.6691 137.251C23.2764 130.661 14.7871 121.407 9.0599 110.427C3.33275 99.4475 0.570991 87.1305 1.05405 74.7227C1.53711 62.3148 5.24785 50.2563 11.8108 39.7671"
										stroke="#E11088"
										stroke-width="2"
									/>
									<path
										d="M98 79.322L57.5 102.984L57.5 55.6605L98 79.322Z"
										fill="#E11088"
									/>
									<path
										d="M19.8271 25.0696L22.3283 28.2795L24.3596 26.6967C24.9096 26.2682 25.2145 25.7967 25.2742 25.2822C25.3385 24.7641 25.1833 24.2647 24.8088 23.7841C24.4307 23.2988 23.9808 23.0216 23.4591 22.9527C22.9374 22.8838 22.4039 23.0618 21.8585 23.4868L19.8271 25.0696ZM25.305 27.91L23.2736 29.4928L25.9584 32.9385L24.4401 34.1215L17.3635 25.0393L20.9131 22.2735C21.9115 21.4956 22.8948 21.1417 23.863 21.2118C24.8323 21.2736 25.6519 21.7344 26.3217 22.5941C26.9916 23.4538 27.2403 24.3593 27.068 25.3107C26.8956 26.2621 26.308 27.1285 25.305 27.91Z"
										fill="#E11088"
									/>
									<path
										d="M30.0775 16.302L34.9401 25.0122L39.5599 22.4331L40.3097 23.7761L34.0092 27.2934L28.3968 17.2402L30.0775 16.302Z"
										fill="#E11088"
									/>
									<path
										d="M49.8031 20.156L48.0081 17.9545L43.7826 19.5277L43.8644 22.367L42.0359 23.0478L41.9886 10.7796L43.6936 10.1448L51.6316 19.4752L49.8031 20.156ZM43.6127 12.6228L43.7404 17.8272L46.9362 16.6373L43.6539 12.6074L43.6127 12.6228Z"
										fill="#E11088"
									/>
									<path
										d="M58.8335 18.0992L56.9532 18.4676L56.1556 14.3966L50.884 7.92422L52.9885 7.51188L56.7819 12.4737L58.4309 6.44552L60.5354 6.03317L58.0561 14.1317L58.8335 18.0992Z"
										fill="#E11088"
									/>
									<path
										d="M74.8576 5.62701L76.9875 14.2998L77.1321 15.1119L77.1847 15.1157L77.4333 14.3492L80.7839 6.05018L82.8353 6.19666L77.9124 17.3881L76.089 17.2579L72.8149 5.48116L74.8576 5.62701Z"
										fill="#E11088"
									/>
									<path
										d="M89.2056 7.56098L86.8769 18.8367L85.0005 18.4491L87.3292 7.17345L89.2056 7.56098Z"
										fill="#E11088"
									/>
									<path
										d="M98.6442 11.9017L96.9847 11.322L94.2024 19.2876L95.8619 19.8672C96.7525 20.1783 97.5582 20.137 98.2791 19.7434C99.002 19.3442 99.5286 18.6716 99.859 17.7257L100.442 16.0579C100.77 15.1176 100.775 14.2689 100.456 13.512C100.139 12.7495 99.5348 12.2128 98.6442 11.9017ZM95.4045 21.3367L91.878 20.1049L95.6748 9.23526L99.2012 10.467C100.584 10.9501 101.557 11.771 102.121 12.9298C102.684 14.0887 102.728 15.3485 102.253 16.7092L101.676 18.3604C101.201 19.7212 100.382 20.6796 99.2196 21.2356C98.0591 21.786 96.7874 21.8197 95.4045 21.3367Z"
										fill="#E11088"
									/>
									<path
										d="M112.104 21.8038L111.375 23.1581L106.941 20.7707L105.212 23.9823L110.358 26.753L109.629 28.1073L102.788 24.4241L108.246 14.2864L115.041 17.9446L114.311 19.2988L109.212 16.5531L107.67 19.4164L112.104 21.8038Z"
										fill="#E11088"
									/>
									<path
										d="M120.69 30.5486L121.968 28.892C122.565 28.1171 122.842 27.3315 122.797 26.5351C122.761 25.7377 122.404 25.0778 121.727 24.5554C121.054 24.0367 120.336 23.8683 119.575 24.0504C118.816 24.2278 118.138 24.7039 117.541 25.4789L116.264 27.1354C115.663 27.915 115.369 28.6986 115.383 29.4864C115.401 30.2695 115.749 30.9223 116.426 31.4446C117.108 31.9705 117.837 32.1478 118.613 31.9765C119.393 31.8088 120.086 31.3328 120.69 30.5486ZM123.474 30.0759L122.208 31.7185C121.338 32.8461 120.273 33.504 119.01 33.6923C117.751 33.876 116.57 33.542 115.465 32.6905C114.366 31.8426 113.751 30.7919 113.623 29.5385C113.502 28.2841 113.877 27.0931 114.746 25.9655L116.013 24.3228C116.879 23.1999 117.933 22.5371 119.177 22.3346C120.426 22.1355 121.593 22.4546 122.679 23.2918C123.412 23.8571 123.937 24.5286 124.255 25.3064C124.578 26.0877 124.669 26.8947 124.531 27.7273C124.395 28.5552 124.043 29.3381 123.474 30.0759Z"
										fill="#E11088"
									/>
								</svg>
							</Grid>
							<Grid
								item
								justify="center"
								md={4}
								className={"CandidateNameDetail"}>
								Seattle, Washington
								<svg
									width="300"
									height="3"
									viewBox="0 0 397 3"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<line
										x1="0.351318"
										y1="1.69629"
										x2="396.152"
										y2="1.69629"
										stroke="#E11088"
										stroke-width="2"
									/>
								</svg>
								U.S Citizen
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid
								container
								className={classes.close}
								alignItems="flex-end"
								justify="flex-end"></Grid>
						</Grid>
					</DialogTitle>
					<DialogContent>
						<Grid container alignItems="center" justify="center">
							<Grid item xs={3} className={"doubleQuotes"}>
								<img src={doubleQuotes} height={"20px"} />
							</Grid>
						</Grid>
						<Grid container alignItems="center" justify="center">
							<Grid item xs={6}>
								<p style={{ color: "black", fontSize: "12px" }}>
									Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. standard
									dummy text ever since the 1500s, when an
									unknown printer took a galley of type and
									scrambled it to make a type specimen book.
								</p>
							</Grid>
						</Grid>
						<Grid
							container
							alignItems="center"
							justify="center"
							style={{ marginTop: 30 }}>
							<Grid item xs={3}>
								<b style={{ color: "#ff66a7", fontSize: "13px" }}>
									Professional Passions
								</b>
							</Grid>
						</Grid>
						<Grid
							item
							xs={10}
							md={12}
							lg={12}
							alignItems="center"
							justify="center"
							style={{ textAlign: "center" }}>
							<Grid
								container
								alignItems="center"
								justify="center"
								spacing={3}
								style={{ marginTop: 15 }}>
								<Grid item md={4}>
									<Paper className={classes.paper}>
										<b
											style={{
												textAlign: "center",
												fontSize: "10px",
											}}>
											Earlier Years
										</b>{" "}
										<br />
										<p
											style={{
												marginTop: 15,
												fontSize: "11px",
											}}>
											Lorem Ipsum is simply dummy text of
											the printing and typesetting
											industry. Lorem Ipsum has been the
											industry's standard dummy text ever
											since the 1500s. Lorem Ipsum has
											been the industry's standard dummy
											text ever since the 1500s. Lorem
											Ipsum has been the industry's
											standard dummy text ever since{" "}
										</p>
									</Paper>
								</Grid>
								<Grid item md={4}>
									<Paper className={classes.paper}>
										<b
											style={{
												textAlign: "center",
												fontSize: "10px",
											}}>
											Mid Journey
										</b>{" "}
										<br />
										<p
											style={{
												marginTop: 15,
												fontSize: "11px",
											}}>
											Lorem Ipsum is simply dummy text of
											the printing and typesetting
											industry. Lorem Ipsum has been the
											industry's standard dummy text ever
											since the 1500s. Lorem Ipsum has
											been the industry's standard dummy
											text ever since the 1500s. Lorem
											Ipsum has been the industry's
											standard dummy text ever since{" "}
										</p>
									</Paper>
								</Grid>
								<Grid item md={4}>
									<Paper className={classes.paper}>
										<b
											style={{
												textAlign: "center",
												fontSize: "10px",
											}}>
											Recent Career
										</b>{" "}
										<br />
										<p
											style={{
												marginTop: 15,
												fontSize: "11px",
											}}>
											Lorem Ipsum is simply dummy text of
											the printing and typesetting
											industry. Lorem Ipsum has been the
											industry's standard dummy text ever
											since the 1500s. Lorem Ipsum has
											been the industry's standard dummy
											text ever since the 1500s. Lorem
											Ipsum has been the industry's
											standard dummy text ever since{" "}
										</p>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							container
							alignItems="center"
							justify="center"
							style={{ marginTop: 30 }}>
							<Grid item xs={3}>
								<b style={{ color: "#ff66a7", fontSize: "13px" }}>
									Work Experience
								</b>
							</Grid>
						</Grid>
						<Grid
							container
							alignItems="center"
							justify="center"
							style={{ marginTop: 15 }}>
							<Grid item xs={3}>
								<b style={{ fontSize: "13px" }}>Job Title</b>
							</Grid>
						</Grid>
						<Grid container alignItems="center" justify="center">
							<Grid
								item
								xs={8}
								style={{
									marginTop: 5,
									fontSize: "11px",
									padding: "1em",
								}}>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry text of the printing
								and typesetting industry. when an unknown
								printer took a galley of type and scrambled it
								to make a type specimen book.
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions></DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default CandidatesModal;
