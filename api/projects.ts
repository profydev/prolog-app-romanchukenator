import { axios } from "./axios";
import type { Project } from "./projects.types";
import { ProjectStatus } from "@api/projects.types";

const ENDPOINT = "/project";

export async function getProjects() {
  const { data } = await axios.get<Project[]>(ENDPOINT, {
    transformResponse: [transformProjectsResponse],
  });

  return data;
}

function transformProjectsResponse(data: string) {
  try {
    const json = JSON.parse(data);

    json.forEach((project: Project) => {
      switch (project.status) {
        case "error":
          project.status = ProjectStatus.critical;
          break;
        case "info":
          project.status = ProjectStatus.stable;
          break;
      }
    });

    return json;
  } catch (error) {
    throw Error(
      `[requestClient] Error parsing response JSON data - ${JSON.stringify(
        error,
      )}`,
    );
  }
}
