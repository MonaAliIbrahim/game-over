import React, { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Components/Navbar/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './MasterLayout.scss';
import Loading from '../Shared/Components/Loading/Loading';

export default function MasterLayout() {
  return (
    <Fragment>
      <Header/>
      <main>
        <Container>
          <Row style={{minHeight: '100vh', padding: '65px 0 40px'}}>
            <Suspense fallback={<Loading/>}>
              <Outlet/>
            </Suspense>
          </Row>
        </Container>
      </main>
    </Fragment>
  )
}
