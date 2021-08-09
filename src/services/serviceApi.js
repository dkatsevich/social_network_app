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
    authMe() {
        return instance.get(`/auth/me`)
    },
    toggleFollow(id, follow) {
      if (follow) {
          return instance.post(`/follow/${id}`, {})
      }  else {
          return instance.delete(`/follow/${id}`, {})
      }
    },
    getProfile(id) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
    }


}

export default UserAPI;