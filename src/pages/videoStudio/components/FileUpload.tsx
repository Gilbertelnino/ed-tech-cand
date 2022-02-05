import React, { useState, useRef } from "react";
import Button from "../../../components/common/Button"
import AddIcon from '@material-ui/icons/Add';
import { get } from "lodash"

const _ = { get };

interface IFileUpload {
	[key: string]: any;
}

const FileUpload = (props: IFileUpload) => {
	const [image, setImage] = useState("");
	const [fileIsVid, setFileIsVid] = useState(false);
	const [fileClicked, setFileClicked] = useState(false);
	const inputFile = useRef(null);


	const handleFileUpload = e => {
		const { files } = e.target;
		if (files && files.length) {
			console.log(files);
			const filename = _.get(files, "[0].name", "");
			const parts = filename.split(".");
			const fileType = parts[parts.length - 1];
			const video = _.get(files, "[0].type", "").includes("video");

			setImage(URL.createObjectURL(files[0]))

			if (typeof props.onUpload === "function") {
				props.onUpload(URL.createObjectURL(files[0]))
			}

			if (typeof props.isVideo === "function") {
				video ? props.isVideo(true) : props.isVideo(false)
			}
		}

	};

	const onButtonClick = () => {
		const click = _.get(inputFile, "current.click", null)
		if (typeof click === "function") {
			inputFile.current.click()
		}
	};

	return (
		<div>
			<input
				className="file-upload-input"
				ref={inputFile}
				onChange={(e) => handleFileUpload(e)}
				type="file"
			/>
			<Button
				color="dark-pink"
				className="vs-button-add-files btn-transparent"
				onClick={onButtonClick}
			>
				<AddIcon className="add-icon"></AddIcon>
				Add Files
			</Button>
		</div>
	);
};

export default FileUpload;
