const handleResponse = async response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.toLowerCase() === 'application/json') {
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message);
        };
        return json;
    } else {
        throw new Error("Something went wrong");
    }
}

const httpMiddleware = store => next => action => {
    if (action['httpAction']) {
        const endpoint = action.httpAction.endpoint;
        const options = action.httpAction.options;

        next({
            type: action.type + '_REQUEST',
            payload: action.payload
        });

        return fetch(endpoint, options)
            .then(response => handleResponse(response))
            .then(json => next({
                type: action.type + '_SUCCESS',
                payload: action.payload,
                response: json
            }))
            .catch(error => next({
                type: action.type + '_FAILURE',
                payload: action.payload,
                error: error
            }))
    } else {
        return next(action);
    }
}

export default httpMiddleware;