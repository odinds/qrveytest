import { APIGatewayEvent } from "aws-lambda";

const body = {
  rqUID: "ae9b4d90-5a66-4386-8aa6-9174ae8ddc43",
  msgRqHdr: {
    credentialsRsHdr: {
      seqNum: "123456",
    },
    contextRqHdr: {
      channelId: "vcc",
    },
  },
  customerInfo: {
    cis: "948752",
  },
  debitCardInfo: {
    cardHolder: "Pedro Pérez",
    cardPin: "1530",
    acctInfo: {
      acctId: "99887766",
      acctType: "0",
      curType: "997",
    },
    cardOtherInfo: {
      id: "81231234",
      idType: "C",
      entityType: "17f1643a-db9a",
      bin: "123456",
      categoryType: "ABC",
      productType: "01",
      groupType: "002",
      modelNumber: "01",
      printed: "1",
      oficinaDestino: "1234",
      codOficinaDestino: "1234"
    },
    cardServices: [
      { serviceType: "SMS", active: "S", novelty: "novelty1" },
      { serviceType: "SEB", active: "N", novelty: "novelty2" },
    ],
  },
  dueDate: "2020-12-12",
};

export const ExtremeReverse: APIGatewayEvent & {
  awakenFunction: boolean;
} = {
  httpMethod: "DELETE",
  body: JSON.stringify(body),
  headers: {
    "authorization-extreme": "token",
  },
  awakenFunction: false,
} as any;