import { octokit } from "./octokit";

export const getSuccessfulDeploys = async (branch: string) => {
  const repoInfo = process.env.GITHUB_REPOSITORY || "orgNotSpecified/repoNotSpecified";
  const [owner, repo] = repoInfo.split("/");

  const data = await octokit.paginate(
    "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
    {
      owner,
      repo,
      workflow_id: "deploy.yml",
      branch,
      per_page: 100,
    },
    (res) => res.data.flat()
  );

  const failedRuns = data.filter((run) => run.conclusion !== "success").length;
  const passedRuns = data.length - failedRuns;

  return { failedRuns, passedRuns };
};
