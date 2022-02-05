import httpRequest from "../utils/httpRequest"
import { get, omit } from "lodash";
import API_URLS from "../../src/utils/apiUrls";
import { objectToParams } from '../../src/utils/helper'

const _ = { get, omit };

export const updateCandidate = (payload: any) => {
	return httpRequest().patch(`${API_URLS.candidates}update`, payload)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const candidateApplyJob = (payload: any) => {

	return httpRequest().patch(`${API_URLS.jobApplications}apply/${payload}`)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const candidateSaveJob = (payload: any) => {

	return httpRequest().patch(`${API_URLS.jobApplications}save/${payload}`)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const candidateJobApplicationList = (payload:any)=>{
	const params = objectToParams(payload)
	return httpRequest().get(`${API_URLS.jobApplications}?${params}`)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {}),
				pagination:_.get(res,"data.pagination",{})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const companyCandidatesList = (fields: any) => {
	//full BE route api/company/candidates/list
	return httpRequest().get(`${API_URLS.candidates}list`, fields)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: true,
				message: _.get(err, "response.data.message", "Something went wrong fetching company candidates"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const uploadCandidateFile = (payload: any) => {
	const type = _.get(payload, 'type', 'image');
	const formData = _.get(payload, 'payload', {});
	return httpRequest().post(`${API_URLS.candidates}profile/${type}`, formData)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const deleteVideo = () => {
	return httpRequest().delete(`${API_URLS.candidates}profile/video`)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const fetchCandidatePublicProfile = (slug: string) => {
	return httpRequest().get(`${API_URLS.candidates}profile/public/${slug}`)
		.then(res => {
			return {
				flag: true,
				message: _.get(res, "message", ""),
				data: _.get(res, "data.data", {})
			};
		})
		.catch(err => {
			return {
				flag: false,
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export default { updateCandidate, companyCandidatesList, uploadCandidateFile, candidateApplyJob, deleteVideo, fetchCandidatePublicProfile, candidateJobApplicationList, candidateSaveJob }
