import lodash from "lodash";

declare module "lodash" {
  interface LoDashStatic {
    arrGlueWith<TValue>(array: Array<any>, glueWith?: string): TValue;
  }
  interface LoDashExplicitWrapper<TValue> {
    arrGlueWith(array: Array<any>, glueWith?: string): LoDashExplicitWrapper<TValue>;
  }
}


/**
 * Glue array
 * 
 * @param value The value to inspect
 * @return Return Boolean
 */
function arrGlueWith(array: Array<any>, glueWith: string = "and") {

  return ""

}

/**
 * Get string value from object with error handling
 *
 * @param object The object to query
 * @param path The path of the property to get
 * @param defaultValue The value returned if the resolved value is undefined
 * @return Returns the resolved object
 */
function getTheStringFromObject(obj: object = {}, path: string = "", defaultValue: any = "") {

  try {

    // Check if given variables are satisfied with conditions
    if (lodash.isObject(obj) && lodash.size(obj) > 0 && lodash.isString(path)) {
      return lodash.get(obj, path, defaultValue);
    }
    return defaultValue;

  } catch (error) {
    console.log("Error while getting string from Lodash Mixin", error.message);
    return "";
  }

}

// Load all mixin
lodash.mixin({
  arrGlueWith: arrGlueWith,
  getStr: getTheStringFromObject,
});

export default lodash;
