import { Store } from 'shared/utils/store/index';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

let store = null;

export default function () {
  if (store == null) {
    store = new Store({
      state,
      getters,
      actions,
      mutations
    });
  }
  return store;
}

export function destroyStore() {
  store = null;
}
