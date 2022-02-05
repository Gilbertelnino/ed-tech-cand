import React from 'react';
import MuiCard from '@material-ui/core/Card';
import Button from "./../common/Button";

interface CandidateCardProps {
	// primary props
	children: React.ReactNode;
	className?: string;

	candidateName?: string;
	candidateLocation?: any;
	candidateJobInterest?: string;
	candidatePersonalValues?: string;
	candidateImage?: string;
	candidateWorkStatus?: string;
	starred?: Boolean;
	candidateStatus?: "applied" | "interviewed";
	
	loading?: Boolean;
	loaderSize?: number;
	[key: string]: any;

}

const Card = ({ children, className, candidateName, candidateLocation, candidateJobInterest, candidatePersonalValues, candidateImage, candidateWorkStatus, starred, candidateStatus, ...props }: CandidateCardProps) => {
	return (
		<MuiCard
			className={className}
		>
			<div className="candidate-img">
				<img 
					alt={candidateName}
					src={candidateImage}
				/>
			</div>

			<div className="candidate-info">
				<div className="candidate-basic-info">
					<div className="candidate-name">
						<div className="name">
							{candidateName}
						</div>
						
						<div className="starred">
							{/* for some reason the filled in star svg is showing incorrectly - reached out to design because it might be due to copying from figma */}
							{starred ? 
								<svg
									width="20"
									height="19"
									viewBox="0 0 20 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path 
										d="M20 7.24L12.81 6.62L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27L16.18 19L14.55 11.97L20 7.24ZM10 13.4L6.24 15.67L7.24 11.39L3.92 8.51L8.3 8.13L10 4.1L11.71 8.14L16.09 8.52L12.77 11.4L13.77 15.68L10 13.4Z"
										fill="#767676"
									/>
								</svg>
								: 
								<svg
									width="20"
									height="19"
									viewBox="0 0 20 19"
									fill="none" xmlns="http://www.w3.org/2000/svg"
								>
									<path 
										d="M20 7.24L12.81 6.62L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27L16.18 19L14.55 11.97L20 7.24ZM10 13.4L6.24 15.67L7.24 11.39L3.92 8.51L8.3 8.13L10 4.1L11.71 8.14L16.09 8.52L12.77 11.4L13.77 15.68L10 13.4Z" 
										fill="#63525A"
									/>
								</svg>
							}
						</div>
						
						
															
					</div>
					<div className="candidate-location">{candidateJobInterest} | {candidateLocation.city}, {candidateLocation.state} | {candidateWorkStatus}</div>
				</div>

				<div className="candidate-personalvalues">
					{candidatePersonalValues}
				</div>
			</div>

			<div className="message">
				<Button
					color="dark-pink"
					className="message-button"
				>
					Message
				</Button>
			</div>
		</MuiCard>
	)
}

export default Card;