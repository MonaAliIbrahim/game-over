import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000)
  }, []);

  return (
    <Row className={`${styles.notFound} justify-content-center align-items-center`}>
      <Col className='text-center'>
        <h2>4 0 4</h2>
        <h4>OOPS</h4>
        <img src={require('../../Assets/Images/notfound-image.png')} alt="Not-Found"/>
      </Col>
    </Row>
  )
}
