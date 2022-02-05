import { Environment, WorkStatus } from "./types";
//import { S3 } from "aws-sdk";
export interface IProps {
    profile?: any;
    profileImageUrl?: string;
    createOrSaveProfile: (profile: any) => void;
    hasVideoSaved: boolean;
    isVideoSaving: boolean;
    hasVideoSaveFailed?: boolean;
    isProfileComplete: boolean;
    //uploadPhoto: (file: File, progressFn: (p: S3.ManagedUpload.Progress) => void) => void;
    //uploadVideo: (file: File, progressFn: (p: S3.ManagedUpload.Progress) => void) => void;
    userFullName?: any;
    isPhotoSaving: boolean;
    isPhotoUploadFailed: boolean;
    isVideoUploading: boolean;
    isPhotoUploaded: boolean;
    loading: boolean;
}
const getKeyForWorkStatusValue = (profile) => {
    let keyWorkStatus = "Select Status";
    Object.keys(WorkStatus).map((c) => {
        if (WorkStatus[c] === profile?.workStatus) {
            keyWorkStatus = c;
        }
    })
    return keyWorkStatus.replace("_", "-");
}
export const profileFields = (props) => {
    return {
        // displayName: props.profile?.preferredName ?? props.userFullName,
        workStatus: props.profile?.workStatus ? getKeyForWorkStatusValue(props.profile) : "Select Status",
        jobTitle: props.profile?.jobHeaderTitle ?? "",
        currentLocation: props.profile?.currentLocation ?? "",
        personalValues: props.profile?.quote ?? "",
        earlyCareer: props.profile?.earlyCareer ?? "",
        midCareer: props.profile?.midCareer ?? "",
        recentLife: props.profile?.recentCareer ?? "",
        // TODO - Set default values below
        education: props.profile?.educationDetails?.map(edu => ({
            id: edu.id,
            school: edu.schoolName,
            fieldOfStudy: edu.fieldOfStudy,
            certification: edu.certificationOrDegree,
            from: edu.from,
            to: edu.to
        })) ?? [],
        experience: props.profile?.jobExperienceDetails?.map(exp => ({
            id: exp.experienceId,
            position: exp.jobTitle,
            company: exp.companyName,
            description: exp.jobDescription,
            from: exp.startDate,
            to: exp.endDate,
            location: exp.jobLocation
        })) ?? [],
        skills: props.profile?.skills?.map(skill => ({
            id: skill.skillId,
            title: skill.skillName,
            skill: skill.skillDescription
        })) ?? [],
        projects: props.profile?.userProjects?.map(project => ({ ...project })) ?? [],
    }
}

export const profileKeys = {
    displayName: "displayName",
    workStatus: "workStatus",
    jobTitle: "jobTitle",
    currentLocation: "currentLocation",
    personalValues: "personalValues",
    earlyCareer: "earlyCareer",
    midCareer: "midCareer",
    recentLife: "recentLife",
    // TODO - Set default values below
    education: "education",
    experience: "experience",
    skills: "skills",
    projects: "projects"
}