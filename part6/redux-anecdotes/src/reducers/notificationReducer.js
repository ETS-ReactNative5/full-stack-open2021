const notificationReducer = (state = { message: '', show: false }, action) => {
    switch(action.type) {
        case 'SHOW':
            const newState = {
                message: action.message,
                show: true
            }
            return newState
        
        case 'HIDE':
            const newState2 = {
                message: action.message,
                show: false
            }
            return newState2
    }
    return state
}

export const showMessage = message => {
    return {
        type: 'SHOW',
        message: message,
        show: true
    }
}

export const hideMessage = () => {
    return {
        type: 'HIDE',
        message: '',
        show: false
    }
}


export default notificationReducer