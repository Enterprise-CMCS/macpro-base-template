import { it, describe, expect, beforeEach, afterEach } from "vitest";
import { CloudWatch, GetDashboardCommand } from "@aws-sdk/client-cloudwatch";
import { mockClient } from "aws-sdk-client-mock";
import { handler } from "../handlers/templatizeCloudWatchDashboard";
import type {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  Context,
} from "aws-lambda";
const CloudWatchInstance = new CloudWatch({});
// const dashboard = CloudWatchInstance.getDashboard({
//   DashboardName: "test-service-test-stage",
// });

const cloudWatchClientMock = mockClient(CloudWatchInstance);

describe("templatize cloudwatch dashboard", () => {
  beforeEach(() => {
    process.env.region = "test-region";
    process.env.stage = "test-stage";
    process.env.accountId = "ac-test-0123";
    process.env.service = "test-service";
  });

  afterEach(() => {
    cloudWatchClientMock.reset();
  });

  it("should return successful metric response", async () => {
    const metricResponse = {
      $metadata: {
        httpStatusCode: 200,
        requestId: "d8680883-37ca-49e4-8619-e43d1e3a391b",
        attempts: 1,
        totalRetryDelay: 0,
      },
    };
    cloudWatchClientMock.on(GetDashboardCommand).resolves(metricResponse);

    const result = await handler(
      {} as APIGatewayEvent,
      {} as Context,
      {} as APIGatewayProxyCallback
    );

    expect(result).toEqual(metricResponse);
  });
});
