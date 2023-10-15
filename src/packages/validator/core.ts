import dotenv from "dotenv"
import logger from "../logger"

dotenv.config()

type variableTypes = "string" | "number" | "boolean"

type ValidatorProps = {
    [key: string]: variableTypes
}


/* env validator */
export function validate(params: ValidatorProps) {
    logger.info("validating env variables...")
    const envEntries = Object.entries(params)
    for (const [variable, type] of envEntries) {
        const envVariable = process.env[variable] as any

        //validating number type
        if (type === "number") {
            if (isNaN(envVariable)) {
                throwValidationError(variable, type)
            }
        }
        //validating string type
        if (type === "string") {
            const parsedEnv = parseInt(envVariable)
            if (!isNaN(parsedEnv)) {
                throwValidationError(variable, type)
            }
        }
    }
    return
}

function throwValidationError(variable: any, type: variableTypes) {
    logger.error(`env validation failed for ${variable}`)
    throw new Error("Env validation failed")
}




