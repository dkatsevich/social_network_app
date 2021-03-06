import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '8e2051ba-3198-4ba7-b7f9-6c6ee8e02777'
    }
});

const UserAPI = {
    getUsers(pageNumber = 1, pageSize = 4) {
        return instance.get(`/users?page=${pageNumber}&count=${pageSize}`)
    },
    toggleFollow(id, follow) {
      if (follow) {
          return instance.post(`/follow/${id}`, {})
      }  else {
          return instance.delete(`/follow/${id}`, {})
      }
    },

}

const ProfileAPI = {
    getProfile(id) {
        return instance.get(`/profile/${id}`)
    },
    getStatus(id) {
        return instance.get(`/profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status})
    },
    updatePhotos(photo) {
        const formData = new FormData();
        formData.append('image', photo)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    postContacts(data) {
        return instance.put(`/profile`, data)
    }
}

const AuthAPI = {
    authMe() {
        return instance.get(`/auth/me`)
    },
    logIn(data) {
        return instance.post('/auth/login', {...data})
    },
    logOut() {
        return instance.delete('/auth/login')
    }
}

const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
    }
}


export default UserAPI;
export {
    AuthAPI,
    ProfileAPI,
    SecurityAPI
}