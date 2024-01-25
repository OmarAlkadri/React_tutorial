/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk } from '../../store'
import { getThemeModeStorage, getLanguageStorage, setThemeModeStorage, setLanguageStorage, getDrawerStatusStorage } from '../../../sessionStorage'

interface State {
    themeMode: 'light' | 'dark'
    language: 'EN' | 'AR' | 'TR'
    drawerOpen: boolean

}

const initialState: State = {
    themeMode: getThemeModeStorage(),
    language: getLanguageStorage(),
    drawerOpen: false,

}

const slice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {
        setThemeMode(state: State, action: PayloadAction<'light' | 'dark'>): void {
            state.themeMode = action.payload
        },
        setLanguage(state: State, action: PayloadAction<'EN' | 'AR' | 'TR'>): void {
            state.language = action.payload
        },
        setDrawer(state: State, action: PayloadAction<boolean>): void {
            state.drawerOpen = action.payload
        },
    },
})

export const { reducer } = slice

export const setThemeMode =
    (themeMode: 'light' | 'dark'): AppThunk =>
        async (dispatch, getState): Promise<void> => {
            // const state = getState()
            setThemeModeStorage(themeMode)
            dispatch(slice.actions.setThemeMode(themeMode));
        }

export const setLanguage =
    (language: 'EN' | 'AR' | 'TR'): AppThunk =>
        async (dispatch, getState): Promise<void> => {
            const state = getState()
            setLanguageStorage(language)
            dispatch(slice.actions.setLanguage(language));
        }

export const setDrawer =
    (open: boolean): AppThunk =>
        async (dispatch): Promise<void> => {
            dispatch(slice.actions.setDrawer(open));
        }
