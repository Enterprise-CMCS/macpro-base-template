import * as UI from "@chakra-ui/react";
import { useState } from "react";
import { Resource } from "../lib/getAwsResources";
import { getStackOptions, getTypeOptions } from "../lib/getFilterOptions";
import { CheckboxFilterPopover } from "./CheckboxFilterPopover";
import { ResourceTable } from "./ResourceTable";

export const Resources = ({ data }: { data: Resource[] }) => {
  const [typeFilter, setTypeFilter] = useState({ options: [] });
  const [stackFilter, setStackFilter] = useState({ options: [] });

  console.log({ data });

  return (
    <UI.Container maxW="8xl">
      <UI.Box
        bg="bg-surface"
        boxShadow={{ base: "none", md: "sm" }}
        borderRadius={{ base: "none", md: "lg" }}
      >
        <UI.Stack spacing="5">
          <UI.Box px={{ base: "4", md: "6" }} pt="5">
            <UI.Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              <UI.Text fontSize="lg" fontWeight="medium">
                Resources
              </UI.Text>
              <UI.Stack direction="row" justify="space-between">
                <CheckboxFilterPopover
                  label="Type"
                  options={getTypeOptions(data)}
                  onSubmit={(options) => setTypeFilter({ options })}
                />
                <CheckboxFilterPopover
                  label="Stack"
                  options={getStackOptions(data)}
                  onSubmit={(options) => setStackFilter({ options })}
                />
              </UI.Stack>
            </UI.Stack>
          </UI.Box>
          <UI.Box overflowX="auto">
            <ResourceTable data={data} />
          </UI.Box>
        </UI.Stack>
      </UI.Box>
    </UI.Container>
  );
};
