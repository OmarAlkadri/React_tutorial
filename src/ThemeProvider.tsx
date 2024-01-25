/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Main from './main';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useSelector } from './redux/store';
import { useTranslation } from 'react-i18next';
import { createTheme } from './assets/theme';
import { ToastContainer } from 'react-toastify';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
});

const UserManagement = () => {
  const userSettings = useSelector(state => state.systemSettings);
  const [themeMode, setThemeMode] = useState(userSettings.themeMode);
  const [language, setLanguage] = useState(userSettings.language);
  const [t, il8n] = useTranslation()

  useEffect(() => {
    setThemeMode(userSettings.themeMode);
  }, [userSettings.themeMode]);

  useEffect(() => {
    setLanguage(userSettings.language);
  }, [userSettings.language]);

  useEffect(() => {
    if (language)
      il8n.changeLanguage(language);
  }, [language, il8n]);

  return (
    <CacheProvider value={language === 'AR' ? cacheRtl : cacheLtr}>
      <ThemeProvider
        theme={createTheme({
          direction: language !== 'AR' ? 'ltr' : 'rtl',
          responsiveFontSizes: true,
          mode: themeMode,
        })}
      >
        <CssBaseline />
        <BrowserRouter >
          <Main />
          <ToastContainer
            position="bottom-right"
            newestOnTop
            limit={5}

          />
        </BrowserRouter >
      </ThemeProvider>
    </CacheProvider>
  );
};

export default UserManagement;
