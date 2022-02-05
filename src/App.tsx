import React from 'react';
import { Router } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import history from './utils/history';
// import "./assets/styles/app.scss";
import { themeColor } from "./AppTheme";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ScrollToTop from "./components/common/ScrollToTop";
import SnakeBar from "./components/common/SnakeBar";


// const theme = createMuiTheme({
// palette: {
//   primary: {
//     light: themeColor.primary_light,
//     main: themeColor.primary_main,
//     dark: themeColor.primary_dark,
//     // contrastText: '#000',
//   },
//   secondary: {
//     light: themeColor.secondary_light,
//     main: themeColor.secondary_main,
//     dark: themeColor.secondary_dark,
//     contrastText: themeColor.contrast_text,
//   },
//   info: {
//     main: themeColor.info_main
//   }
// },
// });

/* Rectangle 8 */

function App() {
  return (
    // <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <ScrollToTop />
      <PublicRoutes />
      <PrivateRoutes />
      <SnakeBar />
    </Router>
    // </MuiThemeProvider>
  );
}

export default App;
