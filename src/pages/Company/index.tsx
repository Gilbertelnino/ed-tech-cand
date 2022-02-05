import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { companyCandidatesRequest } from "./../../reducers/company/companyCandidates.reducer";
import { get } from "lodash";
import CandidatesListing from "./components/CandidatesListing";

const _ = { get };

const CompanyPages = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(companyCandidatesRequest({}));
	}, []);

	const { companyCandidates } = useSelector(({ company }) => company);
	const data = _.get(companyCandidates, "data", []);
	return (
		<CandidatesListing
			list={data}
		/>
	)
}


export default CompanyPages;
