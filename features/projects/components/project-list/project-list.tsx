import { ProjectCard } from "../project-card";
import { LoadingSpinner, AlertBanner } from "@features/ui";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    console.error(error);
    return (
      <AlertBanner
        message={error.message}
        action={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <ul className={styles.list} data-cy="project-list">
      {typeof data == "string"
        ? ""
        : data?.map((project) => (
            <li key={project.id} data-cy="project-list_projectCard">
              <ProjectCard project={project} />
            </li>
          ))}
    </ul>
  );
}
