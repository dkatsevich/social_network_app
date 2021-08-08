const initialState = {
    posts: [
        {id: 1, body: 'Hey, why nobody love me 0?'},
        {id: 2, body: 'Hey, why nobody love me 1?'},
        {id: 3, body: 'Hey, why nobody love me 2?'},
        {id: 4, body: 'Hey, why nobody love me 3?'},
        {id: 5, body: 'Hey, why nobody love me 4?'},
    ],
    newPost: '',
    profile: {}
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
                        body: state.newPost
                    }
                ],
                newPost: ''
            }
        case 'UPDATE_POST':
            return {
                ...state,
                newPost: action.body
            }
        case 'LOADED_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state;
    }
}


export default profileReducer;