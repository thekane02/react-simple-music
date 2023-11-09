import { createSlice } from "@reduxjs/toolkit";

const loggerSlice = createSlice({
    name: "logger",
    initialState: {
        loggers: {
            allLoggers: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getLoggersStart: (state) => {
            state.loggers.isFetching = true;
        },
        getLoggersSuccess: (state, action) => {
            state.loggers.isFetching = false;
            state.loggers.allLoggers = action.payload;
            state.loggers.error = false;
        },
        getLoggersFailed: (state) => {
            state.loggers.isFetching = false;
            state.loggers.error = false;
        },
    },
});

export const { getLoggersStart, getLoggersSuccess, getLoggersFailed } =
    loggerSlice.actions;

export default loggerSlice.reducer;