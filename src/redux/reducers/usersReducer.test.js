import {likeUser, setUsers} from "../actions/usersActions";
import usersReducer from "./usersReducer";

describe('Testing userReducer and it actions', () => {
    it('Users should be setter', () => {
        // 1 Start data
        const state = {
            users: [1,2],
        };
        const action = setUsers([1,2,3,4,5]);
        // 2 Action
        const newState = usersReducer(state, action);
        // 3 Expected Result

        expect(newState.users.length).toBeGreaterThan(0);
    })

    it('Users should be liked', () => {
        // 1 Start data
        const state = {
            users: [
                {name: 1, liked: false},
                {name: 2, liked: false}
            ],
        };
        const action = likeUser(1);
        // 2 Action
        const newState = usersReducer(state, action);
        // 3 Expected Result

        expect(newState.users[1].liked).toBe(true);
    })
})