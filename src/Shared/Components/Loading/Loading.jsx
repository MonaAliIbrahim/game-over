import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { SpinnerDiamond } from 'spinners-react';

export default function Loading() {
  return (
    <Row className="justify-content-center align-items-center">
      <Col className='text-center py-5 my-5' xs={12}>
        <SpinnerDiamond 
          size={90} 
          thickness={180} 
          speed={95} 
          color="rgba(73, 172, 255, 1)" 
          secondaryColor="rgba(39, 42, 47, 1)" 
        />
      </Col>
    </Row>
  )
}
