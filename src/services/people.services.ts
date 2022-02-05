import httpRequest, { openHttpRequest } from "../utils/httpRequest"
import { get, omit } from "lodash";
import { objectToParams } from "../utils/helper";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get, omit };

export const getPeople = async (payload: any) => {

	// Check if request is for public or not
	const isPublic = _.get(payload, "isPublic", undefined);
	const companySlug = _.get(payload, "companySlug", undefined);
	payload = _.omit(payload, ["companySlug", "isPublic"]);

	const queryString = objectToParams(payload);

	if (isPublic && companySlug) {
		const peoplePublicUrl = `${API_URLS.peoplePublicUrl.replace(":slug", companySlug)}?${queryString}`;

		return openHttpRequest().get(peoplePublicUrl)
			.then(res => {
				return {
					flag: true,
					message: _.get(res, "message", ""),
					data: _.get(res, "data", {})
				};
			})
			.catch(err => {
				return {
					flag: false,
					message: _.get(err, "response.data.message", "Something went wrong"),
					errors: _.get(err, "response.data.errors", {})
				};
			});
	} else {
		return httpRequest().get(`${API_URLS.people}?${queryString}`)
			.then(res => {
				return {
					flag: true,
					message: _.get(res, "message", ""),
					data: _.get(res, "data", {})
				};
			})
			.catch(err => {
				return {
					flag: false,
					message: _.get(err, "response.data.message", "Something went wrong"),
					errors: _.get(err, "response.data.errors", {})
				};
			});
	}

}

export const getPeopleDetail = (id: number) => {
	return httpRequest().get(`${API_URLS.people}/${id}`)
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
				message: _.get(err, "response.data.message", "Something went wrong"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const createPeople = (formData: any) => {
	return httpRequest().post(`${API_URLS.people}`, formData)
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
				message: _.get(err, "response.data.message", "Something went wrong"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const deletePeople = (id: any) => {
	return httpRequest().delete(`${API_URLS.people}/${id}`)
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
				message: _.get(err, "response.data.message", "Something went wrong while deleting"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const updatePeople = (payload: any) => {
	const id = payload.id;
	const data = payload.formData;

	return httpRequest().put(`${API_URLS.people}/${id}`, data)
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
				message: _.get(err, "response.data.message", "Something went wrong"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const uploadPeopleFile = (payload: any) => {
	return httpRequest().post(`${API_URLS.assetUpload}people`, payload.payload)
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
				message: _.get(err, "response.data.message", "Something went wrong"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export default {
	getPeople,
	createPeople,
	deletePeople,
	updatePeople,
	getPeopleDetail,
	uploadPeopleFile
}
