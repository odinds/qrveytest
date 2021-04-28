import { APIGatewayEvent } from "aws-lambda";

export const AwakenFunction: any & {
  awakenFunction: boolean;
} = {
  method: "post",
  body: JSON.stringify({}),
  headers: {},
  awakenFunction: true,
} as any;
