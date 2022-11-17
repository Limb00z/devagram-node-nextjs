import type { NextApiRequest, NextApiResponse } from "next";
import type { respostaPadraoMsg } from "../../types/respostaPadraoMsg";
import type { CadastroRequisicao } from "../../types/CadastroRequisicao";
import {UsuarioModel} from  '../../models/UsuarioModel'

const endpointCadastro = async (req : NextApiRequest, res : NextApiResponse<respostaPadraoMsg>) => {
    
    //solicitando um requisição do tipo POST
    if (req.method === 'POST'){
        const usuario = req.body as CadastroRequisicao;
        if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({erro: 'Nome invalido'}); // validação de nome
        }
        if(!usuario.email || usuario.email.length < 5 || !usuario.email.includes('@') ||!usuario.email.includes('.') ){ //validação de email(fraca) {será trocada por uma regex}
            return res.status(400).json({erro: 'Email invalido'});
        }
        if(!usuario.senha || usuario.senha.length < 8 ) {
            return res.status(400).json({erro: 'Senha invalida'});  //Validação de senha (fraca) {será usado regex}
        }
         //Se tudo correr bem nas validações.
         //salvar no banco de dados
         await UsuarioModel.create(usuario);
         return res.status(200).json({msg : 'Usuario criado com sucesso '})
    }

    // se  requisição não for pelo metodo  POST, apresentará o erro abaixo
    return res.status(405).json({erro: 'Metodo informado nao e valido'});
}

export default endpointCadastro