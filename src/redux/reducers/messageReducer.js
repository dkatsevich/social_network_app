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
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_MESSAGE':
            return {
                messages: [
                    ...state.messages,
                    {
                        id: 6,
                        body: action.data,
                        address: 'to',
                        name: 'Me',
                        img: './../myavatar.png'
                    }
                ],
            }
        default:
            return state;
    }
}

const postMessage = (data) => ({type: "POST_MESSAGE", data});

export {
    postMessage,
}

export default messageReducer;