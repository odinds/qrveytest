import { APIGatewayEvent } from "aws-lambda";

export const NoBody: any & {
  awakenFunction: boolean;
} = {
  method: "post",
  body: null,
  headers: {
    "authorization-extreme": "token",
  },
  awakenFunction: false,
} as any;
