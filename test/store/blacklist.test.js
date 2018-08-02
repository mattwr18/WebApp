import test from 'ava'
import { mutations, actions } from '../../store/blacklist.js'
import { testAction } from '../helpers/testAction';
const feathers = require('@feathersjs/feathers');
const { status } = mutations;

let api;
test.beforeEach(t => {
  api = feathers();
  api.use('/usersettings', {
    async create() {
    },
    async find(){
      return [];
    }
  });
});
test.afterEach.always(t => {
  api = null;
});


test('status setter', t => {
  const state = { status: { blacklist: [] } }
  status(state, { blacklist: [1] } );
  t.deepEqual(state.status, { blacklist: [1] });
});

test('syncBlacklist() sets isPending', async (t) => {
  const state = { status: { } }
  let syncBlacklistAction = actions.syncBlacklist.bind({app: {$api: api}});
  await testAction(syncBlacklistAction, {userId: 42}, state, [
    { type: 'status', payload: { isPending: true } },
    { type: 'status', payload: { isPending: false} }
  ], t)
});

test('syncBlacklist() updates blacklist', async (t) => {
  const state = { status: { } }
  api.use('/usersettings', {
    async find(data) {
      return {data: [{blacklist: [1234]}]}
    }
  });
  let syncBlacklistAction = actions.syncBlacklist.bind({app: {$api: api}});
  await testAction(syncBlacklistAction, {userId: 42}, state, [
    { type: 'status', payload: { isPending: true } },
    { type: 'status', payload: { blacklist: [1234], isPending: false} }
  ], t)
});

test('blacklist(userId) calls commit("status")', async (t) => {
  const state = { status: { blacklist: [] } }
  let blacklistAction = actions.blacklist.bind({app: {$api: api}});
  await testAction(blacklistAction, 42, state, [
    { type: 'status', payload: { blacklist: [42] } }
  ], t)
});

test('blacklist(userId) sends blacklist to API', async (t) => {
  api.use('/usersettings', {
    async create(data) {
      t.deepEqual(data, { blacklist: [42]});
    }
  });
  const state = { status: { blacklist: [] } }
  let blacklistAction = actions.blacklist.bind({app: {$api: api}});
  await blacklistAction({ commit: () => {}, state }, 42);
});

