export const actions = {
    createAlert: (title, description) => {
        return {
            type: 'CREATE_ALERT',
            payload: {title, description}
        }
    }
}

export default (state = [], action) => {
    switch(action.type) {
        case 'CREATE_ALERT': 
            const {title, description} = action.payload;
            return [...state, {title, description}]
        default: 
            return state;
    }
}