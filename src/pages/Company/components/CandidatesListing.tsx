import React from "react";

import Card from "../../../components/Candidates/Card";

import _ from "lodash";


const CandidatesListing = ({ list }) => {
	return (
		<div className="candidates-list">
			{
				(list || []).map((candidate) => {
					return (
						<Card 
							className="candidate-card"
							candidateName={_.get(candidate, "candidateName", "")}
							candidateLocation={_.get(candidate, "candidateLocation", "")}
							candidateJobInterest={_.get(candidate, "candidateJobInterest", "")}
							candidatePersonalValues={_.get(candidate, "candidatePersonalValues", "")}
							candidateImage={_.get(candidate, "candidateImage", "")}
							candidateWorkStatus={_.get(candidate, "candidateWorkStatus", "")}
							starred={_.get(candidate, "favorite", false)}
							status={_.get(candidate, "candidateStatus", "")}
						/>
					)
				})
			}
		</div>
	)
}

export default CandidatesListing;