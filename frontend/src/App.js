import React, { useEffect } from 'react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Alert from './components/Alert';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const store = configureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
      dark: '#512DA8',
      light: '#D1C4E9',
    },
    secondary: {
      main: '#448AFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#FFFFFF',
    },
  },
});

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Alert />
          <AppRouter />
        </MuiThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
