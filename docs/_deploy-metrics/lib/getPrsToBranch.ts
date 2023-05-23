import { octokit } from "./octokit";
import differenceInHours from "date-fns/differenceInHours";

export const getPrsToBranch = async (branch: string) => {
  const repoInfo = process.env.GITHUB_REPOSITORY || "orgNotSpecified/repoNotSpecified";
  const [owner, repo] = repoInfo.split("/");

  const data = await octokit.paginate(
    "GET /repos/{owner}/{repo}/pulls",
    {
      owner,
      repo,
      state: "closed",
      per_page: 100,
      base: branch,
    },
    (res) => res.data.flat()
  );

  const timesToMergePrs = data
    .filter((pr) => pr.merged_at && pr.created_at)
    .map((pr) => ({
      hours: differenceInHours(
        new Date(pr.merged_at!),
        new Date(pr.created_at!)
      ),
    }));
  const averageTimeToMerge =
    timesToMergePrs.reduce((total, { hours }) => total + hours, 0) /
      timesToMergePrs.length || 0;

  return { timesToMergePrs, averageTimeToMerge };
};
