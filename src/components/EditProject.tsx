import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  CREATE_SERVICE_MUTATION,
  GET_PROJECT,
  REMOVE_SERVICE_MUTATION,
} from "../graphql/queries";
import CategoryBadge from "./CategoryBadge";
import Loading from "./Loading";

const Highlight = styled.h1`
  color: var(--bs-primary);
  background-color: var(--bs-dark);
  padding: 0.4rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
`;

export default function EditProject() {
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const [serviceName, setServiceName] = useState("");
  const [serviceCost, setserviceCost] = useState(0);
  const [serviceDescription, setServiceDescription] = useState("");

  const { id } = useParams<{ id: string }>();
  const projectQuery = useQuery(GET_PROJECT, {
    variables: {
      id: parseInt(id!, 10),
    },
  });

  const getProjectQueryRefetch = {
    query: GET_PROJECT,
    variables: {
      id: parseInt(id!, 10),
    },
  };

  const [addServiceMutation] = useMutation(CREATE_SERVICE_MUTATION, {
    refetchQueries: [getProjectQueryRefetch],
  });

  const [removeServiceMutation] = useMutation(REMOVE_SERVICE_MUTATION, {
    refetchQueries: [getProjectQueryRefetch],
  });

  if (projectQuery.loading) {
    return <Loading />;
  }

  const project = projectQuery.data?.Project;

  const projectUsedBudget = project.Services.reduce(
    (acc, service) => acc + service.cost,
    0
  );

  const serviceFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (serviceCost + projectUsedBudget > project.budget) {
      if (alert?.timeoutRef) {
        clearTimeout(alert.timeoutRef);
      }
      const alertTimeoutRef = setTimeout(() => {
        setAlert(null);
      }, 3000);
      setAlert({
        type: "danger",
        message: "Service cost exceeds project budget",
        timeoutRef: alertTimeoutRef,
      });
      return;
    }
    addServiceMutation({
      variables: {
        name: serviceName,
        cost: serviceCost,
        description: serviceDescription,
        projectId: parseInt(id!, 10),
      },
    });
    setServiceName("");
    setserviceCost(0);
    setServiceDescription("");
  };

  const deleteService = (serviceId: number) => {
    removeServiceMutation({
      variables: {
        id: serviceId,
      },
    });
  };

  return (
    <Container className="py-5">
      {alert?.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <Highlight>Project: {project.name}</Highlight>
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => setEditProjectOpen(!editProjectOpen)}
        >
          Edit Project
        </button>
      </div>
      <p>
        <span className="fw-bold me-2">Category:</span>
        <CategoryBadge category={project.Category} />
      </p>
      <p>
        <span className="fw-bold">Budget:</span> R${project.budget}
      </p>
      <p>
        <span className="fw-bold">Used:</span> R${projectUsedBudget}
      </p>
      <hr />
      <div className="d-flex justify-content-between align-items-start mb-4">
        <h2>Add a Service</h2>
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => setAddServiceOpen(!addServiceOpen)}
        >
          {(!addServiceOpen && "Add Service") || "Close"}
        </button>
      </div>
      {addServiceOpen && (
        <form onSubmit={serviceFormSubmit}>
          <div className="mb-3">
            <label htmlFor="inputServiceName" className="form-label">
              Service Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputServiceName"
              value={serviceName}
              onInput={(e) => setServiceName(e.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputBudget" className="form-label">
              Budget
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                id="inputBudget"
                value={serviceCost}
                onInput={(e) =>
                  setserviceCost(parseInt(e.currentTarget.value || 0, 10))
                }
              />
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Service Description
            </label>
            <textarea
              className="form-control"
              id="inputServiceDescription"
              rows={3}
              value={serviceDescription}
              onInput={(e) => setServiceDescription(e.currentTarget.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
      <hr />
      <h2>Services</h2>
      <ServiceGrid>
        {project.Services.map((service: any) => (
          <div className="card" key={service.id}>
            <div className="card-header">{service.name}</div>
            <div className="card-body">
              <div className="">Cost: R${service.cost}</div>
              <div className="text-muted">{service.description}</div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger btn-sm"
                type="button"
                onClick={() => deleteService(service.id)}
              >
                <FaTrashAlt className="me-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </ServiceGrid>
    </Container>
  );
}
