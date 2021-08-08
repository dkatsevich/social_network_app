import React, {Component} from "react";
import axios from "../../services/serviceApi";
import {connect} from "react-redux";

import './users.scss'
import User from "./user/user";
import {setCurrentPage, setTotalCount, setUsers, toggleDisable, toggleFollow} from "../../redux/actions/usersActions";
import {changeLoadingStatus} from '../../redux/actions/loadingActions'
import Spinner from "../spinner/spinner";

class UsersContainer extends Component {

    componentDidMount() {
        const {currentPage, pageSize, setUsers, setTotalCount, changeLoadingStatus} = this.props;
        changeLoadingStatus(true)


        axios.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                setUsers(res.data.items)
                setTotalCount(res.data.totalCount)
                changeLoadingStatus(false)
            })
    }

    renderUsers = (arr) => {
        const {toggleFollow, myId, toggleDisable, isFetching, disabledUsers} = this.props;
        return arr.map(user => {
            const {id, ...userInfo} = user;
            const me = id === myId ? true : false;
            return (
                <User key={id}
                      id={id}
                      userInfo={userInfo}
                      toggleFollow={() => toggleFollow(id)}
                      toggleDisabled={toggleDisable}
                      disable={isFetching}
                      disabledUsers={disabledUsers}
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
        const {setCurrentPage, setUsers, currentPage, pageSize, changeLoadingStatus} = this.props;

        if (pageNumber !== currentPage) {
            changeLoadingStatus(true)
            setCurrentPage(pageNumber);
            axios.get(`/users?page=${pageNumber}&count=${pageSize}`)
                .then(res => {
                    setUsers(res.data.items)
                    changeLoadingStatus(false)
                })
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
    toggleFollow,
    setTotalCount,
    setCurrentPage,
    changeLoadingStatus,
    toggleDisable,
}


export default connect(mapStateToProps, actions)(UsersContainer);