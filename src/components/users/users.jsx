import React, {Component, useState} from "react";
import {connect} from "react-redux";

import './users.scss'
import User from "./user/user";
import {
    getUsersThunk,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleDisable,
    toggleFollowConfirm,
    toggleFollowThunk
} from "../../redux/reducers/usersReducer";
import {changeLoadingStatus} from '../../redux/reducers/loadingReducer'
import Spinner from "../spinner/spinner";
import {
    getCurrentPage,
    getDisabledUsers,
    getId,
    getIsFetching,
    getLoading,
    getPageSize,
    getTotalCount,
    getUsers
} from "../../redux/selectors/userSelectors";

class UsersContainer extends Component {

    componentDidMount() {
        const {getUsersThunk, pageSize, currentPage} = this.props;
        getUsersThunk(currentPage, pageSize);
    }

    renderUsers = (arr) => {
        const {toggleFollowConfirm, myId, toggleDisable, isFetching, disabledUsers, toggleFollowThunk} = this.props;
        return arr.map(user => {
            const {id, ...userInfo} = user;
            const me = id === myId;
            return (
                <User key={id}
                      id={id}
                      userInfo={userInfo}
                      toggleFollowConfirm={() => toggleFollowConfirm(id)}
                      toggleDisabled={toggleDisable}
                      disable={isFetching}
                      disabledUsers={disabledUsers}
                      toggleFollowThunk={toggleFollowThunk}
                      me={me}
                />
            )
        })
    }

    paginationRequest = (pageNumber) => {
        const {setCurrentPage, currentPage, pageSize, getUsersThunk} = this.props;

        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            getUsersThunk(pageNumber, pageSize)
        }
    }

    render() {
        const {users, currentPage, loading, pageSize, totalCount} = this.props;
        const userItems = this.renderUsers(users);

        return (
            <Users users={userItems}
                   paginationRequest={this.paginationRequest}
                   loading={loading}
                   pageSize={pageSize}
                   totalCount={totalCount}
                   currentPage={currentPage}
            />
        )
    }
}

const Paginator = ({pageSize, totalCount, currentPage, paginationRequest, portionCount = 10}) => {
    const pageCount = Math.floor(totalCount / pageSize);
    const startingAction = () => {
        const arr = [];
        for (let i = 1; i < pageCount; i++) {
            arr.push(i)
        }
        return arr
    }

    const [portionNumber, setPortionNumber] = useState(5);
    let LeftBorder = (portionNumber - 1) * portionCount + 1;
    let RightBorder = portionNumber * portionCount;

    console.log(portionNumber);
    return (
        <div>
            {portionNumber > 1 &&
                <button className='users__btn-prev' onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
            {
                startingAction()
                    .filter(item => item >= LeftBorder && item <= RightBorder)
                    .map(item => {
                        const activeClass = item === currentPage ? 'active' : '';
                        return <button
                            key={item}
                            className={`users__pag-btn ${activeClass}`}
                            onClick={() => paginationRequest(item)}
                        >{item}</button>
                    })
            }
            {(portionNumber + 1) < (pageCount / 10) &&
                <button className='users__btn-next' onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
        </div>
    )
}


const Users = ({users, loading, pageSize, totalCount, currentPage, paginationRequest}) => {
    return (
        <div className="users">
            <div className="users__title">Users</div>
            <div className="users__pagination">
                <Paginator pageSize={pageSize} totalCount={totalCount} currentPage={currentPage}
                           paginationRequest={paginationRequest}/>
            </div>
            <div className="users__items">
                {loading ? <Spinner/> : users}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        isFetching: getIsFetching(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        loading: getLoading(state),
        disabledUsers: getDisabledUsers(state),
        myId: getId(state)
    }
}

const actions = {
    setUsers,
    toggleFollowConfirm,
    setTotalCount,
    setCurrentPage,
    changeLoadingStatus,
    toggleDisable,
    getUsersThunk,
    toggleFollowThunk,
}


export default connect(mapStateToProps, actions)(UsersContainer);