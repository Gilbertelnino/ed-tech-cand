import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from "lodash";
import { arrayGlueWith } from '../../utils/helper';
import { FileTypes } from "../../utils/appConstants";
import Clouduploadicon from "../../assets/images/cloud-upload-icon .png";

interface iError {
  type: "invalid-file-type" | "max-file-upload-size";
  message: string;
}

interface iDropZone {
  onSuccess: (file: any) => void;
  onError?: (data: iError) => void;
  allowFileTypes?: string[];
  allowFileSize?: number;
  displayFileName?: boolean;
}

const SingleFileDropZone = (props: iDropZone) => {

  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [fileTypeError, setFileTypeError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const { onSuccess, onError, allowFileTypes, allowFileSize } = props;

      // Reset error
      setFileTypeError("");
      const fileType = (file.type || "");
      const fileName = (file.name || "");
      const fileSize = (file.size || 0);

      setUploadedFileName(fileName);

      // Check file types
      const fileMimeTypes = _.cloneDeep(allowFileTypes || []).map((f: string) => FileTypes[f]).filter(f => f);
      const fileTypes = arrayGlueWith((allowFileTypes || []));
      if ((fileMimeTypes || []).length > 0 && !(fileMimeTypes || []).includes(fileType)) {
        const message: string = `Only ${fileTypes} file types allowed`;
        if (typeof onError === "function") {
          onError({ type: "invalid-file-type", message });
        }
        setFileTypeError(message);
        return false;
      }

      // Check file size
      if (fileSize > (allowFileSize || 0)) {
        const mb = Math.floor(((allowFileSize || 0) / 1024) / 1024);
        const message: string = `Max ${mb} mb file size allowed`;
        if (typeof onError === "function") {
          onError({ type: "max-file-upload-size", message });
        }
        setFileTypeError(message);
      }

      // Success
      if (typeof onSuccess === "function") {
        onSuccess(file);
      }
    })

  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="drop-area">
        <p>Drag or browse an image here to upload</p>
        <p className="small">Browse image from your computer</p>
        {/* <CloudUploadIcon /> */}
        <img src={Clouduploadicon} />
      </div>
      {(props.displayFileName === true && uploadedFileName) && (
        <aside>
          <p>{uploadedFileName}</p>
        </aside>
      )}
      {(!_.isEmpty(fileTypeError)) && (
        <span className="error-msg">{fileTypeError}</span>
      )}
    </div>
  )

}

SingleFileDropZone.defaultProps = {
  allowFileTypes: [],
  displayFileName: true,
  allowFileSize: 2097152 // 2 mb
}

export default SingleFileDropZone;
