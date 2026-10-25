
const {test} = require('node:test');
const assert = require('node:assert');

const app = require('../app');

test('GET / returns the greeting', async () => {
    const server = app.listen(0);

    try {
        const {port} = server.address();
        const res = await fetch(`http://localhost:${port}/`);
        assert.strictEqual(res.status, 200);
        assert.match(await res.text(), /Hello/);
    } finally {
        server.close();
    }
})

test('GET /db-status reports not connected when no DB', async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://localhost:${port}/db-status`);
    const body = await res.json();
    assert.strictEqual(body.mongoConnected, false);
  } finally {
    server.close();
  }
});