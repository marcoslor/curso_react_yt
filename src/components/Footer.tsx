import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';

const IconsList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    color: var(--bs-light);
    padding: 0;
    font-size: x-large;
    gap: 1.8rem;
    
    li:hover {
        color: var(--bs-primary);
    }
`

const Footer = () => {
    return (
        <footer className="footer bg-dark mt-auto py-5">
            <IconsList>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </IconsList>
            <p className='text-light text-center'><span className="text-primary fw-bold">Costs</span> &copy; 2023</p>
        </footer>
    )
}

export default Footer