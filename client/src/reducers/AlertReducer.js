function generateID() {
    return `alert-${(Math.random() * Math.random()).toString().replace('.', '')}`;
}

export const alertActions = {
    createAlert: (title, description) => {
        return {
            type: 'CREATE_ALERT',
            payload: {title, description}
        }
    },
    deleteAlert: (id) => {
        return {
            type: 'DELETE_ALERT',
            payload: {id}
        }
    }
}

export default (state = [], action) => {
    switch(action.type) {
        case 'CREATE_ALERT': 
            const {title, description} = action.payload;
            const alertID = generateID();
            return [...state, {title, description, id: alertID}];
        case 'DELETE_ALERT':
            const copy = [];
            state.map((value) => {
                if (value.id !== action.payload.id) {
                    copy.push(value);
                }
            });

            return copy;
        default: 
            return state;
    }
}