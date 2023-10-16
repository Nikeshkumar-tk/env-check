import dotenv from "dotenv"
import logger from "../logger"
import { logErrorMessage } from "../logger/error"

dotenv.config()

export type variableTypes = "string" | "number" | "boolean"

type ValidatorProps = {
    [key: string]: variableTypes
}

type ValidatorFunctionProps = {
    variable: any
}

/**
 * 
 * @param params 
 * @returns 
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

        if (type === "boolean") {
            validateBooleanVariable({ variable: envVariable })
        }

        //validating number type
        if (type === "number") {
            if (isNaN(envVariable)) {
                logErrorMessage({ type: "env_validation_error", variableName: variable, expectedType: "number", currentType: "string", message: "Invalid Type" })
            }
        }

        //validating string type
        if (type === "string") {
            const parsedEnv = parseInt(envVariable)
            if (!isNaN(parsedEnv)) {
                logErrorMessage({ type: "env_validation_error", variableName: variable, expectedType: "string", currentType: "number", message: "Invalid Type" })
            }
        }
    }
    logger.log(1, "SUCCESS", "Env validations completed")
    return
}

/**
 * 
 * @param env_var_data 
 * @returns 
 */
function validateBooleanVariable(env_var_data: ValidatorFunctionProps) {

    if (env_var_data.variable !== "true" && env_var_data.variable !== "false") {
        logErrorMessage({ type: "env_validation_error", currentType: "string", expectedType: "boolean", variableName: env_var_data.variable, message: "" })
    }
    return
}






