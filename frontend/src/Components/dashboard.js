import React, {Fragment, useState, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import ModalForm from './Modals/Modal'
import DataTable from './Tables/DataTable'


const Dashboard = ({ setAuth }) => {

    const [nome, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("htpp://localhost:3000/dashboard/", {
                method: "GET",
                headers:{token: localStorage.token}
            }); 

            const parseRes = await response.json();

            setName(parseRes.nome);

        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
    };

    useEffect(() => {
        getName()
    },[]);

    return (
        <Fragment>
            <h1>Dashboard {nome}</h1>
            <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>CRUD Usuários</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Criar Novo" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
            <button className="btn btn-primary" onClick={e => logout(e)} >Sair</button>
        </Fragment>
    );
};

export default Dashboard;