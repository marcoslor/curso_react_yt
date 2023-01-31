import { Container } from "react-bootstrap";

export default function Loading() {
  return (
    <Container className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  );
}
