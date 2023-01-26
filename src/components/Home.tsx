import { Container } from "react-bootstrap"
import styled from "styled-components"
import savings from "../assets/img/savings.svg"

const Highlight = styled.span`
    color: var(--bs-primary);
    background-color: var(--bs-dark);
    padding: 0.4rem;
`

const Home = () => {
    return <>
        <Container className="text-center pt-5">
            <h1 className="fw-bold">Welcome to <Highlight>Costs</Highlight></h1>
            <p className="text-muted my-4">Start to manage your projects and costs!</p>
            <a className="btn btn-dark">Create Project</a>
            <div className="pt-5">
                <img src={savings} alt="" style={{width: "24rem"}}/>
            </div>
        </Container>
    </>
}

export default Home