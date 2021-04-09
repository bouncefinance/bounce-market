import storage from 'redux-persist/lib/storage';

// TODO Whitelist not completed
export const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: [],
};
