CREATE DATABASE suflextext;

CREATE TABLE usuarios(
    id INT PRIMARY KEY,
    nome TEXT NOT NULL,
    sobrenome TEXT NOT NULL,
    username TEXT NOT NULL,
    senha TEXT NOT NULL,
    salt TEXT,
    datacriacao TIMESTAMP
)

INSERT INTO usuarios (id, nome, sobrenome, username, senha)
    VALUES ('0', 'Maria','Degan', 'mariadegan', 'md00258');