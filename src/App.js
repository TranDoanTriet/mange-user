import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
import AppRoute from './routes/AppRoutes';
import { handleRefresh } from './redux/actions/userActions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleRefresh())
      // loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  }, [])
  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
