import { pickState } from '../env/message';

const start = (client) => {
  const numbers = [
    {
      nome: "Junior",
      number: "5588082860@c.us",
    },
  ];

  numbers.map((resp) => {
    client
      .sendText(`${resp.number}`, pickState)
      .then((result) => {
        console.log("Result: ", result);
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro);
      });

    client
      .sendImage(resp.number, "img/covid.jpg", "image-name", "COVID 19")
      .then((result) => {
        console.log("ResultIMAGE: ", result); //return object success
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro); //return object error
      });
  });

  client.onMessage((message) => {
    const sigla = message.body;
    if (message.body === `${sigla}`) {
      axios
        .get(
          `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sigla}`
        )
        .then((resp) => {
          client.sendText(
            message.from,
            resp.data.state === undefined
              ? "*Estado/Sigla não encontrado*"
              : `😷 *Status de Casos de COVID - ${resp.data.uf}* 
                    *Estado*: ${resp.data.state}
                 🤧 *Total de Casos*: ${resp.data.cases} 
                 ✚ *Mortes*: ${resp.data.deaths}`
          );
        });
    }
  });
};

export default start;