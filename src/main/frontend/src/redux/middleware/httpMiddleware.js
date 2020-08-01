const URL_PREFIX = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

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
    if (action.meta && action.meta.httpAction) {
        const endpoint = action.meta.httpAction.endpoint;
        const options = action.meta.httpAction.options;

        next({
            type: action.type + '/request',
            payload: action.payload
        });

        return fetch(URL_PREFIX + endpoint, options)
            .then(response => handleResponse(response))
            .then(json => next({
                type: action.type + '/success',
                payload: action.payload,
                meta: {
                    response: json
                }
            }))
            .catch(error => next({
                type: action.type + '/failure',
                payload: action.payload,
                error: error
            }))
    } else {
        return next(action);
    }
}

export default httpMiddleware;