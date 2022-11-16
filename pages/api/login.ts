import type { NextApiRequest,NextApiResponse } from "next";
import { conectarMongoDb } from "../../middlewares/conectaMongoDB";

const endpointLogin = (
    req : NextApiRequest,
    res : NextApiResponse 
) => {
    if(req.method === 'POST'){
        const{login,senha} = req.body;

        if(login === 'admin@admin.com' && senha === 'Admin123'){
            return res.status(200).json({msg : 'Usuario autenticado com sucesso'});
        }
        return res.status(400).json({erro: 'Usuario nao encontrado'});
    }
    return res.status(405).json({erro: 'Metodo informado nao e valido'});
}

export default conectarMongoDb(endpointLogin);