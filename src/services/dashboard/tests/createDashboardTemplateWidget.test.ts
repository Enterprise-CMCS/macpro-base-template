import { it, describe, expect, beforeEach, afterEach } from "vitest";
import { CloudWatch } from "@aws-sdk/client-cloudwatch";
import { mockClient } from "aws-sdk-client-mock";
import { handler } from "../handlers/createDashboardTemplateWidget";
import type {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  Context,
} from "aws-lambda";

const cloudWatchClientMock = mockClient(new CloudWatch({}));

describe("templatize cloudwatch dashboard", () => {
  beforeEach(() => {
    process.env.lambdaArnToCall = "test-arn";
  });

  it("should return successful create dashboard template widget", async () => {
    const html = `
      <div style="width: 100%; display: flex; justify-content: center;">
        <a class="btn btn-primary">Get Dashboard Template</a>
      </div>
      <cwdb-action action="call" endpoint="test-arn" display="popup">  
       {}
      </cwdb-action> 
      `;

    const result = await handler(
      {} as APIGatewayEvent,
      {} as Context,
      {} as APIGatewayProxyCallback
    );

    expect(result).toEqual(html);
  });

  it("should return unsuccessful create dashboard template widget", async () => {
    const html = `
      <div style="width: 100%; display: flex; justify-content: center;">
        <a class="btn btn-primary">Get Dashboard Template</a>
      </div>
      <cwdb-action action="call" endpoint="test-arns" display="popup">  
       {}
      </cwdb-action> 
      `;

    const result = await handler(
      {} as APIGatewayEvent,
      {} as Context,
      {} as APIGatewayProxyCallback
    );

    expect(result).not.toEqual(html);
  });
});