import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './modules/rootReducer';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// useDispatch > create a dispatch function of actions to be executed a modified state
// const dispatch = useDispatch();
// dispatch(updateUser({ ... }));

// useSelector > reponsible for accessing the state of the store, and returning a value
// const allUsers = useSelector((state: RootState) => state.users);
