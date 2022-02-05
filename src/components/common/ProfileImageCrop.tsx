import React, { useState, useCallback } from "react";
import { Slider } from "@material-ui/core";
import { Point, Area } from "react-easy-crop/types";
import Cropper from 'react-easy-crop';

import Modal from "./Modal";
import Button from "./Button";
import { getCroppedImg } from "../../utils/cropImageHelper";

interface IProfileImageCrop {
  layout?: "profileImage" | "banner";
  visible: boolean;
  cropImage: any;
  btnCropText?: string;
  onClose: () => void;
  onCrop: (data: any) => void;
}


const ProfileImageCrop = (props: IProfileImageCrop) => {

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleOnClose = () => {
    props.onClose();

    setTimeout(() => {
      // Reset the params
      setCrop({ x: 0, y: 0 });
      setRotation(0);
      setZoom(1);
      setCroppedAreaPixels(null);
    }, 500);
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        props.cropImage,
        croppedAreaPixels,
        rotation
      )

      props.onCrop(croppedImage);
      handleOnClose();
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <>
      <Modal
        visible={props.visible}
        onClose={() => handleOnClose()}
        className="img-crop-modal"
      >
        <div className="crop-container">
          <div className="cropper-image">
            <Cropper
              image={props.cropImage}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <span className="note">Drag image to reposition</span>
          <div className="cropper-edit-wrapper">
            <div className="cropper-edits controls">
              <div className="control-inner">
                <label>Zoom</label>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom as number)}
                />
              </div>
              <div className="control-inner">
                <label>Rotation</label>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  onChange={(e, rotation) => setRotation(rotation as number)}
                />
              </div>
            </div>
            <div className="cropper-edits cropper-btns">
              <span className="span-link" onClick={() => handleOnClose()}>Discard</span>
              <Button
                type="button"
                className="primary-btn"
                onClick={() => showCroppedImage()}
              >
                {props.btnCropText || "Crop"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

ProfileImageCrop.defaultProps = {
  layout: "profileImage"
}

export default ProfileImageCrop;
