import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { ALL_CATEGORIES, CREATE_PROJECT_MUTATION } from "../graphql/queries";
import { Category } from "../graphql/types";

function CreateProject() {
  const categories = useQuery(ALL_CATEGORIES);
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [category, setCategory] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProject({
      variables: {
        name,
        budget,
        categoryId: category,
        cost: 0,
      },
    });
  };

  if (categories.loading) {
    return (
      <Container className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="text-center">
            <h1>Create Project</h1>
            <p className="text-muted">Create your project and add services</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
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
                  value={budget}
                  onInput={(e) =>
                    setBudget(parseInt(e.currentTarget.value || 0, 10))
                  }
                />
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputCategory" className="form-label">
                Project category
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="inputCategory"
                value={category}
                onChange={(e) =>
                  setCategory(parseInt(e.currentTarget.value, 10))
                }
              >
                {categories.data.allCategories.map((category: Category) => (
                  // eslint-disable-next-line jsx-a11y/control-has-associated-label
                  <option key={category.id} value={category.id}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default CreateProject;
