import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { User } from '../entities/User';
import { RequisitionAxios } from '../service/connection';
import { Link } from 'react-router-dom';

function Clients() {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [create, setCreate] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    async function ValidateEmail() {

      setValid(false)
      const connection = await RequisitionAxios.Get(`/clientes?email=${values.email}`)
      if (connection.data != 0) {
        setValid(true)
      }
    }
    ValidateEmail()
  }, [values.email])

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return
    } else if (!valid) {
      const newUser = new User(values.name, values.email, values.password)
      await RequisitionAxios.Post('/clientes', newUser)
      setCreate(true)
    } else {
      return
    }

  };
  if (create) {
    return (
      <main className='text-center bg-dark pt-5'>
        <h3 className='text-white'>Conta criada com sucesso!</h3>
        <Link to='/'><button className='btn btn-light'>Voltar para Home</button></Link>
      </main>
    )
  }
  return (
    <main>
      <div className='border m-3 bg-white px-2 mx-3 py-4' style={{ borderRadius: 15 }}>
        <div className='m-5'>
          <div className='col-md-12 offset-md-4'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="nameValidate">
                <Form.Label><strong>Nome completo</strong></Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nome"
                  value={values.name}
                  onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Preencha com seu nome completo
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="emailValidate">
                <Form.Label><strong>Username</strong></Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    isValid={valid}
                    isInvalid={valid}
                    value={values.email}
                    onChange={(event) => setValues((prevState) => ({ ...prevState, email: event.target.value }))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Email inválido ou já cadastrado.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="passwordValidate">
                <Form.Label><strong>Senha</strong></Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Senha"
                  value={values.password}
                  onChange={(event) => setValues((prevState) => ({ ...prevState, password: event.target.value }))}
                />
                <Form.Control.Feedback type="invalid">
                  Preencha com uma senha.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">Cadastrar</Button>
          </Form>
        </div>
      </div>
    </div>
    </main >

  );
}

export default Clients