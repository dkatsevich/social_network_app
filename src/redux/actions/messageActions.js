
const updateMessage = (body) => ({type: "UPDATE_MESSAGE", body});
const postMessage = () => ({type: "POST_MESSAGE"});

export {
    updateMessage,
    postMessage,
}