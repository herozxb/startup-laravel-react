import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';


// Receive global messages
export function useGetGlobalMessages() {

    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getGlobalMessages = () => {
        return fetch(
            `https://120.53.220.237:5002/api/messages/global`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() => {}

            );
    };

    return getGlobalMessages;
}

// Send a global message
export function useSendGlobalMessage() {

    const handleResponse = useHandleResponse();

    const sendGlobalMessage = body => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ body: body, global: true }),
        };

        return fetch(
            `https://120.53.220.237:5002/api/messages/global`,
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                console.log(err);

            });
    };

    return sendGlobalMessage;
}

// Get list of users conversations
export function useGetConversations() {

    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getConversations = () => {
        return fetch(
            `https://120.53.220.237:5002/api/messages/conversations`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>{}

            );
    };

    return getConversations;
}

// Get list of users conversations
export function useGetConversationsByPage() {

    const handleResponse = useHandleResponse();


    const getConversations = (page) => {

        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({"page":page}),
        };

        return fetch(
            `https://120.53.220.237:5002/api/messages/conversations`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>{}

            );
    };

    return getConversations;
}


// get conversation messages based on
// to and from id's
export function useGetConversationMessages() {

    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getConversationMessages = id => {
        return fetch(
            `https://120.53.220.237:5002/api/messages/conversations/query?userId=${id}`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>{}

            );
    };

    return getConversationMessages;
}

// get conversation messages based on
// to and from id's
export function useGetConversationMessagesByPage() {

    const handleResponse = useHandleResponse();


    const getConversationMessages = (id,page) => {

        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({"page":page}),
        };

        console.log("========useGetConversationMessagesByPage========");
        console.log(id)
        console.log(page)

        return fetch(
            `https://120.53.220.237:5002/api/messages/conversations/query?userId=${id}`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>{}

            );
    };

    return getConversationMessages;
}

export function useSendConversationMessage() {

    const handleResponse = useHandleResponse();

    const sendConversationMessage = (id, body) => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ to: id, body: body }),
        };

        return fetch(
            `https://120.53.220.237:5002/api/messages/`,
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {{}
                console.log(err);

            });
    };

    return sendConversationMessage;
}
