// Shout out to algolia places
// https://community.algolia.com/places/
import { StaticOptions, ReconfigurableOptions } from "places.js";
import { Environment } from "../../../types/location.types";

// TODO - Use secure keys from algolia
// https://community.algolia.com/places/documentation.html#secured-api-keys
const devoAlgoliaKeys = {
  appId: 'plUYKFWCUY6O', // dev app id
  apiKey: '36f899df6c0aefd163996a77ef434d06' // dev api key
};

// TODO - add prod keys
const prodAlgoliaKeys = {
  appId: '',
  apiKey: ''
};

// TODO - Make countries configurable
const countries = ['us'];

// TODO - Support searching by more than just city
const type = 'city';

export const getAlgoliaConfig = (env: Environment) => {
  const apiKeys = env === Environment.DEVO ? devoAlgoliaKeys : prodAlgoliaKeys;
  const staticOptions: StaticOptions = {
    ...apiKeys,
    container: ''
  };

  const dynamicOptions: ReconfigurableOptions = {
    countries,
    type
  };

  return { ...staticOptions, dynamicOptions };
};

