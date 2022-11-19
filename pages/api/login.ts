import type { NextApiRequest,NextApiResponse } from "next";
import { conectarMongoDb } from "../../middlewares/conectaMongoDB";
import type { respostaPadraoMsg } from "../../types/respostaPadraoMsg";
import md5 from 'md5';
import { UsuarioModel } from "../../models/UsuarioModel";

const endpointLogin = async (
    req : NextApiRequest,
    res : NextApiResponse<respostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const{login,senha} = req.body;
        
        //Buscar usuario no BD
        const usuariosEncontrados = await UsuarioModel.find({email : login, senha : md5(senha)});

        //validação... se achar ou não
        if(usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados[0];
            return res.status(200).json({msg : `Usuario ${usuarioEncontrado.nome} encontrado com sucesso.`});
        }
        return res.status(400).json({erro: 'Usuario nao encontrado'});
    }
    return res.status(405).json({erro: 'Metodo informado nao e valido'});
}

export default conectarMongoDb(endpointLogin);