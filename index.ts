import express, { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';


// Cria um objeto 'payload' que contém as informações que serão guardadas dentro do token JWT.
const payload = {
    id: '02923d7e-ade8-4136-a0d5-131b6f6418e0',
    name: 'Maycon'
}

// Chave secreta usada para assinar o token JWT.
// Essa chave deve ser mantida em segredo (geralmente em uma variável de ambiente .env)
const secret = 'fbb82d0c-b8f5-413d-a731-1c9896141536';

// Define as opções do token, como o tempo de expiração.
const option: SignOptions = {
    expiresIn: '1h'
}

// A função jwt.sign() retorna uma string codificada (o token).
const token = jwt.sign(payload, secret, option);
console.log(token); // Exibe o token gerado no console.


try {
    // Verifica e decodifica o token usando o mesmo segredo
    const decoded = jwt.verify(token, secret);
    console.log({decoded});
}catch (error) {
    console.log({error});
}

const password = 'mysecretpassword';
const saltRounds = 10;

// O bcrypt.hash() aplica um salt automaticamente para aumentar a segurança.
bcrypt.hash(password, saltRounds, (error, hash) => {

    // Depois de gerar o hash, compara a senha original com o hash gerado.
    bcrypt.compare(password, hash, (error, result) => {
        if (result) { 
            //console.log('Password matches');
        } else {
            //console.log('Password does not match');
        }   
    });

});


const server = express();
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.send('hello world');
})

server.listen(3000);

