import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, ProfileImageCrop, FlashMessage } from "../../components/common";
import { Container, Typography } from "@material-ui/core";
import Education from "./Education";
import VideoUploader from "./VideoUploader";
import BasicInformationForm from "./BasicInformationForm";
import ProfessionalPassions from "./ProfessionalPassions";
import CareerDifferentiatorsWork from "./CareerDifferentiatorsWork";
import CareerDifferentiatorsSkills from "./CareerDifferentiatorsSkills";
import CareerDifferentiatorsProject from "./CareerDifferentiatorsProject";
import { ProfileSubHeadings } from "./commonUI/commonHeadings";
import { get, isEmpty, filter } from "lodash";
import { uploadCandidateFileRequest } from "../../reducers/candidate/candidate.reducer";
import { readFile } from "../../utils/cropImageHelper";
import { ImageMimeTypes, VideoMimeTypes } from "../../utils/appConstants";
import { LocationInput } from "../../types/location.types";

const _ = { get, isEmpty, filter };

interface ProfileProps {
  profile?: any;
  createOrSaveProfile: (profile: any) => void;
  picturePath: string;
  isUploading: boolean;
  loading: boolean;
}

const MainProfile: FunctionComponent<ProfileProps> = (props) => {
  const dispatch = useDispatch();
  const { register, setValue, clearErrors, handleSubmit, setError, errors, getValues, control, watch } = useForm({
    defaultValues: { ...props.profile, name: `${_.get(props, "profile.first_name", "")} ${_.get(props, "profile.last_name", "")}` },
  });
  const {
    candidates: { isEditModeOn },
  } = useSelector(({ candidate }: any) => candidate);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [skills, setSubmitChip] = useState([]);
  const [showCropImage, setShowCropImage] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);

  useEffect(() => {
    // Registered location and location JSON
    register("profile.job_location");
    register("profile.job_location_json", {
      required: {
        value: true,
        message: "Please select location",
      },
    });
  }, []);

  useEffect(() => {
    if (props.profile) {
      setValue("profile.job_location", _.get(props, "profile.profile.job_location", ""));
      setValue("profile.job_location_json", _.get(props, "profile.profile.job_location_json", "{}"));
    }
  }, [props.profile]);

  const onSubmit = handleSubmit((data, e) => {
    const experiences = _.get(data, "experiences", []);
    const projects = _.get(data, "projects", []);
    const education = _.get(data, "education", []);
    const workStatus = _.get(data, "profile.work_status", {});
    const experienceObject = _.filter(experiences, (exp) => {
      return !_.isEmpty(exp.job_position);
    });
    const projectObject = _.filter(projects, (prj) => {
      return !_.isEmpty(prj.title);
    });
    const educationObject = _.filter(education, (edu) => {
      return !_.isEmpty(edu.institute_name);
    });
    const skillsObject = skills.map((s) => {
      return { title: s };
    });

    const location = _.get(data, "profile.job_location", "");
    const locationJsonData = _.get(data, "profile.job_location_json", "");
    const location_json = {
      job_location_json: _.isEmpty(locationJsonData) ? "{}" : locationJsonData,
    };
    const work_status = {
      work_status: typeof workStatus === "string" ? workStatus : _.get(workStatus, "value", ""),
    };
    const is_draft = _.get(e, "nativeEvent.submitter.value", "");
    const payload = {
      ...data,
      first_name: data.name.split(" ").slice(0, 1).join(" "),
      last_name: data.name.split(" ").slice(1, data.name.length).join(" "),
      experiences: [...experienceObject],
      projects: [...projectObject],
      education: [...educationObject],
      skills: [...skillsObject],
      profile: {
        ...data.profile,
        ...location_json,
        ...work_status,
        is_public: is_draft === "is_draft" ? false : true,
      },
    };
    if (!location) {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    } else {
      props.createOrSaveProfile(payload);
    }
    setSubmitClicked(true);
  });

  const handleCropImage = async (blobData) => {
    // const src = URL.createObjectURL(blobData);
    // setPicturePath(src);
    const payload = new FormData();
    payload.append("files", blobData, currentFileName);
    dispatch(uploadCandidateFileRequest({ payload, type: "image" }));
  };

  const uploadFile = async (file, type) => {
    if (file) {
      const fileType = file.type;

      if (type === "image") {
        if (ImageMimeTypes.includes(fileType)) {
          setCurrentFileName(file.name);
          const imageDataUrl = await readFile(file);
          setCropImage(imageDataUrl);
          setShowCropImage(true);
        } else {
          FlashMessage("Please select valid png or jpeg file", "error");
        }
      } else if (type === "video") {
        if (VideoMimeTypes.includes(fileType)) {
          const payload = new FormData();
          payload.append("files", file);
          dispatch(uploadCandidateFileRequest({ payload, type }));
        } else {
          FlashMessage("Please select valid mp4 or mov file", "error");
        }
      }
    }
  };

  const _handleLocationChange = (locationInput: LocationInput) => {
    const fullLocation = [_.get(locationInput, "city", ""), _.get(locationInput, "region", ""), _.get(locationInput, "country", "")]
      .filter((l) => l)
      .join(", ");
    setValue("profile.job_location", fullLocation);
    setValue("profile.job_location_json", JSON.stringify(locationInput));

    if (!_.isEmpty(locationInput)) {
      clearErrors("profile[job_location_json]");
    } else {
      setError("profile[job_location_json]", {
        type: "manual",
        message: "Please select location",
      });
    }
  };
  return (
    <div className="main-class">
      <Container maxWidth="lg" id="createProfileForm">
        <form noValidate onSubmit={onSubmit}>
          <div className="user-profile-intro">
            <div className="her-profile">
              <Typography gutterBottom>
                Create <span>HER</span> Profile
              </Typography>
              <Typography variant="caption" className="margin">
                Note: Completion + Effectiveness = Results
              </Typography>
            </div>
          </div>

          <BasicInformationForm
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            handleLocationChange={_handleLocationChange}
            profile={_.get(props, "profile")}
            watch={watch}
            submitClicked={submitClicked}
            uploadPhoto={(file, type) => uploadFile(file, type)}
            isUploading={props.isUploading}
            picturePath={props.picturePath}
            getValues={getValues}
          />

          {ProfileSubHeadings("Professional Passions")}
          <ProfessionalPassions register={register} errors={errors} watch={watch} />

          {ProfileSubHeadings("Career Differentiators")}
          <div className="info-wrapper career-differentiators-wrapper">
            <CareerDifferentiatorsWork register={register} errors={errors} control={control} setValue={setValue} />
            <span className="separator" />
            <CareerDifferentiatorsProject register={register} errors={errors} control={control} setValue={setValue} />
            <span className="separator" />
            <CareerDifferentiatorsSkills
              register={register}
              errors={errors}
              control={control}
              handleSkills={(skills) => setSubmitChip(skills)}
              skills={_.get(props, "profile.skills", "")}
            />
          </div>

          {ProfileSubHeadings("Education")}
          <Education register={register} errors={errors} control={control} setValue={setValue} />
          <div className="her-profile position-collapsible-label">
            <Typography gutterBottom>
              employ<span>HER</span> Video
            </Typography>
          </div>
          <VideoUploader
            profileVideoUrl={_.get(props, "profile.profile.profile_video", "")}
            isUploading={props.isUploading}
            uploadVideo={(file, type) => uploadFile(file, type)}
            totalVideos={_.get(props, "profile.profileVideoCount", 0)}
          />

          <div className="submit-group">
            <Button
              type="submit"
              variant="contained"
              loading={props.loading}
              disabled={props.loading}
              className="submit-button"
              onSubmit={(e: any) => onSubmit(e)}
            >
              Submit Profile
            </Button>
            {!isEditModeOn && (
              <Button variant="text" type="submit" value="is_draft" className="save-for-later" disabled={props.loading}>
                Save for Later
              </Button>
            )}
          </div>
        </form>
      </Container>
      <ProfileImageCrop
        visible={showCropImage}
        cropImage={cropImage}
        onClose={() => setShowCropImage(false)}
        onCrop={(data) => handleCropImage(data)}
      />
    </div>
  );
};
export default MainProfile;
