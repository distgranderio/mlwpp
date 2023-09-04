const venom = require('venom-bot');

venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
const fs = require('fs');

async function start(client) {
    async function listarArquivosEPastasDeUmDiretorio(diretorio, arquivos) {
    
        if(!arquivos)
            arquivos = [];
    
        let listaDeArquivos = fs.readdirSync(diretorio);
        for(let k in listaDeArquivos) {
            await new Promise(resolve => setTimeout(resolve, 2500));
            var convert = require('xml-js');
            var xml = require('fs').readFileSync('nota/' + listaDeArquivos[k], 'utf8');
            
            var result = convert.xml2json(xml, {compact: true, spaces: 4});
            
            const json1 = JSON.parse(result);
            nome = json1['nfeProc']['NFe']['infNFe']['dest']['xNome']._text;
            valora = json1['nfeProc']['NFe']['infNFe']['ide']['dhEmi']._text;
            certo = valora.split('T');
            certo1 = certo[0].split('-');
            data = certo1[2] + '/' + certo1[1];
            try {
                var numero = json1['nfeProc']['NFe']['infNFe']['dest']['enderDest']['fone']._text;
                var qtd = json1['nfeProc']['NFe']['infNFe']['det']['prod']['qCom']._text
                try{
                    var produto = json1['nfeProc']['NFe']['infNFe']['det']['prod']['xProd']._text;
                    if(json1['nfeProc']['NFe']['infNFe']['det']['prod']['xProd']._text == 'OLEO LUBRAX 20W50 - 500ML SL/SJ'){
                        console.log(listaDeArquivos[k] + " | MENSAGEM NÃO ENVIADA - ÓLEO")
                    }else{
                       enviarmsg(numero, produto, nome, qtd, listaDeArquivos[k], data) 
                    }
                }catch{
                    var produto = "Pacote de Produtos"
                    enviarmsg(numero, produto, nome, qtd, listaDeArquivos[k], data);
                }
                
            }catch(erro){
                // console.error('Error when sending: ', erro);
                console.log(listaDeArquivos[k] +" | MENSAGEM NÃO ENVIADA - NÃO TEM TELEFONE")
            }
            

        }
}
function listanegra(telefone){
    if(telefone == '21964806569@c.us' || telefone == '21964419132@c.us' || telefone == '5581450330@c.us' || telefone == '4898539994@c.us' || telefone == '12991726545@c.us' || telefone == '3799134890@c.us' || telefone == '4599258011@c.us' || telefone == '5136661299@c.us' || telefone == '19995390628@c.us' || telefone == '24992467197@c.us' || telefone == '22998287567@c.us'  || telefone == '2164806569@c.us' || telefone == '2164419132@c.us' || telefone == '55981450330@c.us' || telefone == '488539994@c.us' || telefone == '1291726545@c.us' || telefone == '37999134890@c.us' || telefone == '45999258011@c.us' || telefone == '5136661299@c.us' || telefone == '1995390628@c.us' || telefone == '2492467197@c.us' || telefone == '2298287567@c.us' || telefone == '19991325129@c.us' || telefone == '199991325129@c.us' || telefone == '3599718762@c.us' || telefone == '35999718762@c.us'){
        return true;
    }
}


listarArquivosEPastasDeUmDiretorio('./nota');

function enviarmsg(numero, produto, nome, qtd, anota, data){

    if(numero == '0000000000'){
        console.log(anota + " | MENSAGEM NÃO ENVIADA - TELEFONE ERRADO")
    }else{
      mensagem = "Olá *" + nome + "* 🖐, \nSomos da Distribuidora Grande Rio e queremos agradecer pela compra de *" + qtd + 'x ' + produto + "* pelo _Mercado Livre_ no dia " + data +  ". Pretendemos também deixar nosso WhatsApp à disposição para qualquer dúvida ou futura negociação!\n\n*Fique por dentro de nossas novidades e promoções*:\n( _temos a linha completa em lubrificantes, ferramentas, reparo e embelezamento automotivo de diferentes marcas_ )\n💻: Site: www.distribuidoragranderio.com.br\n📷: Instagram: www.instagram.com/distgranderio/\nGrupo Wpp: chat.whatsapp.com/CuBH4g8A14b0HLnvS4rqda\n\n_*Preços melhores para negociação direta pelo wpp ou site_";
      telefone = numero + "@c.us";
        if(listanegra(telefone)){
            console.log(anota + ' | MENSAGEM NÃO ENVIADA - MENSAGEM REPETIDA');
        }else{
            client.sendText(telefone, mensagem)
            .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
            .catch((erro) => {
              // console.error('Error when sending: ', erro);
              let aux = telefone.substr(0, 4);
              let aux1 = telefone.substr(5);
              let corrigido = aux + aux1;
              if(listanegra(corrigido)){
                console.log(anota + ' | MENSAGEM NÃO ENVIADA - MENSAGEM REPETIDA');
            }else{
              client.sendText(corrigido, mensagem)
              .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
              .catch((erro) => {
              //   console.error('Error when sending: ', erro)
                let aux = telefone.substr(0, 4);
                let aux1 = telefone.substr(4);
                let corrigido = aux + '9' + aux1;
                if(listanegra(corrigido)){
                    console.log(anota + ' | MENSAGEM NÃO ENVIADA - MENSAGEM REPETIDA');
                }else{
                client.sendText(corrigido, mensagem)
                .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
                .catch((erro) => {
                  // console.error('Error when sending: ', erro)
                  let aux = telefone.substr(0, 2);
                  let aux1 = telefone.substr(2);
                  let corrigido = aux1;
                  if(listanegra(corrigido)){
                    console.log(anota + ' | MENSAGEM NÃO ENVIADA - MENSAGEM REPETIDA');
                }else{
                  client.sendText(corrigido, mensagem)
                  .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
                  .catch((erro) => {
                  //   console.error('Error when sending: ', erro)
                  let aux = telefone.substr(0, 2);
                  let aux1 = telefone.substr(2);
                  let aux2 = aux1.substr(0, 4);
                  let aux3 = aux1.substr(4);
                  let corrigido = aux2 + '9' + aux3;
                  if(listanegra(corrigido)){
                    console.log(anota + ' | MENSAGEM NÃO ENVIADA - MENSAGEM REPETIDA');
                }else{
                  client.sendText(corrigido, mensagem)
                  .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
                  .catch((erro) => {
                  //   console.error('Error when sending: ', erro)
                    let aux = telefone.substr(0, 2);
                    let aux1 = telefone.substr(2);
                    let aux2 = aux1.substr(0, 4);
                    let aux3 = aux1.substr(5);
                    let corrigido = aux2 + aux3;
                    if(listanegra(corrigido)){
                        console.log(anota + ' | MENSAGEM NÃO ENVIADA - MENSAGEM REPETIDA');
                    }else{
                    client.sendText(corrigido, mensagem)
              .then((result) =>{console.log(anota + ' | MENSAGEM ENVIADA COM SUCESSO');})
              .catch((erro) => {
                console.log(anota + " | MENSAGEM NÃO ENVIADA - TELEFONE NAO TEM WPP")});
                  }})};
            })};
          })};
      })};
  });

        }
          

    }
    console.log("terminou")
    }
}




//abril em adamento