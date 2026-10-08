import assert from 'node:assert/strict';
import test from 'node:test';

import { renderUser } from '../../src/display/index.js';

test('renderUser formats a user profile for display', () => {
  assert.equal(renderUser({ id: 'u-1', name: 'Ada' }), 'Ada (u-1)');
});
