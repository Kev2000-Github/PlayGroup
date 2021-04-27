import { useHistory, Switch, Route } from "react-router-dom";
import React from 'react';
import { Home } from "./pages/Home/Home";
import { InviteRoom } from "./pages/InviteRoom/InviteRoom";
import { Tictactoe } from "./pages/TicTacToe/TicTacToe";
import { Chess } from "./pages/Chess/Chess";
import { Layout } from "./pages/Layout/Layout";
import { paths } from "../utils/constants/paths";
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { alertActions } from "../actions/alert.actions";
import { NotFound } from "./pages/404/notFound";
import 'react-toastify/dist/ReactToastify.css';
const { useEffect } = React;

function App() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const alert = useAppSelector(state => state.alertReducer);

  useEffect(() => {
    history.listen(() => {
      dispatch(alertActions.clear());
    })
  }, [])

  useEffect(() => {
    switch (alert.type) {
      case 'alert-danger':
        toast.error(alert.message);
        break;
      case 'alert-success':
        toast.success(alert.message);
        break;
      case 'alert-notification':
        toast(alert.message);
        break;
      default:
    }
    dispatch(alertActions.clear());
  }, [alert])

  return (
    <Layout>
      <Switch>
        <Route exact path={paths.HOME} component={Home} />
        <Route exact path={paths.TICTACTOE} component={Tictactoe} />
        <Route exact path={paths.CHESS} component={Chess} />
        <Route exact path={paths.INVITE_ROOM} component={InviteRoom} />
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
    </Layout>
  )
}

export default App;
