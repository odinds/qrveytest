import {BaseHttpError} from "./base_http_error";
//import {localeService} from "../../config/project_dependencies";

/**
 * Exception for internal server errors.
 */
export class InternalServerException extends BaseHttpError {
  constructor(data: any) {
    super("Error interno", 500, 1, data);
  }
}

/**
 * Exception for contract methods that were not implemented.
 */
export class NotImplementedMethodException extends BaseHttpError {
  constructor(data: any) {
    super('No method implemented', 500, 2, data);
  }
}
