const initialState = {
    messages: [
        {
            id: 1,
            body: 'Hello',
            address: 'from',
            name: 'Andrew',
            img: './../friend1.png',
            who: 'me'
        },
        {
            id: 2,
            body: 'Hi',
            address: 'to',
            name: 'Me',
            img: './../myavatar.png',
            who: 'me'

        },
        {
            id: 3,
            body: 'New Social Network',
            address: 'from',
            name: 'Andrew',
            img: './../friend1.png',
            who: 'me'

        },
        {
            id: 4,
            body: 'Yes, course',
            address: 'to',
            name: 'Me',
            img: './../myavatar.png',
            who: 'me'
        },
    ],
    newMessage: ''
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                newMessage: action.body
            }
        case 'POST_MESSAGE':
            return {
                messages: [
                    ...state.messages,
                    {
                        id: 6,
                        body: state.newMessage,
                        address: 'to',
                        name: 'Me',
                        img: './../myavatar.png'
                    }
                ],
                newMessage: ''
            }
        default:
            return state;
    }
}


export default messageReducer;