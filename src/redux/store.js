import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";


const store = configureStore({
    reducer: persistReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
});


const persistor = persistStore({});

const dispatch = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();


export {store, persistor, dispatch, useSelector, useDispatch}
