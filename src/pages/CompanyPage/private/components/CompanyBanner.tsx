import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import { ProfileImageCrop, Input, FlashMessage, Spinner } from "../../../../components/common";
import Skeleton from '@material-ui/lab/Skeleton';
import {
  uploadCompanyFileRequest, uploadCompanyProfileImageRequest, uploadCompanyBannerImageRequest, uploadCompanyProfileImageReset,
  getCompanyDetailSuccess
} from "../../../../reducers/company/companyProfile.reducer";
import { readFile } from "../../../../utils/cropImageHelper";
import { ImageMimeTypes, VideoMimeTypes } from "../../../../utils/appConstants";
import { rootReducersState } from "../../../../reducers";

const CompanyBanner = () => {

  const dispatch = useDispatch();

  const [bannerPath, setBannerPath] = useState(null);
  const [picture, setPicData] = useState(null);
  const [showCropImage, setShowCropImage] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const companyReducer = useSelector(({ company }: any) => company);
  const companyProfileReducer = _.get(companyReducer, "companyProfile", {}); // Parent object
  const uploadBannerImageFlag = _.get(companyReducer, "companyProfile.uploadBannerImageFlag", null);
  const uploadProfileImageLoading = _.get(companyReducer, "companyProfile.uploadProfileImageLoading", null);
  const uploadProfileImageData = _.get(companyReducer, "companyProfile.uploadProfileImageData", null);
  const uploadLoading = _.get(companyReducer, "companyProfile.uploadLoading", false);

  const companyProfileData = _.get(companyReducer, "companyProfile.data", {});
  const companyDetail = _.get(companyProfileData, "companyProfile", {});
  const profileImage = _.get(companyProfileData, "profile_image", "");

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const userData = _.get(sessionReducer, "currentUser", {});
  const isParentAdmin = _.get(userData, "parent_id", 0) === null;

  useEffect(() => {
    if (!_.isEmpty(companyDetail)) {
      const bannerImage = _.get(companyDetail, "banner_image", null);
      if (!_.isEmpty(bannerImage)) {
        setBannerPath(_.get(companyDetail, "banner_image", null));
      }
    }
  }, [companyDetail]);

  useEffect(() => {
    if (!_.isEmpty(profileImage)) {
      setPicData(profileImage);
    }
  }, [profileImage]);

  // Set image to profile store once updates and reset it
  useEffect(() => {

    if (_.get(uploadProfileImageData, "signedUrl", "")) {
      const signedUrl = _.get(uploadProfileImageData, "signedUrl", "");
      const payload = {
        data: { ...companyProfileData, profile_image: signedUrl },
        message: ""
      }

      dispatch(getCompanyDetailSuccess({
        data: { ...companyProfileData, profile_image: signedUrl },
        message: ""
      }))
      dispatch(uploadCompanyProfileImageReset());
    }

  }, [uploadProfileImageData]);

  const onChangeBanner = (e) => {
    if (!_.isEmpty(e.target.files)) {

      const file = e.target.files[0];
      const fileType = file.type;

      if (ImageMimeTypes.includes(fileType)) {
        const payload = new FormData();
        payload.append("files", file, file.name);
        const data = { type: 'banner', payload: payload };
        dispatch(uploadCompanyBannerImageRequest(data));
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setBannerPath(reader.result);
        });
        reader.readAsDataURL(file);
      } else {
        FlashMessage("Please select valid png or jpeg file", "error");
      }
    }
  };

  const onChangePicture = async (e) => {

    if (!_.isEmpty(e.target.files)) {

      const file = e.target.files[0];
      const fileType = file.type;

      if (ImageMimeTypes.includes(fileType)) {
        setFileName(file.name);
        let imageDataUrl = await readFile(file)
        setCropImage(imageDataUrl)
        setShowCropImage(true);
      } else {
        FlashMessage("Please select valid png or jpeg file", "error");
      }
    }
  };

  const handleCropImage = async (blobData) => {
    const src = URL.createObjectURL(blobData);
    setPicData(src);

    const payload = new FormData();
    payload.append("uploadType", "image");
    payload.append("files", blobData, fileName);
    const data = { type: 'image', payload: payload };
    dispatch(uploadCompanyProfileImageRequest(data));
  }

  const onUploadVideo = (e) => {

    if (!_.isEmpty(e.target.files)) {

      const file = e.target.files[0]
      const fileType = file.type;

      // Check file type
      if (VideoMimeTypes.includes(fileType)) {
        const payload = new FormData();
        payload.append("files", file);
        const data = { type: 'video', payload: payload };
        dispatch(uploadCompanyFileRequest(data));
      } else {
        FlashMessage("Please select valid mp4 or mov file", "error");
      }
    }
  };

  const bannerClass = _.isEmpty(bannerPath) ? "banner-image" : "banner-image banner-image-selected";
  const pictureClass = _.isEmpty(picture) ? "select-profile" : "select-profile selected-profile";
  const profileClass = isParentAdmin ? '' : 'profile-disabled';

  return (
    <>
      <div className={profileClass}>
        {/* <Spinner visible={true} loadingTip={""}></Spinner> */}
        <div className="profile-banner">
          <div className={bannerClass}>
            <Input
              className="select-banner-btn"
              name="banner"
              type="file"
              onChange={(e) => onChangeBanner(e)}
              disabled={!isParentAdmin}
            />
            <span className="banner-wrapper">
              {_.isEmpty(bannerPath) ? (
                uploadBannerImageFlag ? (
                  <Skeleton height={440} />
                ) : (
                  <>
                    <AddIcon />
                    <Typography variant="caption" display="block" gutterBottom>
                      Add a profile banner
                    </Typography>
                  </>
                )
              ) : (
                <img src={bannerPath} className="banner-img" />
              )}
            </span>
          </div>
        </div>


        <div className="profile-upload-wrapper">
          <div className="profile-picture">
            <div className={pictureClass}>
              <Input
                className="select-profile-btn"
                name="image"
                type="file"
                onChange={(e) => onChangePicture(e)}
                disabled={!isParentAdmin}
              />
              <span>
                {_.isEmpty(picture) ? (
                  (uploadProfileImageLoading) ? (
                    <Skeleton variant="circle" height={180} width={180} />
                  ) : (
                    <>
                      <AddIcon />
                      <Typography variant="caption" display="block" gutterBottom>
                        Add a profile picture
                      </Typography>
                    </>
                  )
                ) : (
                  (uploadProfileImageLoading) ? (
                    <Skeleton variant="circle" animation="wave" height={180} width={180} />
                  ) : (
                    <img
                      src={picture}
                      className="people-img"
                    />
                  )
                )}
              </span>
            </div>
          </div>
          <div className="upload-video">
            {
              uploadLoading ? (
                <Skeleton variant="square" animation="wave" height={30} width={145} />
              ) : (
                <Input
                 className="custom-upload-video-btn"
                 name="banner"
                 type="file"
                 onChange={(e) => onUploadVideo(e)}
                 disabled={!isParentAdmin}
               />
              )
            }
          </div>
        </div>
      </div>
      <ProfileImageCrop
        visible={showCropImage}
        cropImage={cropImage}
        btnCropText="Save"
        onClose={() => setShowCropImage(false)}
        onCrop={(data) => handleCropImage(data)}
      />
    </>
  );
}
export default CompanyBanner;
