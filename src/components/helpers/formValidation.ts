const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export const genericValidation = (item: string, itemValue: any, min: number, max: number) => {

  switch (item) {
    case "displayName":
      if (itemValue) {
        if (itemValue < min || itemValue > max) {
          return ` Enter alphabets between ${min} and ${max} characters`
        }
      } else {
        return "Enter a valid name"
      }
      break;
    case "bigDescription":
      if (itemValue) {
        if (itemValue < min || itemValue > max) {
          return `Enter between ${min} and ${max} characters`
        } else {
          return "";
        }
      }
      return "Please enter a value"

      break;
    case "workstatus":
      if (itemValue) {
        if (itemValue == "Select Status") {
          return "Please select your workstatus";
        } else {
          return ""
        }
      }
      return "Please select your workstatus";
      break;
    case "max value limit":
      if (itemValue > max) {
        return `Cannot exceed ${max} characters`
      }
      break;
    default:
      if (itemValue) {
        if (min && itemValue < min) {
          return `Enter atleast ${min} characters`
        }
        if (max && itemValue > max) {
          return `Cannont exceed ${max} characters`
        }

      } else {
        return `Please enter a ${item} `
      }
      break;
  }
  return "";
}

export const requiredValidation = (itemName: string, itemValue: any)=>{
  if (!itemValue) {
    return `Please enter a ${itemName}`;
  } else {
    return "";
  }
}
export const validateSignupForm = (formErrors: any) => {
  let valid: boolean = true;
  Object.values(formErrors).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
export const validateDateOrder = (fromDate: any, toDate: any) => {
  let fromDateNum = new Date(fromDate).getTime();
  let toDateNum = new Date(toDate).getTime();
  if (fromDateNum > toDateNum) {
    return "From date should be less than To date";
  }
  return "";
}
export const validateDate = (fromDate: any, toDate: any) => {
  let fromDateNum = new Date(fromDate).getTime();
  let toDateNum = new Date(toDate).getTime();

  if (fromDate == "" || toDate == "") {
    return "Please enter a date";
  } else if (fromDate.length < 8 || toDate.length < 8) {
    return "Please enter a valid date";
  } else {
    return "";
  }


}
export const validateVideoDuration = (videoDurationInSecs: number, maxDurationInSecs: number) => {
  if (videoDurationInSecs > maxDurationInSecs) {
    return "Max Video Length should be 60 secs";
  }
  return "";
}

export const validateFileSize = (currentFileSize: any, maxFileSizeInMB: any) => {
  if (currentFileSize > maxFileSizeInMB * 1000 * 1000) {
    return `Max File Size should be ${maxFileSizeInMB} mb`
  } else {
    return "";
  }

}
export const validateSignupFields = (
  name: string,
  value: any,
  formErrors: any,
  rest: any
) => {
  switch (name) {
    case "firstName":
      formErrors.firstName =
        value.length < 3 ? "minimum 3 characaters required" : "";

      break;
    case "lastName":
      formErrors.lastName =
        value.length < 3 ? "minimum 3 characaters required" : "";

      break;
    case "email":
      formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
      break;
    case "verifyEmail":
      formErrors.verifyEmail =
        value != rest.email ? "" : "Emails need to match";
      break;
    case "password":
      formErrors.password =
        value.length < 6 ? "minimum 6 characaters required" : "";
      break;
    case "confirmPassword":
      formErrors.confirmPassword =
        value != rest.password ? "Passwords need to match " : "";
      break;
    default:
      break;
  }
};
