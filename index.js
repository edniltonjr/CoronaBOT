const venom = require('venom-bot');
const express = require('express');
const axios = require('axios');

const app = express();

app.listen('5000');



app.get('/start', (req, res) => {

  venom.create().then((client) => start(client));

async function  start(client) {

  const numbers = [
    {
      nome: 'Junior',
      number: '558399523548@c.us'
    }
  ]

  numbers.map(resp => {
    
    client.sendText(`${resp.number}`,  `
    🦠 *CASOS DE COVID NO BRASIL 🇧🇷 (DIGITE A SIGLA P/ SABER MAIS INFORMACOES DO SEU ESTADO)* \n
    Acre (AC)
    Alagoas (AL)
    Amapá (AM)
    Amazonas (AM)
    Bahia (BA)
    Ceará (CE)
    Distrito Federal (DF)
    Espírito Santo (ES)
    Goiás (GO)
    Maranhão (MA)
    Mato Grosso (MT)
    Mato Grosso do Sul (MS)
    Minas Gerais (MG)
    Pará (PA)
    Paraíba (PB)
    Paraná (PA)
    Pernambuco (PE)
    Piauí (PI)
    Rio de Janeiro (RJ)
    Rio Grande do Norte (RN)
    Rio Grande do Sul (RS)
    Rondônia (RO)
    Roraima (RO)
    Santa Catarina (SC)
    São Paulo (SP)
    Sergipe (SE)
    Tocantins (TO)
     
    `).then((result)=>{
      console.log("Result: ", result); 
  }).catch((erro)=>{
      console.error("Error when sending: ", erro); 
  });

  client.sendImage(resp.number, 'img/covid.jpg', 'image-name', 'COVID 19').then((result)=>{
    console.log("ResultIMAGE: ", result); //return object success
}).catch((erro)=>{
    console.error("Error when sending: ", erro); //return object error
});
})


  client.onMessage((message) => {

    const sigla = message.body;
    if (message.body === `${sigla}`) {
          axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sigla}`)
            .then(resp => {
              
              client.sendText(message.from,
                resp.data.state === undefined ? '*Estado/Sigla não encontrado*' :
                `😷 *Status de Casos de COVID - ${resp.data.uf}* 
                    *Estado*: ${resp.data.state}
                 🤧 *Total de Casos*: ${resp.data.cases} 
                 ✚ *Mortes*: ${resp.data.deaths}`);
          })
    }

  });
}

res.json('Mensagens Enviadas para Lista de Números')

})


