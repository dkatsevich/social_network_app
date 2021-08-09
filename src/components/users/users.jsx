import React, {Component} from "react";
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
} from "../../redux/actions/usersActions";
import {changeLoadingStatus} from '../../redux/actions/loadingActions'
import Spinner from "../spinner/spinner";

class UsersContainer extends Component {

    componentDidMount() {
        const {getUsersThunk, pageSize, currentPage} = this.props;
        getUsersThunk(currentPage, pageSize);
    }

    renderUsers = (arr) => {
        const {toggleFollowConfirm, myId, toggleDisable, isFetching, disabledUsers, toggleFollowThunk} = this.props;
        return arr.map(user => {
            const {id, ...userInfo} = user;
            const me = id === myId ? true : false;
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

    renderPagination = () => {
        const {pageSize, totalCount, currentPage} = this.props;
        let pageCount = Math.floor(totalCount / pageSize);
        const arr = []

        for (let i = 1; i < pageCount; i++) {
            if (i > 13) {
                break;
            }
            arr.push(i)
        }

        return arr.map((item, i) => {

            return (
                <button key={i} className={`users__pag-btn ${item === currentPage ? 'active' : ''}`}
                        onClick={() => this.paginationRequest(item)}>{item}</button>
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
        console.log('render')
        const {users, currentPage, loading} = this.props;
        const userItems = this.renderUsers(users);

        return (
            <Users users={userItems}
                   currentPage={currentPage}
                   pagination={this.renderPagination()}
                   paginationRequest={this.paginationRequest}
                   loading={loading}
            />
        )
    }
}

const Users = ({users, loading, pagination}) => {
    return (
        <div className="users">
            <div className="users__title">Users</div>
            <div className="users__pagination">
                {pagination}
            </div>
            <div className="users__items">
                {loading ? <Spinner/> : users}
            </div>
        </div>
    )
}

const mapStateToProps = ({
                             usersReducer: {users, pageSize, totalCount, currentPage, isFetching, disabledUsers},
                             loadingReducer: {loading},
                             authReducer: {id}
                         }
) => ({
    users,
    isFetching,
    pageSize,
    totalCount,
    currentPage,
    loading,
    disabledUsers,
    myId: id
})

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