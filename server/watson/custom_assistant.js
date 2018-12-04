// eslint-disable-next-line import/no-unresolved
const Assistant = require('watson-developer-cloud/assistant/v1');

module.exports = (msg, ctx, credentials) => {
  let assistantClient;

  // Autenticacao no Assistant
  if (credentials.ASSISTANT_APIKEY) {
    /** ******  NOVA AUTENTICAÇÃO PARA NOVAS INSTANCIAS  ******** */
    assistantClient = new Assistant({
      iam_apikey: credentials.ASSISTANT_APIKEY,
      version: '2018-07-10',
    });
  } else {
    assistantClient = new Assistant({
      username: credentials.ASSISTANT_USERNAME,
      password: credentials.ASSISTANT_PASSWORD,
      version: '2018-07-10',
    });
  }

  // Ligacao com workspace e montagem dos parametros de requisicao
  const req = {
    workspace_id: credentials.ASSISTANT_WORKSPACE,
    input: { text: msg },
    context: ctx || null,
  };
  return new Promise((resolve, reject) => {
    // envia a messagem com Assistant
    assistantClient.message(req, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};
