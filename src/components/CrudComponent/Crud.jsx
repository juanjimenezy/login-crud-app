import React, { useState } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config';
import { obtenerDatos, eliminarDatos, editarDato } from '../../firebase/FirestoreServices'

const Crud = () => {
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const [lista, setLista] = React.useState([]);

    const [actualizar, setActualizar] = React.useState(false);
    const [regEdit, setRegEdit] = React.useState({ id: "", categoriaPrincipal: "", tipoServicio: "", DescripcionSolicitud: "", ubicacionEmpresa: "", fecha: "" });

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setEmail(user.email);
                //console.log(email);
            } else {
                navigate('/Login')
            }
        });
        getDatos();
    }, [navigate, email]);

    const getDatos = async () => {
        const regs = await obtenerDatos();
        setLista(regs);
    };

    const eliminarDato = async (id) => {
        eliminarDatos(id);
        getDatos();
    };

    const handleChange = (e) => {
        if (actualizar) setRegEdit({ ...regEdit, [e.target.name]: e.target.value, });
    };

    const editarElemento = async (e) => {
        e.preventDefault();
        editarDato(regEdit);
        limpiar();
        actualizarShowHide();
        getDatos();

    };

    const actualizarShowHide = (dato) => {
        setActualizar(!actualizar);
        if (dato) setRegEdit({
            id: dato.id,
            categoriaPrincipal: dato.categoriaPrincipal,
            tipoServicio: dato.tipoServicio,
            DescripcionSolicitud: dato.DescripcionSolicitud,
            ubicacionEmpresa: dato.ubicacionEmpresa,
            fecha: dato.fecha
        });
    }

    const limpiar = () => {
        setRegEdit({ id: "", categoriaPrincipal: "", tipoServicio: "", DescripcionSolicitud: "", ubicacionEmpresa: "", fecha: "" });
    };

    return (
        <div className='my-2 text-center'>
            <Container>
                <div className='my-5 text-center'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Categoria Principal</th>
                                <th>Tipo Servicio</th>
                                <th>Descripcion de solicitud</th>
                                <th>Ubicacion de la empresa</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lista.map((dato, key) => (
                                <tr key={key}>
                                    <td>{dato.categoriaPrincipal}</td>
                                    <td>{dato.tipoServicio}</td>
                                    <td>{dato.DescripcionSolicitud}</td>
                                    <td>{dato.ubicacionEmpresa}</td>
                                    <td>{dato.fecha}</td>
                                    <td><Button className="btn-sm" color='secondary' onClick={() => actualizarShowHide(dato)}><i className="bi bi-pencil-square"></i></Button>
                                        {" "}
                                        <Button className="btn-sm" color='danger' onClick={() => eliminarDato(dato.id)}><i className="bi bi-trash"></i></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Modal isOpen={actualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Categoria Principal: </label>
                        {/* <input className="form-control" name="categoriaPrincipal" type="text" onChange={handleChange} value={regEdit.categoriaPrincipal} required /> */}
                        <select name="categoriaPrincipal" className='form-select' onChange={handleChange} value={regEdit.categoriaPrincipal} required>
                            <option value="MANTENIMIENTO INMUEBLES">MANTENIMIENTO INMUEBLES</option>
                            <option value="MANTENIMIENTO MUEBLES" selected>MANTENIMIENTO MUEBLES</option>
                            <option value="SERVICIOS">SERVICIOS</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label>Tipo Servicio:</label>
                        {/* <input className="form-control" name="tipoServicio" type="text" onChange={handleChange} value={regEdit.tipoServicio} required /> */}
                        <select name="tipoServicio" className='form-select' onChange={handleChange} value={regEdit.tipoServicio} required>
                            <option value="ASEO">ASEO</option>
                            <option value="TRANSPORTE" selected>TRANSPORTE</option>
                            <option value="VIGILANCIA">VIGILANCIA</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <label>Descripcion Solicitud:</label>
                        <input className="form-control" name="DescripcionSolicitud" type="text" onChange={handleChange} value={regEdit.DescripcionSolicitud} required />
                    </FormGroup>

                    <FormGroup>
                        <label>Ubicacion Empresa:</label>
                        <input className="form-control" name="ubicacionEmpresa" type="text" onChange={handleChange} value={regEdit.ubicacionEmpresa} required />
                    </FormGroup>

                    <FormGroup>
                        <label>Fecha:</label>
                        <input className="form-control" name="fecha" type="date" onChange={handleChange} value={regEdit.fecha} required />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={editarElemento} ><i className="bi bi-check-lg"></i></Button>
                    <Button color="danger" onClick={() => actualizarShowHide(null)}><i className="bi bi-backspace-reverse"></i></Button>
                </ModalFooter>

            </Modal>
        </div>
    )
}

export default Crud;