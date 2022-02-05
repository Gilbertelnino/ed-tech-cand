import React from "react";
import { ReactComponent as EnableCameraGraphic } from "../../../assets/svg/video-studio-enable-camera.svg";
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";


const PromptEnableCameraModal = (props) => {

	return (
		<Modal
			visible={props.status}
			size="large"
			className="enable-device-modal"
			closeButton={true}
			onClose={() => props.handleOnClose()}
		>
			<Grid item xs={12} className="enable-device-grid">
				<div className="enable-device-svg">
					<EnableCameraGraphic />
				</div>
				<Typography
					variant="h3"
					className="enable-device-modal-title"
				>
					<b>Ruh-roh, enable camera device</b>
				</Typography>
				<Typography
					variant="body1"
					className="enable-device-modal-text"
				>
					You have not granted permission to use your camera. Use the camera button in the browser’s address bar to fix this.  
				</Typography>
			</Grid>
			<Grid
				item
				spacing={2}
				xs={12}
				className="text-center action-button-wrapper enable-device-btn-grid"
			>
				<Button
					className="enable-device-modal-btn btn primary-btn"
					onClick={(e) => props.handleOnClose(e)}
				>
					Ok
				</Button>
			</Grid>
		</Modal>
	)
}

export default PromptEnableCameraModal;