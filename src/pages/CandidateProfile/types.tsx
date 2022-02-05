export type ApiError = {
    statusCode: number;
    errorMessage: string;
};

export function isApiError(val: any): val is ApiError {
    return (val as ApiError).statusCode != undefined;
}

export type LocationInput = {
    city: string;
    region: string;
    countryCode: string;
    country: string;
};

export enum Environment {
    LOCAL = "local",
    DEVO = "devo",
    PROD = "prod",
}

export type S3Location = {
    bucket: string;
    key: string;
};

export enum WorkStatus {
    US_Citizen = "US Citizen",
    Green_Card = "Green Card",
    Foreign_National = "Foreign National",
    CW_1 = "CW_1",
    CW_2 = "CW_2",
    E_1 = "E_1",
    E_2 = "E_2",
    E_2C = "E_2C",
    E_3 = "E_3",
    EAD = "EAD",
    H_1B = "H_1B",
    H_1B2 = "H_1B2",
    H_1B3 = "H_1B3",
    H_4 = "H_4",
    H_4EAD = "H_4EAD",
    H_1C = "H_1C",
    H_2A = "H_2A",
    H_2B = "H_2B",
    H_3 = "H_3",
    I = "I",
    L_1A = "L_1A",
    L_1B = "L_1B",
    L_2 = "L_2",
    O_1 = "O_1",
    O_2 = "O_2",
    O_3 = "O_3",
    OPT = "OPT",
    P_1A = "P_1A",
    P_1B = "P_1B",
    P_2 = "P_2",
    P_3 = "P_3",
    P_4 = "P_4",
    Q_1 = "Q_1",
    R_1 = "R_1",
    R_2 = "R_2",
    TN = "TN",
    TD = "TD",
}
export const WorkStatusType = [

    { key: 'US_Citizen', value: "US Citizen" },
    { key: 'Green_Card', value: "Green Card" },
    { key: 'Foreign_National', value: "Foreign National" },
    { key: 'CW_1', value: "CW_1" },
    { key: 'CW_2', value: "CW_2" },
    { key: 'E_1', value: "E_1" },
    { key: 'E_2', value: "E_2" },
    { key: 'E_2C', value: "E_2C" },
    { key: 'E_3', value: "E_3" },
    { key: 'EAD', value: "EAD" },
    { key: 'H_1B', value: "H_1B" },
    { key: 'H_1B2', value: "H_1B2" },
    { key: 'H_1B3', value: "H_1B3" },
    { key: 'H_4', value: "H_4" },
    { key: 'H_4EAD', value: "H_4EAD" },
    { key: 'H_1C', value: "H_1C" },
    { key: 'H_2A', value: "H_2A" },
    { key: 'H_2B', value: "H_2B" },
    { key: 'H_3', value: "H_3" },
    { key: 'I', value: "I" },
    { key: 'L_1A', value: "L_1A" },
    { key: 'L_1B', value: "L_1B" },
    { key: 'L_2', value: "L_2" },
    { key: 'O_1', value: "O_1" },
    { key: 'O_2', value: "O_2" },
    { key: 'O_3', value: "O_3" },
    { key: 'OPT', value: "OPT" },
    { key: 'P_1A', value: "P_1A" },
    { key: 'P_1B', value: "P_1B" },
    { key: 'P_2', value: "P_2" },
    { key: 'P_3', value: "P_3" },
    { key: 'P_4', value: "P_4" },
    { key: 'Q_1', value: "Q_1" },
    { key: 'R_1', value: "R_1" },
    { key: 'R_2', value: "R_2" },
    { key: 'TN', value: "TN" },
    { key: 'TD', value: "TD" },

]
export interface Leader {
    name: string;
    jobTitle: string;
    employherLink: string;
    imageUrl: string;
}
