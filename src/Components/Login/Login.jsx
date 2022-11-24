import React, { useState, useEffect, useRef } from 'react';
import styles from './Login.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Fade from 'react-bootstrap/Fade';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetResponse } from '../../Shared/Services/Action/AuthAction';
import Joi from 'joi';

export default function Login() {

  const isLoggedIn = localStorage.getItem('userToken');
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const emailErrorRef = useRef();
  const passwordErrorRef = useRef();
  
  const dispatch = useDispatch();
  const responseMsg = useSelector(state => state.auth.message);
  const responseFlag = useSelector(state => state.auth.flag);
  const [serverResponse, setServerResponse] = useState(false);

  const navigate = useNavigate();

  let getUserData = (e) => {
    let userData = {...user};
    userData[e.target.name] = e.target.value;
    setUser(userData);
  }

  let checkValidation = () => {
    // Reset Prev Error Validation
    setErrors([]);
    emailErrorRef.current.innerText = '';
    passwordErrorRef.current.innerText = '';

    // Create Schema
    let schema = Joi.object({
      email: Joi.string().required().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
      password: Joi.string().required().min(6)
    });

    // Get Validation Response
    let { error } = schema.validate(user, {abortEarly: false});
    return error;
  }

  let submitForm = (e) => {
    e.preventDefault();
    let error = checkValidation();
    if(error) {
      setErrors(error.details);
    }
    else {
      setServerResponse(false);
      dispatch(login(user));
    }
  }

  useEffect(() => {
    if(errors.length > 0) {
      // Show Errors to user
      for(const error of errors) {
        if(error.context.key === 'email') {
          setShowEmailError(true);
          emailErrorRef.current.innerText = error.message.replace('"email"','email');
        }
        if(error.context.key === 'password') {
          passwordErrorRef.current.innerText = error.message.replace('"password"','password');
          setShowPasswordError(true);
        }
      }
    }
  }, [errors])

  useEffect(() => {
    if(responseFlag === 'success') {
      navigate('/');
    }else {
      if(responseMsg && responseMsg.length > 0) {
        setServerResponse(true);
      }
    }
  }, [responseMsg, responseFlag, navigate])

  useEffect(() => {
    return(() => {
      dispatch(resetResponse());
    })
  }, [dispatch])

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/')
    }
  },[isLoggedIn, navigate])

  return (
    <Row className="justify-content-center align-items-center">
      <Card className={styles.card}>
        <Card.Body className="p-0">
          <Row>
            <Col md={6} className="sign-img"
              style={{backgroundImage: `url(${require('../../Assets/Images/gaming.jpg')})`}}>            
            </Col>
            <Col md={6} className="sign-content px-5 py-4">
              <Card.Img src={require('../../Assets/Images/logo.png')} className="d-inline-block"/>
              <Card.Title className="my-3">Log in to GameOver</Card.Title>
              {serverResponse && responseMsg &&
              <Alert variant={responseFlag === 'success' ? 'success' : 'danger'} className='text-capitalize p-2'>
                {responseMsg}
              </Alert>}
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                  <Form.Control type="email" onChange={getUserData} name="email" placeholder="Email"/>
                  <Fade in={showEmailError}>
                    <div className='text-danger mt-2 text-capitalize' ref={emailErrorRef}></div>
                  </Fade>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" onChange={getUserData} name="password" placeholder="Password"/>
                  <Fade in={showPasswordError}>
                    <div className='text-danger mt-2 text-capitalize' ref={passwordErrorRef}></div>
                  </Fade>
                </Form.Group>
                <Button type="submit" className="d-block w-100">Login</Button>
              </Form>
              <Card.Text className="content-footer pt-3 mt-4">
                Not a member yet ? 
                <Link to="/register" className="mx-2">Create Account</Link>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Row>
  )
}