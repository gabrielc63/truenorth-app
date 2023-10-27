import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { Form, Row, Button } from "react-bootstrap";
import { Col, Container, Card } from "react-bootstrap";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData, username }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Container>
      <Row className="vh-100 d-flex justify-content-center ">
        <Col md={8} lg={6} xs={12}>
          <section className="login">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h1>User Login</h1>

            <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group className="col col-sm-6">
                  <Form.Label htmlFor="username">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group className="col col-sm-6">
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </section>
        </Col>
      </Row>
    </Container>
  );

  return content;
};
export default Login;
