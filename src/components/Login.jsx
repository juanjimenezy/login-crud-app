import React from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { loginFirebase } from '../firebase/AuthServices';



function Login() {
    const [registro, setRegistro] = React.useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = React.useState(false);


    const logear = React.useCallback(async () => {
        try {
            const response = await loginFirebase(registro);
            console.log(response);
            localStorage.setItem('usuario', JSON.stringify(response));
            navigate('/Detalle');
        } catch (error) {
            setErrorLogin(true);
            console.log(error);
        }


    }, [registro, navigate]);

    const handleChange = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="my-4 justify-content-center d-flex align-items-center">
                <Card className="col-md-2 shadow-lg">
                    <CardHeader className='text-center bg-dark text-light'>
                        <h3>Login</h3>
                    </CardHeader>

                    {errorLogin?<div class="alert alert-danger my-2" role="alert">
                        Usuario o contraseña incorrectos!
                    </div>:<div></div> }

                    <CardBody>
                        <Form>
                            <FormGroup>
                                <input id='email' type="text" className="form-control" name='email' placeholder='email' value={registro.email} onChange={handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <input id='password' type="password" className="form-control" name='password' placeholder='password' value={registro.password} onChange={handleChange} />
                            </FormGroup>
                            <div className='text-center'>
                                <Button color='success' onClick={() => logear()}>Ingresar</Button>
                            </div>

                            <div className='text-center'>
                                <a className='my-1 btn btn-primary' href='/Register' >Registrarse</a>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}


export default Login;