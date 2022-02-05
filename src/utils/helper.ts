import { get, isEmpty, map, trim, isUndefined, cloneDeep } from "lodash";
import moment from "moment";
const _ = { get, isEmpty, map, trim, isUndefined, cloneDeep };

// Common helper file for Application

/**
 * Get current application name from environment variables
 *
 * Fallback app name is "employHer"
 */
export const getAppName = () => {
  return process.env.REACT_APP_NAME ? process.env.REACT_APP_NAME : 'employHer';
}

/**
 * Get current application name from environment variables
 *
 * Fallback app name is "employHer"
 */
interface AppDomainInterface {
  protocol?: boolean;
}
export const getAppDomain = (options: AppDomainInterface = {}) => {
  const { location } = window;

  let linkParts = [];

  if (options.protocol === true) {
    linkParts.push(`${location.protocol}//`);
  }
  linkParts.push(`${location.host}/`);

  return linkParts.join("");

}

/**
 * Get API End Point
 *
 * Fallback end point is "http://localhost:8080"
 * 
 * @params url Append Url after end point
 */
export const getAPIEndPoint = (url = "") => {
  return (process.env.REACT_APP_API_END_POINT ? process.env.REACT_APP_API_END_POINT : 'http://localhost:8080') + `/${url}`;
}

/**
 * Convert Object key value pair to URL query params
 *
 * @param Object Key Value pair object
 */
export const objectToParams = (object: any) => {

  Object.entries(object).map(([key, val]) => (!val) && delete object[key]);

  if (Object.keys(object).length > 0) {
    return new URLSearchParams(object).toString();
  } else {
    return "";
  }

}

/**
 * Get current get current tab name from company portal navigation
 *
 * @param  Object any
 * @param  Boolean true | false
 * @return Random generated integer
 */
 export const getCurrentTab = (c: any, is_sub: boolean = false, is_module: boolean = false) => {
  const data = c.props ? c.props : c;
  const path = _.get(data, "location.pathname", "");
  const tabs = path.split('/');
  return !_.isEmpty(tabs) ? is_module ? tabs[1] : is_sub ? tabs[3] : tabs[2] : "";
}

/**
 * Get clear string
 *
 * @param  String 
 * @return cleared string without dash.
 */
export const clearString = (s: string) => {
  let string = s.toLowerCase();
  string = string.replace(/\s/g, '-');
  return string;
}

/**
* Generate random numbers between two digits
*
* @param  Integer minimum value
* @param  Integer maximum value
* @return Random generated integer
*/
export const randomNumber = (min: number = 1, max: number = 1000) => {
  return Math.floor(Math.random() * max) + min;
}

/**
 * format the date
 */
export const formatDate = (s: string) => {
  return moment(s).format("MMM D, YYYY");
}

/**
* Extract Numbers from mix string
*
* @param  String mix string
* @return Pure number
*/
export const extractNumber = (str: string) => {

  if (typeof str === 'string') {
    return str.match(/\d/g)?.join("");
  }
  return str;
}

/**
 * Retrieve a list of specific key value pair from Array
 *
 * @param Array Key Value pair `object`
 */
export const pluckFromArray = (data: any, key: any, valueKey: any, innerKey = "key", innerValue = "value") => {
  return _.map(data || [], (d, index) => {
    return { [innerKey]: _.isUndefined(key) ? index : d[key], [innerValue]: _.isUndefined(valueKey) ? d : d[valueKey] }
  });
}

/**
 * Sanitize a Link
 *
 * @param String proper URL
 */
export const sanitizeUrl = (url: string) => {
  let tmpUrl: string = url;

  tmpUrl = tmpUrl.replaceAll("http://", "");
  tmpUrl = tmpUrl.replaceAll("https://", "");

  return `//${tmpUrl}`;
}

/**
 * Scroll to top
 *
 */
export enum iScrollToTop { auto = "auto", smooth = "smooth" }
export const scrollToTop = (scrollTo: number = 0, behavior: iScrollToTop = iScrollToTop.auto): void => {
  window.scrollTo({
    top: scrollTo,
    left: scrollTo,
    behavior: behavior,
  });
}

/**
 * Merge array value with comma
 *
 * @param String with comma
 */
export const arrayGlueWith = (array: any[], glueWith: string = "and"): string => {

  const tmpArr = _.cloneDeep(array);

  if (tmpArr.length === 1) {
    return tmpArr[0];
  }

  return `${tmpArr.splice(0, tmpArr.length - 1).join(", ")} ${glueWith} ${tmpArr[tmpArr.length - 1]}`;
}

/**
 * JSON parse with error handling
 *
 * @param String stringify JSON
 */
export const JSONParse = (str: string): object => {

  try {
    return JSON.parse(str);
  } catch (error) {
    return {};
  }

}

/**
 * Get Initial letter of full name
 *
 * @param String stringify JSON
 */
export const getInitialLetter = (fullName: string, limit: number = 2): string => {

  let letters = "";

  fullName.split(" ").filter(a => a).forEach((letter) => letters = letters.concat(letter[0]));

  return letters.substr(0, limit);
}

/**
 * Generate random uuid
 *
 * @param String Generated string
 */
export const uuid = (length?: number): string => {
  const uuidLength = length || 10;
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < uuidLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}


/**
 * Convert bytes to KB, MB etc...
 *
 * @param Number Bytes
 * @param Number Decimals
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Get time from seconds
 *
 * @param Number duration
 */
export const secondToTime = (duration: number): number => {

  var t = new Date(0);
  // t.toISOString().substr(11, 12);
  return t.setMilliseconds(1e3 * duration);
}

/**
* Get the video meta data from Blob
*
* @param  Blog file
* @return Promise
*/
export const getVideoMetaFromBlob = async (file: any) => {

  return await new Promise((resolve, reject) => {
    try {
      let video = document.createElement('video')
      video.preload = 'metadata'

      video.onloadedmetadata = function () {
        resolve(this)
      }

      video.onerror = function () {
        reject("Invalid video. Please select a video file.")
      }

      video.src = window.URL.createObjectURL(file)
    } catch (e) {
      reject(e)
    }
  })
}

/**
* Get the video meta data from Blob
*
* @param  Blog file
* @return Promise
*/
export const downloadFile = (fileName: string, blob: any): void => {

  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  const url = window.URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

/**
* Chat Date
*
* @param  Blog file
* @return Promise
*/
export const chatDate = (dateTime: string, fullDisplay = false): string => {

  // Check if date is within a minute
  if (moment(dateTime).isSame(new Date(), "day")) {
    return moment(dateTime).format("LT");
  } else if (moment(dateTime).isSame(new Date(), "year")) {
    return fullDisplay ? moment(dateTime).format("MMM D, LT") : moment(dateTime).format("MMM D");
  } else {
    return fullDisplay ? moment(dateTime).format("M/D/YY LT") : moment(dateTime).format("MMM D, YYYY");
  }
}

export const storeNewMessageInfo = (data: any) => {
  localStorage.setItem("message", JSON.stringify(data));
}

export const fetchAndClearNewMessageInfo = () => {
  const storageData = (localStorage.getItem("message") || "");
  localStorage.removeItem("message");

  return JSONParse(storageData);
}

export const openUrlInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
