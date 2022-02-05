export declare type ApiError = {
    statusCode: number;
    errorMessage: string;
};
export declare function isApiError(val: any): val is ApiError;
export declare type LocationInput = {
    city: string;
    region: string;
    countryCode: string;
    country: string;
};
export declare enum Environment {
    LOCAL = "local",
    DEVO = "devo",
    PROD = "prod"
}
export declare type S3Location = {
    bucket: string;
    key: string;
};
export declare enum WorkStatus {
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
    TD = "TD"
}
