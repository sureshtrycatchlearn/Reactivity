import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../store/store';
import { useEffect } from 'react';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/models/ModalContainer';


function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponents content='Loading app...' />


  return (
    <>
    <ScrollRestoration/>
    <ModalContainer/>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App) ;
