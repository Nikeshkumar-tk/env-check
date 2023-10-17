import logger from ".";
import { VariableTypes } from "../validator";
import { ERROR_CODE_MESSAGE_MAPPER } from "./contants";

type EnvValidationErrorType = {
    type: "env_validation_error"
    expectedType: VariableTypes
    currentType: VariableTypes
}

type BasicErrorLogType = {
    message?: any,
    variableName: string 
}

type LogErrorMessageTypeProps = BasicErrorLogType & (EnvValidationErrorType | { type: "null_check_error" })

/**
 * 
 * @param err_params 
 * @description Logs the error message and throws error
 */
export function logErrorMessage(err_params: LogErrorMessageTypeProps) {
    const error_message = ERROR_CODE_MESSAGE_MAPPER[err_params.type]
    let error_meta = getErrorMetaData({ ...err_params })
    logger.error(`${error_message} ${error_meta}`)
    throw new Error(error_message)
}


/**
 * 
 * @param params 
 * @returns Error Meta Data
 */
function getErrorMetaData(err_meta_params: Omit<BasicErrorLogType, "message"> & (EnvValidationErrorType | { type: "null_check_error" })) {
    let meta_data
    if (err_meta_params.type === "env_validation_error") {
        meta_data = `Env validation failed for ${err_meta_params.variableName}. Expected type is ${err_meta_params.expectedType}, got ${err_meta_params.currentType} `
    }

    if(err_meta_params.type === "null_check_error"){
        meta_data = `Encoundered null value for ${err_meta_params.variableName}. Verify wheather it is provided in your .env file`
    }

    return meta_data
}