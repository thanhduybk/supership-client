export function requestPending(type) {
    return {
        type
    }
}

export function requestCompleted(type, data) {
    return {
        type,
        payload: data
    }
}

export function requestFailure(type, error) {
    return {
        type,
        payload: error
    }
}

