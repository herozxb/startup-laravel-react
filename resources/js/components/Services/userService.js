import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';


export function useGetUsers() {

    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getUsers = () => {
        return fetch(
            `http://localhost:5002/api/users`,
            requestOptions
        )
            .then(handleResponse)

    };

    return getUsers;
}



export function useGetUsersByPage() {

    const handleResponse = useHandleResponse();


    const getUsers = (page) => {
        
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({"page":page}),
        };

        return fetch(
            `http://localhost:5002/api/users`,
            requestOptions
        )
            .then(handleResponse)

    };

    return getUsers;
}