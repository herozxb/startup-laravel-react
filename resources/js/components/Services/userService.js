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
            `https://120.53.220.237:5002/api/users`,
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
            `https://120.53.220.237:5002/api/users`,
            requestOptions
        )
            .then(handleResponse)
            .then(user => {
                console.log("========6_in_example==============");
                console.log(user)
            })


    };

    return getUsers;
}