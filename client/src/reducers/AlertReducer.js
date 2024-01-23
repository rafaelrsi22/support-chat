export const alertActions = {
    createAlert: (title, description) => {
        return {
            type: 'CREATE_ALERT',
            payload: {title, description}
        }
    },
    popAlert: {
        type: 'POP_ALERT'
    }
}

export default (state = [], action) => {
    switch(action.type) {
        case 'CREATE_ALERT': 
            const {title, description} = action.payload;
            return [...state, {title, description}];
        case 'POP_ALERT':
            return state.slice(0, -1);
        default: 
            return state;
    }
}