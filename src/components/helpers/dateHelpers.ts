export const getDateDifference = (jobCreatedDate: any) => {
    let dateDiff = Date.now() - +new Date(jobCreatedDate.toString());
    var returnDateString;
    let extraS = "";
    
    const days = Math.round((dateDiff)/(1000*3600*24));
    if (days < 6) {
        if (days <= 1) {
            returnDateString = `${days} day ago`;
        } else if (days > 1) {
            returnDateString = `${days} day's ago`;
        }
        
        return returnDateString;
    }
    const weeks = Math.round(dateDiff/(1000*3600*24*7));
    if (weeks < 4) {
        if (weeks > 1) {
            extraS = '\'s';
        }
        returnDateString = `${weeks} week${extraS} ago`
    } else {
        const months = Math.round(dateDiff/(1000*3600*24*7*4));
        if (months > 1) {
            extraS = '\'s';
        }
        returnDateString = `${months} month${extraS} ago`
    }
    
    return returnDateString;
}

