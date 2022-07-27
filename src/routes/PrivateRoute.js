import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux'
const PrivateRoute = (props) => {
    const user = useSelector(state => state.user.account)

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger mt-3" >
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        You dont have permission to access this route.
                        Please log in.
                    </p>
                </Alert>
            </>
        )
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default PrivateRoute;