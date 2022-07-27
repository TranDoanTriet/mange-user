import { Routes, Route } from "react-router-dom";
import TableUser from '../components/TableUser';
import Home from '../components/Home';
import Login from '../components/Login'
import PrivateRoute from './PrivateRoute'
import NotFound from "./NotFound";
const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/users'
                    element={
                        <PrivateRoute>
                            <TableUser />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}
export default AppRoute