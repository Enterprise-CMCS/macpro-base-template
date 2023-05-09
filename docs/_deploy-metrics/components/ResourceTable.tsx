import * as UI from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { Resource } from "../lib/getAwsResources";

export const ResourceTable = ({ data }: { data: Resource[] }) => (
  <UI.Table size="sm">
    <UI.Thead>
      <UI.Tr>
        <UI.Th>
          <UI.HStack spacing="3">
            <UI.HStack spacing="1">
              <UI.Text>Type</UI.Text>
            </UI.HStack>
          </UI.HStack>
        </UI.Th>
        <UI.Th>Status</UI.Th>
        <UI.Th>ID</UI.Th>
        <UI.Th>Last Updated</UI.Th>
        <UI.Th>Stack</UI.Th>
      </UI.Tr>
    </UI.Thead>
    <UI.Tbody>
      {data.map((d) => (
        <UI.Tr key={d.PhysicalResourceId}>
          <UI.Td>
            <UI.HStack spacing="3">
              <UI.Box>
                <UI.Text fontWeight="medium">{d.ResourceType}</UI.Text>
              </UI.Box>
            </UI.HStack>
          </UI.Td>
          <UI.Td>
            <UI.Badge
              size="sm"
              colorScheme={
                d.ResourceStatus.includes("FAILED") ? "red" : "green"
              }
            >
              {d.ResourceStatus.includes("FAILED") ? "failed" : "healthy"}
            </UI.Badge>
          </UI.Td>
          <UI.Td>
            <UI.Text isTruncated maxW="100%" w="100%" fontSize="md">
              {d.LogicalResourceId.length > 45
                ? `${d.LogicalResourceId.slice(0, 45)}...`
                : d.LogicalResourceId}
            </UI.Text>
          </UI.Td>
          <UI.Td>
            <UI.Text color="muted">
              {formatDistance(new Date(d.LastUpdatedTimestamp), new Date())} ago
            </UI.Text>
          </UI.Td>
          <UI.Td>
            <UI.Text color="muted">{d.StackName}</UI.Text>
          </UI.Td>
        </UI.Tr>
      ))}
    </UI.Tbody>
  </UI.Table>
);
