import { Container, Button, Card, CardHeader, CardBody, Form, FormGroup } from "reactstrap";
import React, { useState } from 'react';
import { guardarDatos, tipoServicio } from '../../firebase/FirestoreServices';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config';


const NuevoRegistro = () => {
    const [email, setEmail] = useState(null);
    const [registro, setRegistro] = React.useState({ categoriaPrincipal: undefined, tipoServicio: undefined, DescripcionSolicitud: "", ubicacionEmpresa: "", fecha: "" });
    const navigate = useNavigate();
    const [succes, setSucces] = useState(null);
    const [eTipoServicio, setETipoServicio] = React.useState([{ id: "", nombre: "" }]);

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setEmail(user.email);
            } else {
                navigate('/Login')
            }
        });
    }, [navigate, email]);

    const handleChange = async (e) => {
        setRegistro({ ...registro, [e.target.name]: e.target.value, });
        if (e.target.name === 'categoriaPrincipal') await getTipoServicios(e.target.value);
    };

    const getTipoServicios = async (e) => {
        if (e === "MANTENIMIENTO INMUEBLES") {
            const regs = await tipoServicio("inmueble");
            setETipoServicio(regs);
        }

        if (e === "MANTENIMIENTO MUEBLES") {
            const regs = await tipoServicio("mueble");
            setETipoServicio(regs);
        }

        if (e === "SERVICIOS") {
            const regs = await tipoServicio("servicio");
            setETipoServicio(regs);
        }
    };

    const guardarDato = async (e) => {
        e.preventDefault();
        guardarDatos(registro, email);
        limpiar();
        setSucces(true);
    };

    const limpiar = () => {
        setRegistro({ categoriaPrincipal: "", tipoServicio: "", DescripcionSolicitud: "", ubicacionEmpresa: "", fecha: "" });
        setETipoServicio([]);
    };

    const consultar = () => {
        navigate('/Detalle');
    };


    return (<>

        <Container className="my-2" style={{ maxWidth: "50rem" }}>
            <Card>
                <CardHeader className="bg-dark text-light text-center">
                    <div><h3>Ingresar Registro</h3></div>
                </CardHeader>

                <CardBody >
                    <Form onSubmit={guardarDato}>
                        <FormGroup>
                            <label>Categoria Principal: </label>
                            <select name="categoriaPrincipal" className='form-select' onChange={handleChange} value={registro.categoriaPrincipal} defaultValue="" required>
                                <option value="">Seleccione</option>
                                <option value="MANTENIMIENTO INMUEBLES">MANTENIMIENTO INMUEBLES</option>
                                <option value="MANTENIMIENTO MUEBLES" selected>MANTENIMIENTO MUEBLES</option>
                                <option value="SERVICIOS">SERVICIOS</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label>Tipo Servicio:</label>
                            <select name="tipoServicio" className='form-select' onChange={handleChange} value={registro.tipoServicio} defaultValue="" required>
                                <option value="">Seleccione</option>
                                {eTipoServicio.map((dato, key) => (
                                    <option key={key} value={dato.nombre}>{dato.nombre}</option>
                                ))}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label>Descripcion Solicitud:</label>
                            <input className="form-control" name="DescripcionSolicitud" type="text" onChange={handleChange} value={registro.DescripcionSolicitud} required />
                        </FormGroup>

                        <FormGroup>
                            <label>Ubicacion Empresa:</label>
                            <input className="form-control" name="ubicacionEmpresa" type="text" onChange={handleChange} value={registro.ubicacionEmpresa} required />
                        </FormGroup>

                        <FormGroup>
                            <label>Fecha:</label>
                            <input className="form-control" name="fecha" type="date" onChange={handleChange} value={registro.fecha} required />
                        </FormGroup>

                        {succes === true ? <div className="alert alert-success text-center" >Guardado con exito!</div> : <></>}

                        <div className="text-center">
                            <Button type="submit" color="success" ><i className="bi bi-check-lg"> Guardar</i></Button>
                            {" "}
                            <Button color="danger" onClick={() => limpiar()} ><i class="bi bi-repeat"> Limpiar</i></Button>
                            {" "}
                            <Button color="primary" onClick={() => consultar()} ><i class="bi bi-search"> Consultar</i></Button>
                        </div>
                    </Form>

                </CardBody>

                {/* <CardFooter className="text-center">
                    <Button color="success" ><i className="bi bi-check-lg">Guardar</i></Button>
                    {" "}
                    <Button color="danger" onClick={() => limpiar()} ><i className="bi bi-backspace-reverse"> Limpiar</i></Button>
                </CardFooter> */}
            </Card>
        </Container>

    </>
    );

}


export default NuevoRegistro;