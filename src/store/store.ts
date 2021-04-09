import { createApplicationStore, persistApplicationStore } from './createStore';
import { historyInstance } from '../modules/common/utils/historyInstance';

const appStore = createApplicationStore({ history: historyInstance });

const persistor = persistApplicationStore(appStore);

const { store } = appStore;

export { store, persistor };
