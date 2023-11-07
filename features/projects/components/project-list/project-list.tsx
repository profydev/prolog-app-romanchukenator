import { ProjectCard } from "../project-card";
import { LoadingSpinner } from "@features/ui";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error } = useGetProjects();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul data-cy="project-list_projectCards" className={styles.list}>
      {data?.map((project) => (
        <li data-cy="project-list_projectCard" key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
