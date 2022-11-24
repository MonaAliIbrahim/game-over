import React, { useState, useEffect, useRef } from 'react';
import styles from './Register.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Fade from 'react-bootstrap/Fade';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, resetResponse } from '../../Shared/Services/Action/AuthAction';
import Joi from 'joi';

export default function Register() {

  const [user, setUser] = useState({
    first_name: '', last_name: '', age: '', email: '', password: ''
  });
  const [errors, setErrors] = useState([]);

  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [showAgeError, setShowAgeError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  
  const firstNameErrorRef = useRef();
  const lastNameErrorRef = useRef();
  const ageErrorRef = useRef();
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
    firstNameErrorRef.current.innerText = '';
    lastNameErrorRef.current.innerText = '';
    emailErrorRef.current.innerText = '';
    ageErrorRef.current.innerText = '';
    passwordErrorRef.current.innerText = '';

    // Create Schema
    let schema = Joi.object({
      first_name: Joi.string().required().pattern(/^[a-zA-Z]{3,20}$/),
      last_name: Joi.string().required().pattern(/^[a-zA-Z]{3,20}$/),
      email: Joi.string().required().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
      age: Joi.number().required().min(12).max(99),
      password: Joi.string().required().min(6).pattern(/[0-9]+/).pattern(/[a-z]+/).pattern(/[@#$%^&*+=_!]+/)
    });

    // Get Validation Response
    let { error } = schema.validate(user, {abortEarly: false});
    return error;
  }

  let Signup = (e) => {
    e.preventDefault();
    let error = checkValidation();
    if(error) {
      setErrors(error.details);
    }
    else {
      setServerResponse(false);
      dispatch(signUp(user));
    }
  }

  useEffect(() => { 
    if(errors.length > 0) {
      // Handle Validation Error Message
      for(const error of errors) {
        // First Name
        if(error.context.key === 'first_name') {
          if(error.type.includes('pattern')) {
            firstNameErrorRef.current.innerText = "First Name must contain at least 3 Characters of letters only";
          }else {
            firstNameErrorRef.current.innerText = error.message.replace('"first_name"','First Name');
          }
          setShowFirstNameError(true);
        }
        // Last Name
        if(error.context.key === 'last_name') {
          if(error.type.includes('pattern')) {
            lastNameErrorRef.current.innerText = "Last Name must contain at least 3 Characters of letters only";
          }else {
            lastNameErrorRef.current.innerText = error.message.replace('"last_name"','Last Name');
          }
          setShowLastNameError(true);
        }
        // Email
        if(error.context.key === 'email') {
          setShowEmailError(true);
          emailErrorRef.current.innerText = error.message.replace('"email"','email');
        }
        // Age
        if(error.context.key === 'age') {
          setShowAgeError(true);
          ageErrorRef.current.innerText = error.message.replace('"age"','age');
        }
        // Password
        if(error.context.key === 'password') {
          if(error.type.includes('pattern')) {
            passwordErrorRef.current.innerText = "Password must contain at least 6 Characters of letters & numbers and special characters";
          }else {
            passwordErrorRef.current.innerText = error.message.replace('"password"','password');
          }
          setShowPasswordError(true);
        }
      }
    }
  }, [errors])

  useEffect(() => {
    if(responseFlag === 'success') {
      setServerResponse(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000)
    }else {
      if(responseMsg.length > 0) {
        setServerResponse(true);
      }
    }
  }, [responseMsg, responseFlag, navigate])

  useEffect(() => {
    return(() => {
      dispatch(resetResponse());
    })
  }, [dispatch])

  return (
    <Row className="justify-content-center align-items-center">
      <Col>
        <Card className={`sign-content py-2 px-4 px-md-5 ${styles.card}`}>
        <Card.Body>
          <Card.Img src={require('../../Assets/Images/logo.png')} className="d-inline-block"/>
          <Card.Title className="py-3">Create My Account!</Card.Title>
          {serverResponse && responseMsg &&
            <Alert variant={responseFlag === 'success' ? 'success' : 'danger'} className='text-capitalize p-2'>
              {responseMsg}
            </Alert>}
          <Form onSubmit={Signup} className="row">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={getUserData} name="first_name" placeholder="First Name" maxLength="20"/>
                <Fade in={showFirstNameError}>
                  <div className='text-danger mt-2 text-capitalize' ref={firstNameErrorRef}></div>
                </Fade>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={getUserData} name="last_name" placeholder="Last Name" maxLength="20"/>
                <Fade in={showLastNameError}>
                  <div className='text-danger mt-2 text-capitalize' ref={lastNameErrorRef}></div>
                </Fade>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Control type="email" onChange={getUserData} name="email" placeholder="Email"/>
                <Fade in={showEmailError}>
                  <div className='text-danger mt-2 text-capitalize' ref={emailErrorRef}></div>
                </Fade>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Control type="number" onChange={getUserData} name="age" placeholder="Age"/>
                <Fade in={showAgeError}>
                  <div className='text-danger mt-2 text-capitalize' ref={ageErrorRef}></div>
                </Fade>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Control type="password" onChange={getUserData} name="password" placeholder="Password"/>
                <Fade in={showPasswordError}>
                  <div className='text-danger mt-2 text-capitalize' ref={passwordErrorRef}></div>
                </Fade>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button type="submit" className="w-100">Register</Button>
            </Col>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Card.Text className="my-2">
            Not a member yet ? 
            <Link to="/login" className="mx-2">Log in</Link>
          </Card.Text>
        </Card.Footer>
      </Card>
      </Col>
    </Row>
  )
}
