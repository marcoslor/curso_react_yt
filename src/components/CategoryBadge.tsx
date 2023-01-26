import styled from "styled-components";
import { type Category } from "../graphql/types";

const Capitalized = styled.span`
  text-transform: capitalize;
`;

const Dot = styled.span`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span>
      <Dot style={{ backgroundColor: category.color }} />
      <Capitalized>{category.name}</Capitalized>
    </span>
  );
}

export default CategoryBadge;
