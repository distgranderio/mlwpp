const venom = require('venom-bot');
venom.create().then((client) => start(client));
const fs = require('fs');

async function start(client) {
    async function listarArquivosEPastasDeUmDiretorio(diretorio, arquivos) {
    
        if(!arquivos)
            arquivos = [];
    
        let listaDeArquivos = fs.readdirSync(diretorio);
        for(let k in listaDeArquivos) {
            await new Promise(resolve => setTimeout(resolve, 3500));
            var convert = require('xml-js');
            var xml = require('fs').readFileSync('nota/' + listaDeArquivos[k], 'utf8');
            
            var result = convert.xml2json(xml, {compact: true, spaces: 4});
            
            const json1 = JSON.parse(result);
            nome = json1['nfeProc']['NFe']['infNFe']['dest']['xNome']._text;
            try {
                var numero = json1['nfeProc']['NFe']['infNFe']['dest']['enderDest']['fone']._text;
                var qtd = json1['nfeProc']['NFe']['infNFe']['det']['prod']['qCom']._text
                try{
                    var produto = json1['nfeProc']['NFe']['infNFe']['det']['prod']['xProd']._text;
                    if(json1['nfeProc']['NFe']['infNFe']['det']['prod']['xProd']._text == 'OLEO LUBRAX 20W50 - 500ML SL/SJ'){
                        console.log(listaDeArquivos[k] + " | MENSAGEM NÃO ENVIADA - ÓLEO")
                    }else{
                       enviarmsg(numero, produto, nome, qtd, listaDeArquivos[k]) 
                    }
                }catch{
                    var produto = "Pacote de Produtos"
                    enviarmsg(numero, produto, nome, qtd, listaDeArquivos[k]);
                }
                
            }catch(erro){
                // console.error('Error when sending: ', erro);
                console.log(listaDeArquivos[k] +" | MENSAGEM NÃO ENVIADA - NÃO TEM TELEFONE")
            }

        }
}
    
listarArquivosEPastasDeUmDiretorio('./nota');

function enviarmsg(numero, produto, nome, qtd, anota){

    if(numero == '0000000000'){
        console.log(anota + " | MENSAGEM NÃO ENVIADA - TELEFONE ERRADO")
    }else{
      mensagem = "Olá *" + nome + "* 🖐, \nSomos da Distribuidora Grande Rio e queremos agradecer pela compra de *" + qtd + 'x ' + produto + "* pelo _Mercado Livre._ Estamos também deixar nosso WhatsApp à disposição para qualquer dúvida ou futura negociação!\n\n*Fique por dentro de nossas novidades e promoções*:\n( _temos a linha completa em lubrificantes, ferramentas, reparo e embelezamento automotivo de diferentes marcas_ )\n💻: Site: www.distribuidoragranderio.com.br\n📷: Instagram: www.instagram.com/distgranderio/\nGrupo Wpp: chat.whatsapp.com/CuBH4g8A14b0HLnvS4rqda\n\n_*Preços melhores para negociação direta pelo wpp ou site_";
      telefone = numero + "@c.us";
  
          client.sendText(telefone, mensagem)
          .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
          .catch((erro) => {
            // console.error('Error when sending: ', erro);
            let aux = telefone.substr(0, 4);
            let aux1 = telefone.substr(5);
            let corrigido = aux + aux1;
            client.sendText(corrigido, mensagem)
            .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
            .catch((erro) => {
            //   console.error('Error when sending: ', erro)
              let aux = telefone.substr(0, 4);
              let aux1 = telefone.substr(4);
              let corrigido = aux + '9' + aux1;
              client.sendText(corrigido, mensagem)
              .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
              .catch((erro) => {
                // console.error('Error when sending: ', erro)
                let aux = telefone.substr(0, 2);
                let aux1 = telefone.substr(2);
                let corrigido = aux1;
                client.sendText(corrigido, mensagem)
                .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
                .catch((erro) => {
                //   console.error('Error when sending: ', erro)
                let aux = telefone.substr(0, 2);
                let aux1 = telefone.substr(2);
                let aux2 = aux1.substr(0, 4);
                let aux3 = aux1.substr(4);
                let corrigido = aux2 + '9' + aux3;
                client.sendText(corrigido, mensagem)
                .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
                .catch((erro) => {
                //   console.error('Error when sending: ', erro)
                  let aux = telefone.substr(0, 2);
                  let aux1 = telefone.substr(2);
                  let aux2 = aux1.substr(0, 4);
                  let aux3 = aux1.substr(5);
                  let corrigido = aux2 + aux3;
                  client.sendText(corrigido, mensagem)
            .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
            .catch((erro) => {
              console.log(anota + " | MENSAGEM NÃO ENVIADA - TELEFONE NAO TEM WPP")});
            });
          });
        });
    });
});

    }

    }
}