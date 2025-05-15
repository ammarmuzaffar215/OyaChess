const assert = require('assert');
const app = require('../../src/app');

describe('\'materials\' service', () => {
  it('registered the service', () => {
    const service = app.service('materials');

    assert.ok(service, 'Registered the service (materials)');
  });
});
