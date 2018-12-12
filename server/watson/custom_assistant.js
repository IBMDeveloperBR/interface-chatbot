// eslint-disable-next-line import/no-unresolved
const Assistant = require('watson-developer-cloud/assistant/v1');

module.exports = (msg, ctx, credentials) => {
  let assistantClient;

  // Autenticacao no Assistant
  if (credentials.apiKey) {
    /** ******  NOVA AUTENTICAÇÃO PARA NOVAS INSTANCIAS  ******** */
    assistantClient = new Assistant({
      iam_apikey: credentials.apiKey,
      version: '2018-07-10',
    });
  } else {
    assistantClient = new Assistant({
      username: credentials.username,
      password: credentials.password,
      version: '2018-07-10',
    });
  }

  // Ligacao com workspace e montagem dos parametros de requisicao
  const req = {
    workspace_id: credentials.workspaceId,
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
