import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button'
import { Grid, Typography, FormControl, Slider, Checkbox, FormControlLabel } from '@material-ui/core/';
import SelectNew from '../../../components/common/SelectNew';
import { useForm } from "react-hook-form";
import { get } from "lodash"

const _ = { get };

const useStyles = makeStyles((theme: Theme) => ({
	close: {
		padding: theme.spacing(2),
	},
}));

const SettingsModal = (props) => {
	const classes = useStyles();

	const [state, setState] = React.useState({
		autoMicVol: false,
		autoSpeakerVol: false
	});
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	
	const { autoMicVol, autoSpeakerVol } = state;

	const [cameraValue, setCameraValue] = useState(null);
	const [microphoneValue, setMicrophoneValue] = useState(null);
	const [speakerValue, setSpeakerValue] = useState(null);

    useEffect(() => {
        setCameraValue(cameraValue);
		setMicrophoneValue(microphoneValue);
		setSpeakerValue(speakerValue)
    }, []);

	const handleCameraSelection = (e) => {
		console.log('this camera:' + cameraValue);
		setCameraValue(e.currentTarget.cameraValue);
	  };

	let cameraOptions = [];
	let micOptions = [];
	let speakerOptions = [];


	// get list of users devices
		
	const getDevices = (deviceInfos) => {

		for (let i = 0; i !== deviceInfos.length; ++i) {
			const deviceInfo = deviceInfos[i];
			const option = document.createElement('option');

			switch(deviceInfo.kind) {
				case 'audioinput' :
					option.text = deviceInfo.label || `microphone ${micOptions.length + 1}`;
					micOptions.push(option);
					break;
				case 'audiooutput' :
					option.text = deviceInfo.label || `speaker ${speakerOptions.length + 1}`;
					speakerOptions.push(option);
					break;
				case 'videoinput' :
					option.text = deviceInfo.label || `camera ${cameraOptions.length + 1}`;
					cameraOptions.push(option);
					break;
			}

			option.value = deviceInfo.deviceId;
		}

	}

	const handleError = (err) => {
		return {
			message: _.get(err, "response.data.message", "Something went wrong!"),
			errors: _.get(err, "response.data.errors", {})
		};
	}

	navigator.mediaDevices.enumerateDevices().then(getDevices).catch(handleError);
	
	type Selection = {
		any: string;
	};

	const { control } =
    useForm<Selection>();

	return (
		<Modal
			visible={props.status}
			size="large"
			className="settings-modal"
			closeButton={true}
			onClose={() => props.handleOnClose()}
		>
            <FormControl className="settings-modal-form">
                <Typography className="settings-modal-title">Settings</Typography>
                <SelectNew
                    value={cameraValue}
                    name="camera"
                    placeholder="Camera"
                    className="camera-dropdown"
                    options={cameraOptions}
                    isSearchable={false}
                    control={control}
					onChange={(e) => {
						console.log(e);
						handleCameraSelection(e.currentTarget.cameraValue)
					}}
                />
                <SelectNew
                    value={microphoneValue}
                    name="microphone"
                    placeholder="Microphone"
                    className="mic-dropdown"
                    options={micOptions}
                    isSearchable={false}
                    control={control}
					onSelect={(e) => setMicrophoneValue(e.currentTarget.microphoneValue)}
                />
                <Grid item xs={12}>
                    <Slider className="mic-slider" defaultValue={30} />
                </Grid>
                <FormControlLabel
                    control={<Checkbox checked={autoMicVol} onChange={handleChange} name="autoMicVol" />}
					className="mic-checkbox"
                    label="Automatically adjust microphone volume"
                />
				<SelectNew
                    value={speakerValue}
					name="speaker"
                    placeholder="Speaker"
                    className="speaker-dropdown"
                    options={speakerOptions}
                    isSearchable={false}
                    control={control}
					onSelect={(e) => setSpeakerValue(e.currentTarget.speakerValue)}
                />
                <Grid item xs={12}>
                    <Slider className="speaker-slider" defaultValue={30} />
                </Grid>
                <FormControlLabel
                    control={<Checkbox checked={autoSpeakerVol} onChange={handleChange} name="autoSpeakerVol" />}
					className="speaker-checkbox"
                    label="Automatically adjust speaker volume"
                />
            </FormControl>
						<div className="settings-button-section">
							<Button
								className="btn-cancel btn btn-transparent"
								onClick={(e) => props.handleOnClose(e)}
							>
								Cancel
							</Button>
							<Button
								className="btn-ok btn primary-btn"
							>
								Ok
							</Button>
						</div>
		</Modal>
	)
}

export default SettingsModal;