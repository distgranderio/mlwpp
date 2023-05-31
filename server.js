const venom = require('venom-bot');
venom.create().then((client) => start(client));

async function start(client) {
function verifica(){

var convert = require('xml-js');
var xml = require('fs').readFileSync('nota/nota.xml', 'utf8');

var result = convert.xml2json(xml, {compact: true, spaces: 4});

const json1 = JSON.parse(result);
nome = json1['nfeProc']['NFe']['infNFe']['dest']['xNome']._text;
try {
    var numero = json1['nfeProc']['NFe']['infNFe']['dest']['enderDest']['fone']._text;
    try{
        var produto = json1['nfeProc']['NFe']['infNFe']['det']['prod']['xProd']._text;
        if(json1['nfeProc']['NFe']['infNFe']['det']['prod']['xProd']._text == 'OLEO LUBRAX 20W50 - 500ML SL/SJ'){
            console.log("MENSAGEM NÃO ENVIADA - ÓLEO")
        }else{
           enviarmsg(numero, produto, nome) 
        }
    }catch{
        var produto = "Pacote de Produtos"
        enviarmsg(numero, produto, nome);
    }
    
}catch(erro){
    console.error('Error when sending: ', erro);
    console.log("MENSAGEM NÃO ENVIADA - NÃO TEM TELEFONE")
}

}


verifica();

function enviarmsg(numero, produto, nome){

    mensagem = "Olá *" + nome + "* 🖐, \nSomos da Distribuidora Grande Rio e estamos muito felizes por ter feito a compra conosco de *" + produto + "*, pelo _Mercado Livre._ Queremos também deixar nosso WhatsApp à disposição para qualquer dúvida ou futura negociação!\n\n*Fique por dentro de nossas novidades e promoções*:\n( _temos a linha completa em lubrificantes, ferramentas, reparo e embelezamento automotivo de diferentes marcas_ )\n💻: Site: www.distribuidoragranderio.com.br\n📷: Instagram: www.instagram.com/distgranderio/\nGrupo Wpp: chat.whatsapp.com/CuBH4g8A14b0HLnvS4rqda\n\n_*Preços melhores para negociação direta pelo wpp ou site_";
    telefone = '42984157865@c.us';


        client.sendText(telefone, mensagem)
        .then((result) =>{console.log('Result: ', result);})
        .catch((erro) => {
          console.error('Error when sending: ', erro);
          let aux = telefone.substr(0, 4);
          let aux1 = telefone.substr(5);
          let corrigido = aux + aux1;
          client.sendText(corrigido, mensagem)
          .then((result) =>{console.log('Result: ', result);})
          .catch((erro) => {
            console.error('Error when sending: ', erro)
            let aux = telefone.substr(0, 4);
            let aux1 = telefone.substr(5);
            let corrigido = aux + '9' + aux1;
            client.sendText(corrigido, mensagem)
          .then((result) =>{console.log('Result: ', result);})
          .catch((erro) => {
            console.error('Error when sending: ', erro)});
          });
        });
    }
}