import icon from "../../users/user/icon.jpg";
import Bg from "../content.jpg";
import MyPosts from "../MyPosts/MyPosts";
import React, {Component} from "react";
import {updateStatus} from "../../../redux/actions/profileActions";

const Profile = ({status, updateStatus, profile: {fullName, photos, contacts}}) => {
    const imgSmall = photos ? (photos.small ? photos.small : icon) : icon;
    const contactsList = contacts ? Object.entries(contacts).map((item, i) => {
        if (item[1]) {
            return <li key={i} className="profile__user-list-item">{item[0]}: {item[1]}</li>
        }
    }) : null;

    return (
        <div className="profile">
            <div className="profile__img-wrapper"><img className="profile__img" src={Bg} alt=""/></div>
            <MyInfo fullName={fullName} contactsList={contactsList} imgSmall={imgSmall} status={status} updateStatus={updateStatus}/>
            <MyPosts photos={photos.small ? photos : {small: icon}}/>
        </div>
    )
}

const MyInfo = ({imgSmall, status, updateStatus, fullName, contactsList}) => {
    return (
        <div className="profile__user">
            <div className="profile__user-img"><img src={imgSmall} alt=""/></div>
            <div className="profile__user-info">
                <div className="profile__user-name">{fullName}</div>
                <StatusInfo status={status || 'Some Status'} updateStatus={updateStatus}/>
                <ul className="profile__user-list">
                    {contactsList}
                </ul>
            </div>
        </div>
    )
}

class StatusInfo extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }

    }

    onChangeStatus = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    EnabledEdit = () => {
        this.setState({
            editMode: true
        })
    }

    DisableEdit = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }

    render() {
        const {editMode, status} = this.state;

        return (
            <div className='user-status'>
                {!editMode ?
                    <div className='user-status__span'>
                        <span onDoubleClick={this.EnabledEdit}>{this.props.status}</span>
                    </div>
                    :
                    <div className='user-status__input'>
                        <input onChange={this.onChangeStatus} onBlur={this.DisableEdit} autoFocus={true} value={status}/>
                    </div>
                }
                {/*<button  className="user-status__edit">Click to edit</button>*/}
            </div>
        )
    }
}

export default Profile;