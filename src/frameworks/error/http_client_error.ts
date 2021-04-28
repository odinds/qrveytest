import {BaseHttpError} from "./base_http_error";
//import {localeService} from "../../config/project_dependencies";

/**
 * Exception for requests without body.
 */
export class NullBodyException extends BaseHttpError {
  constructor(data: any) {
    super("Body null error", 400, 1, data);
  }
}

/**
 * Exception for requests with invalid parameters.
 */
export class InvalidParamsException extends BaseHttpError {
  constructor(data: any) {
    super('Invalid parameters', 400, 2, data);
  }
}

/**
 * Exception for requests with invalid JSON body.
 */
export class InvalidJsonException extends BaseHttpError {
  constructor(data: any) {
    super('Invalid Json', 400, 3, data);
  }
}

/**
 * Exception for entity not found error.
 */
export class UnprocessableEntityException extends BaseHttpError {
  constructor(data: any) {
    super('Entity not found', 422, 4, data);
  }
}

/**
 * Exception for entity is deleted.
 */
export class DeletedEntityException extends BaseHttpError {
  constructor(data: any) {
    super('Entity deleted', 422, 5, data);
  }
}
