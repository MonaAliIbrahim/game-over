import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetResponse } from '../../Redux/AuthSlice';
import Categories from '../../Data/Categories.ts';
import SortBy from '../../Data/Sort-By.ts';
import styles from './NavBar.module.scss';

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);

  let handleLogout = () => {
    localStorage.removeItem('userToken');
    dispatch(resetResponse());
    setIsLoggedIn(false);
    navigate('/login');
  }

  useEffect(() => {
    if(userToken){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  },[userToken])

  useEffect(() => {
    setCategories(Categories);
  },[categories])

  let renderCategoryCallbak = useCallback(() => {
    return(
      categories.map((category, idx) => (
        <NavDropdown.Item key={idx} eventKey={idx}>{category.name}</NavDropdown.Item>
      ))
    )
  },[categories])

  let renderSortByCallback = useCallback(() => {
    return(
      SortBy.map((sort, idx) => (
        <NavDropdown.Item key={idx} eventKey={idx}>{sort.name}</NavDropdown.Item>
      ))
    )
  }, [])

  let renderPlatforsmCallback = useMemo(() => {
    const platforms = ['PC','Browser'];
    return(
      platforms.map((platform, idx) => (
        <NavDropdown.Item key={idx} eventKey={idx}>{platform}</NavDropdown.Item>
      ))
    )
  }, [])

  let getGamesByFilter = (e, type) => {
    let name = e.target.innerText.toLowerCase();
    navigate(`/games/${type}/${name}`);
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.navBar} fixed-top`}>
      <Container>
        <Navbar.Brand>
          <img 
            src={ require('../../../Assets/Images/logo.png') } 
            width="50"
            alt="Website Logo"
            className="d-inline-block align-top me-1"/>
          <Link to="">Game Over</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className={styles.btnToggle}/>
        <Navbar.Collapse id="navbarScroll">
          {isLoggedIn &&
          <Nav className={`me-auto my-2 my-lg-0 ${styles.nav}`} navbarScroll>
            <Nav.Item>
              <Nav.Link to="" eventKey={1} as={Link}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/all" eventKey={2} as={Link}>All</Nav.Link>
            </Nav.Item>
            <NavDropdown 
              title="Platforms" 
              id="navbarScrollingDropdown" 
              onSelect={(eventKey, event) => getGamesByFilter(event,'platform')}>
              {renderPlatforsmCallback}
            </NavDropdown>
            <NavDropdown 
              title="Sort-by" 
              id="navbarScrollingDropdown" 
              onSelect={(eventKey, event) => getGamesByFilter(event,'sort')}>
              {renderSortByCallback()}
            </NavDropdown>
            <NavDropdown 
              title="Categories" 
              id="navbarScrollingDropdown" 
              onSelect={(eventKey, event) => getGamesByFilter(event,'category')}>
              {renderCategoryCallbak()}
            </NavDropdown>
          </Nav>}
          {!isLoggedIn &&
          <Link className="ms-auto btn btn-outline-danger" to="/login">Login</Link>}
          {isLoggedIn &&
          <Button variant="outline-primary" className="ms-auto" onClick={handleLogout}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
