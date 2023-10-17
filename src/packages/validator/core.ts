import dotenv from "dotenv"
import logger from "../logger"
import { logErrorMessage } from "../logger/error"

dotenv.config()

export type VariableTypes = "string" | "number" | "boolean" | "email"

type ValidatorProps = {
    [key: string]: VariableTypes
}

type ValidatorFunctionProps = {
    variable: any
}

/**
 * 
 * @param params 
 * @description validate environment variables
 * @returns null 
 */
export function validate(params: ValidatorProps) {
    logger.info("validating env variables...")
    const envEntries = Object.entries(params)
    for (const [variable, type] of envEntries) {
        const envVariable = process.env[variable] as any

        //Null check
        if (!envVariable) {
            logErrorMessage({ type: "null_check_error", variableName: variable })
        }

        const validationProps = {
            variable: envVariable
        }

        //Boolean validation
        if (type === "boolean") {
            validateBooleanVariable(validationProps)
        }

        //validating number type
        if (type === "number") {
            validateNumberVariable(validationProps)
        }

        //validating string type
        if (type === "string") {
            validateStringVariable(validationProps)
        }
    }
    logger.log(1, "SUCCESS", "Env validations completed")
    return
}

/**
 * 
 * @param env_var_data 
 * @description validation for boolean variable
 * @returns 
 */
function validateBooleanVariable(env_var_data: ValidatorFunctionProps) {

    if (env_var_data.variable !== "true" && env_var_data.variable !== "false") {
        let currentType:VariableTypes = "" as VariableTypes
        if (isNaN(env_var_data.variable)) {
            currentType = "string"
        }else{
            currentType = "number"
        }

        logErrorMessage({ type: "env_validation_error", currentType, expectedType: "boolean", variableName: env_var_data.variable, message: "" })
    }
    return
}


/**
 * 
 * @param env_var_data 
 * @description validation for number variable
 * @returns null
 */
function validateNumberVariable(env_var_data: ValidatorFunctionProps) {
    if (isNaN(env_var_data.variable)) {
        logErrorMessage({ type: "env_validation_error", variableName: env_var_data.variable, expectedType: "number", currentType: "string", message: "Invalid Type" })
    }
    return
}


/**
 * 
 * @param env_var_data 
 * @description validation for string variable
 * @returns null
 */

function validateStringVariable(env_var_data: ValidatorFunctionProps) {
    const parsedEnv = parseInt(env_var_data.variable)
    if (!isNaN(parsedEnv)) {
        logErrorMessage({ type: "env_validation_error", variableName: env_var_data.variable, expectedType: "string", currentType: "number", message: "Invalid Type" })
    }
    return
}






