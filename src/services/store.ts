import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import casasReducer from './casas/index'
import usuariosReducer from './usuarios/index';
import votosReducer from './votos/index';

export const store = configureStore({
  reducer: {
    casasReducer,
    usuariosReducer,
    votosReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
