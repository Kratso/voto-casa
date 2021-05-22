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

// const data = JSON.stringify({mail: 'kyoko', password: 'fumar'})
// const data = JSON.stringify({mail: 'sortkrage', password: 'pichacorta'})
// const data = JSON.stringify({mail: 'danielot', password: 'borracho'})

// fetch('http://localhost:8085/api/v1/users/register', {
//   method:"POST",
//   headers:{
//     'Content-Type': 'application/json'
//   },
//   body: data
// })

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
