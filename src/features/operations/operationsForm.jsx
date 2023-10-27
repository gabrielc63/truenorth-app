import React, { useState } from "react";
import { usePostOperationMutation } from "./operationsApiSlice";
import { Form, Row, Button, Col, Container } from "react-bootstrap";

const OperationsForm = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [operationType, setOperation] = useState("addition");
  const [performOperation, { data, isLoading, isError, error }] =
    usePostOperationMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    performOperation({
      value1: parseInt(value1),
      value2: parseInt(value2),
      operationType,
    });
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <section className="login">
            <h1>New Operation</h1>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Control
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="Enter first value"
                />
              </Row>
              <Row className="mb-3">
                <Form.Control
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder="Enter second value"
                />
              </Row>
              <Row className="mb-3">
                <Form.Select
                  value={operationType}
                  onChange={(e) => setOperation(e.target.value)}
                >
                  <option value="addition">Sum</option>
                  <option value="division">Division</option>
                  <option value="multiplication">Multiplication</option>
                  <option value="substraction">Substraction</option>
                  <option value="square_root">Square root</option>
                  <option value="random_string">Random string</option>
                </Form.Select>
              </Row>
              <Button variant="primary" type="submit">
                Perform Operation
              </Button>
            </Form>

            {isLoading && <div>Processing...</div>}
            {isError && <div>Error: {error.message}</div>}
            {data && <div>Result: {data.result}</div>}
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default OperationsForm;
