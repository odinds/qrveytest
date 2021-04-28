import { APIGatewayEvent } from "aws-lambda";

export const NoAuthorizationExtreme: any & {
  awakenFunction: boolean;
} = {
  method: "post",
  body: {},
  headers: {},
  awakenFunction: false,
} as any;
