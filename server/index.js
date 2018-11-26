const app = require('./server');

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`localhost:${PORT}`);
});
