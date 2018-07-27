import test from 'ava'
import { mutations } from '../../store/blacklist.js'

const { usersettings } = mutations;

test('sets usersettings', t => {
  const state = { usersettings: { blacklist: [] } }
  usersettings(state, { blacklist: [1] } );
  t.deepEqual(state.usersettings, { blacklist: [1] });
});
