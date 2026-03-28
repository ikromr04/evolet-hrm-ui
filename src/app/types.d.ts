declare type RootState = ReturnType<typeof import('./providers/store-provider').store.getState>;
declare type AppDispatch = typeof import('./providers/store-provider').store.dispatch;
