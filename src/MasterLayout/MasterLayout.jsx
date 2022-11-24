import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Components/Navbar/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './MasterLayout.scss';

export default function MasterLayout() {
  return (
    <Fragment>
      <Header/>
      <main>
        <Container>
          <Row style={{minHeight: '100vh', padding: '65px 0 40px'}}>
            <Outlet/>
          </Row>
        </Container>
      </main>
    </Fragment>
  )
}
