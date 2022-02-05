import { truncate } from "lodash";
const _ = { truncate };
export const textSummary = (description: string, descriptionLength: number) => {
	const words: string[] = description.split(" ");
	if (descriptionLength < words.length) {
		const summary: string[] = words.splice(0, descriptionLength);
		return summary.join(" ").concat("...");
	}
	else {
		return description;
	}
}

export const textSummaryCharacters = (description:string, descriptionLengthChar:number)=>{
	if(descriptionLengthChar < description.length){
		const words = description.substring(0,descriptionLengthChar+1);
		return words.substring(0,words.lastIndexOf(" "));
	}

	return description;
}

export const truncateCharacters = (description: string, charCount: number) => {
	if (description.length <= charCount) {
		return description;
	}
	return _.truncate(description, {
		'length': charCount,
		'separator': /,? +/
	});
}