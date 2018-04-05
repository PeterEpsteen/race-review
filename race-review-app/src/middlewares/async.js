function isPromise(val) {
    return val && typeof val.then === 'function';
}

export default function({ dispatch }) {
    return next => action => {
        if(!isPromise(action))
            return next(action);
        
        action.payload
            .then(response => {
                dispatch({...action, payload: response});
            });
    }
}