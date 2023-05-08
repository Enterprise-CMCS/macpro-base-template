import type { InferGetStaticPropsType } from "next";
import { getAwsResources } from "../../lib/getAwsResources";
import {
  Divider,
  Container,
  Heading,
  Text,
  Select,
  HStack,
} from "@chakra-ui/react";
import { Resources } from '../../components/Resources'
import { octokitBranchesToUse } from "../../lib/octokit";
import { useState } from "react";
import packageJson from "../../../../package.json";

export const getStaticProps = async () => {
  const branchData: {
    [name: string]: {
      resources: Awaited<ReturnType<typeof getAwsResources>>;
    };
  } = {};

  for (const branch of octokitBranchesToUse!) {
    const resources = await getAwsResources(branch)

    branchData[branch] = {
        resources
    };
  }

  return {
    props: {
      branchData,
      branches: octokitBranchesToUse,
      repoName: process.env?.REPO_NAME ?? packageJson.name.toUpperCase(),
    },
  };
};

const Aws = ({
  branchData,
  repoName,
  branches,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [selectedBranch, setSelectedBranch] = useState<string>(branches![0]);

  const {resources} = branchData[selectedBranch];

  return (
    <Container centerContent maxW='8xl'>
      <Heading as="h1">AWS Resources</Heading>
      <Heading as="h2">{repoName}</Heading>
      <HStack pt={"4"}>
        <Text flex={2}>Currently viewing data for</Text>
        <Select
          flex={1}
          value={selectedBranch}
          onChange={(newValue) =>
            setSelectedBranch(newValue.currentTarget.value)
          }
        >
          {branches?.map((branch, index) => (
            <option key={index} value={branch}>
              {branch.toUpperCase()}
            </option>
          ))}
        </Select>
      </HStack>
      <Divider my={5} />
      {resources && <Resources data={resources}/>}
    </Container>
  );
};

export default Aws;
