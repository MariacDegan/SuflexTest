import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        nome:"",
        sobrenome:"",
        username:"",
        senha:""
    });

    const { nome, sobrenome, username, senha } = inputs;
    
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name] : e.target.value });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault()

        try {

            const body = {nome, sobrenome, username, senha};

            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            localStorage.setItem("token", parseRes.token);

            setAuth(true);
        } catch (error) {
            console.error(error.message)
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Cadastro</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="nome" placeholder="Nome" className="form-control my-3" value={nome} onChange={e => onChange(e)} />
                <input type="text" name="sobrenome" placeholder="Sobrenome" className="form-control my-3" value={sobrenome} onChange={e => onChange(e)} />
                <input type="text" name="username" placeholder="Username" className="form-control my-3" value={username} onChange={e => onChange(e)} />
                <input type="password" name="senha" placeholder="Senha" className="form-control my-3" value={senha} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Cadastrar</button>
            </form>
            <Link to="/login">Entrar</Link>
        </Fragment>
    );
};

export default Register;