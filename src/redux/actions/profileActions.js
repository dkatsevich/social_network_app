
const updatePost = (body) => ({type: "UPDATE_POST", body});
const addPost = () => ({type: "ADD_POST"});
const loadedProfile = (profile) => ({type: "LOADED_PROFILE", profile});

export {
    updatePost,
    addPost,
    loadedProfile,
}