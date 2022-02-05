import httpRequest, { openHttpRequest } from "../utils/httpRequest"
import { get, omit } from "lodash";
import { objectToParams } from "../utils/helper";
import API_URLS from "../../src/utils/apiUrls";

const _ = { get, omit };

export const getJobs = async (payload: any) => {

	// Check if request is for public or not
	const isPublic = _.get(payload, "isPublic", undefined);
	const companySlug = _.get(payload, "companySlug", undefined);
	payload = _.omit(payload, ["companySlug", "isPublic"]);

	const queryString = objectToParams(payload);

	if (isPublic && companySlug) {
		const jobPublicUrl = `${API_URLS.jobPublicUrl.replace(":slug", companySlug)}?${queryString}`;

		return openHttpRequest().get(jobPublicUrl)
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
					message: _.get(err, "response.data.message", "Something went wrong!"),
					errors: _.get(err, "response.data.errors", {})
				};
			});
	} else {
		return httpRequest().get(`${API_URLS.jobs}?${queryString}`)
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
					message: _.get(err, "response.data.message", "Something went wrong!"),
					errors: _.get(err, "response.data.errors", {})
				};
			});
	}

}

export const getPublicJobs = async (payload: any) => {
	const queryString = await objectToParams(payload);
	const url = `${API_URLS.public}/jobs?${queryString}`;

	return httpRequest().get(url)
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
				message: _.get(err, "response.data.message", "Something went wrong!"),
				errors: _.get(err, "response.data.errors", {})
			};
		});
}

export const getJobDetail = (payload = {}) => {

	// Check if request is for public or not
	const isPublic = _.get(payload, "isPublic", undefined);
	const jobSlug = _.get(payload, "jobSlug", undefined);
	const id = _.get(payload, "id", undefined);

	if (isPublic && jobSlug) {

		const jobPublicUrl = API_URLS.jobDetailsPublicUrl.replace(":slug", jobSlug);

		return openHttpRequest().get(jobPublicUrl)
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
	} else {
		return httpRequest().get(`${API_URLS.jobs}/${id}`)
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

}

export const createJob = (formData: any) => {
	return httpRequest().post(`${API_URLS.jobs}`, formData)
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

export const deleteJob = (id: any) => {
	return httpRequest().delete(`${API_URLS.jobs}/delete/${id}`)
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

export const updateJob = (payload: any) => {
	const id = _.get(payload, "id", 0);
	const data = _.omit(payload, "id");
	return httpRequest().put(`${API_URLS.jobs}/${id}`, data)
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

export const archiveJob = (id: number) => {
	return httpRequest().patch(`${API_URLS.jobs}/archive/${id}`)
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

export const getJobTypes = (fields: any) => {
	return httpRequest().get(`${API_URLS.jobTypes}`, fields)
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

export const getJobLevels = (fields: any) => {
	return httpRequest().get(`${API_URLS.jobLevels}`, fields)
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

export const getSalaryRanges = (fields: any) => {
	return httpRequest().get(`${API_URLS.salaryRanges}`, fields)
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

export const getJobStatuses = (fields: any) => {
	return httpRequest().get(`${API_URLS.jobStatuses}`, fields)
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

export const getJobDepartments = () => {
	return httpRequest()
	  .get(`${API_URLS.jobDepartments}`)
	  .then((res) => {
		return {
		  flag: true,
		  message: _.get(res, "message", ""),
		  data: _.get(res, "data.data", {}),
		};
	  })
	  .catch((err) => {
		return {
		  flag: false,
		  message: _.get(err, "response.data.message", "Something went wrong!"),
		  errors: _.get(err, "response.data.errors", {}),
		};
	  });
  };

export default {
	getJobs,
	createJob,
	deleteJob,
	updateJob,
	archiveJob,
	getJobTypes,
	getJobDetail,
	getJobLevels,
	getPublicJobs,
	getJobStatuses,
	getJobDepartments,
	getSalaryRanges
}
