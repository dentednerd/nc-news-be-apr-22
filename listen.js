const app = require('./app');

const PORT = 9090;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`nc-news-be-apr-22 listening on ${PORT} 🚀`);
});
