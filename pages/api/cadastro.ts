import type { NextApiRequest, NextApiResponse } from "next";
import type { respostaPadraoMsg } from "../../types/respostaPadraoMsg";
import type { CadastroRequisicao } from "../../types/CadastroRequisicao";

const endpointCadastro = (req : NextApiRequest, res : NextApiResponse<respostaPadraoMsg>) => {
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
    }
    // se  requisição não for pelo metodo  POST, apresentará o erro abaixo
    return res.status(405).json({erro: 'Metodo informado nao e valido'});
}