const http = require('http');
const { getJson } = require('serpapi');
require('dotenv').config({ path: '../.env' });

const server = http.createServer(async (req, res) => {
  const allowed_domain = '*';
  res.setHeader('Access-Control-Allow-Origin', allowed_domain);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const url = new URL(req.url, `http://${req.headers.host}`);
  const searchParams = url.searchParams;
  const query = searchParams.get('query');
  const offset = searchParams.get('start');

  try {
    if (query === '') {
      query = 'company';
    }
    const response = await getJson({
      engine: 'google_jobs',
      api_key: process.env.REACT_APP_JOB_API_KEY,
      q: query,
      start: offset,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message }));
  }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
