import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { RequisitionAxios } from '../service/connection';
import { useNavigate } from 'react-router-dom';

function Login() {
    if(sessionStorage.getItem('autenticated')){

    }
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [auth, setAuth] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if ((values.email.length) && (values.password.length) != 0) {
            event.preventDefault();
            const connection = await RequisitionAxios.Get(`/clientes?email=${values.email}`)
            console.log(connection.data)
            if (connection.data.length != 0) {
                if (connection.data['0'].password === values.password) {
                    console.log(values.password)
                    sessionStorage.setItem('authenticated', connection.data['0'].id);
                    navigate(`/clientes/${connection.data['0'].id}`)

                } else {
                    setAuth("Email ou senha inválido.")
                }
            } else {
                setAuth("Email ou senha inválido.")
            }
        } else {
            setAuth("Email ou senha inválido.")
        }
    };
    return (

        <main>
            <div className='border m-3 bg-white px-2 mx-3 py-4' style={{borderRadius:15}}>
            <div className='m-5'>
            <div className='col-md-12 offset-md-4'>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="emailValidate">
                        <Form.Label><strong>E-mail</strong></Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={values.email}
                                onChange={(event) => setValues((prevState) => ({ ...prevState, email: event.target.value }))}
                            />
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
                    </Form.Group>
                </Row>
                {auth != "" && <p className='text-danger'>{auth}</p>}
                <Button type="submit">Confirmar</Button>
            </Form>
            </div>
            </div>
            </div>
        </main>

    );
}

export default Login