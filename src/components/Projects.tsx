import CategoryBadge from './CategoryBadge';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { ALL_PROJECTS } from '../graphql/queries';
import { type Project } from '../graphql/types';

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1rem;
`

const PlaceholderCard = () =>
(
    <div className="card" aria-hidden="true">
        <div className="card-header placeholder-glow">
            <span className="placeholder col-6"></span>
        </div>
        <div className="card-body">
            <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-7"></span>
            </p>
        </div>
        <div className="card-footer placeholder-glow">
            <div className="d-flex">
                <a href="#" className="btn btn-primary disabled placeholder col-3 me-2" aria-disabled="true"></a>
                <a href="#" className="btn btn-danger disabled placeholder col-3" aria-disabled="true"></a>
            </div>
        </div>
    </div>
)

const ProjectCard = ({ project } : {project: Project}) => (
    <div className="card">
        <div className="card-header">
            {project.name}
        </div>
        <div className="card-body">
            <div className="">Budget: R${project.budget}</div>
            <div className=""><CategoryBadge category={project.Category} /></div>
        </div>
        <div className="card-footer">
            <div className="d-flex">
                <Link to="/projects/1" className="btn btn-primary me-2 btn-sm"><FaPencilAlt className="me-2" />Edit</Link>
                <button className="btn btn-danger btn-sm"><FaTrashAlt className="me-2" />Delete</button>
            </div>
        </div>
    </div>
)

const Projects = () => {
    const projectsQuery = useQuery(ALL_PROJECTS)

    // type AllProjectsDocument
    const projects = projectsQuery.data?.allProjects as Array<Project>

    console.log({ projects })
    
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h1>My Projects</h1>
                <Link to={'/projects/create'} className="btn btn-dark">Create Project</Link>
            </div>
            <ProjectGrid>
                {projectsQuery.loading && Array.from({ length: 3 }).map((_, i) => <PlaceholderCard key={i} />) ||
                   projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </ProjectGrid>
        </Container>
    );
}

export default Projects;