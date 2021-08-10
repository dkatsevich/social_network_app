const initialState = {
    posts: [
        {id: 1, body: 'Hey, why nobody love me 0?'},
        {id: 2, body: 'Hey, why nobody love me 1?'},
        {id: 3, body: 'Hey, why nobody love me 2?'},
        {id: 4, body: 'Hey, why nobody love me 3?'},
        {id: 5, body: 'Hey, why nobody love me 4?'},
    ],
    profile: {},
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: 6,
                        body: action.data
                    }
                ],
            }
        case 'LOADED_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'GET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }


        default:
            return state;
    }
}


export default profileReducer;