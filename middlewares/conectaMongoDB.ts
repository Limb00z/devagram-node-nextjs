import { NextApiRequest,NextApiResponse,NextApiHandler } from "next";
import type {respostaPadraoMsg} from "../types/respostaPadraoMsg";

import mongoose, { Mongoose } from "mongoose";

export const conectarMongoDb = (handler : NextApiHandler) => 
    async (req : NextApiRequest, res : NextApiResponse<respostaPadraoMsg>) => {
        //verificar se o banco ja está conectado, se estiver, seguir para o endpoint ou próximo middleware
        if(mongoose.connections[0].readyState){
            return handler(req,res);
        }

        // Já que não está conectado, vamos conectar
        // obter váriavel de ambiente preenchida do env
        const {DB_CONEXAO_STRING} = process.env;

        // SE A ENV ESTIVER VAZIA, ABORTA O USO DO SISTEMA
        // E avisa o programador
        if(!DB_CONEXAO_STRING){
            return res.status(500).json({erro: 'ENV de configuracao do banco, nao informado'});
        }

        mongoose.connection.on('Connected', () => console.log('Banco de dados conectado'));
        mongoose.connection.on('error', () => console.log(`Ocorreu erro ao conetar no banco ${Error}`));
        await mongoose.connect(DB_CONEXAO_STRING);

        // Agora posso seguir para o endpoint, pois estou conectado no banco
        return handler(req,res);
    }
