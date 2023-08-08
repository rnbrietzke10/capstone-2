import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class Api {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Signup user
  static async createUser(userData) {
    let res = await this.request(`auth/register`, userData, 'post');

    return res.token;
  }

  // login user
  static async loginUser(userData) {
    let res = await this.request('auth/token', userData, 'post');
    this.token = res.token;
    let allUserInfo = await this.request(`users/${userData.username}`);
    localStorage.setItem('user', JSON.stringify(allUserInfo.user));
    localStorage.setItem('token', this.token);
    console.log('All User Data: ', allUserInfo.user);

    return { allUserInfo, token: this.token };
  }

  // Update User
  static async updateUser(userData, username, token) {
    this.token = token;
    let res = await this.request(`users/${username}`, userData, 'patch');

    return res.user;
  }

  // Update User
  static async getAllUsers(user, token) {
    this.token = token;
    let res = await this.request(`users`, user);
    console.log(res);
    return res.users;
  }

  // Add Friend
  static async addFriend(data, token) {
    this.token = token;
    let res = await this.request(`users/add-friend`, data, 'post');
    return 'Added!';
  }

  // Create post
  //User data should contain post and user token
  static async createPost(userData, token) {
    this.token = token;
    let res = await this.request(`posts/new`, userData, 'post');

    return res;
  }

  // Create post
  //User data should contain post and user token
  static async deletePost(userData, token) {
    this.token = token;
    let res = await this.request(`posts/delete`, userData, 'delete');

    return res;
  }

  // Get posts
  static async getPosts() {
    let res = await this.request(`posts`);
    return res.posts;
  }

  // Create comment
  //User data should contain comment and user token
  static async createComment(userData, postId, token) {
    this.token = token;
    let res = await this.request(
      `posts/${postId}/comments/new`,
      userData,
      'post'
    );
    console.log(res.comment);

    return res.comment;
  }

  // Get Comments
  static async getComments(postId, token) {
    this.token = token;
    let res = await this.request(`posts/${postId}/comments`);
    return res.comments;
  }

  // Add like
  // Should contain postId or commentId, user token and the users id
  // postId/commentId will be id in the arguments
  // idType will specify wether it is a post or comment
  static async addLike(data, token) {
    this.token = token;
    const { type, postId } = data;
    let path;
    if (type === 'comments') {
      path = `posts/${postId}/${type}/${data.commentId}/like`;
    } else {
      path = `${type}/${postId}/like`;
    }
    await this.request(path, data, 'post');
  }

  // Get all likes for page
  static async getLikes(data, token) {
    this.token = token;
    const { type, postId } = data;

    let path;
    if (type === 'comments') {
      path = `posts/${postId}/${type}/${data.commentId}/likes`;
    } else {
      path = `${type}/${postId}/likes`;
    }
    const res = await this.request(path);

    const likesUserIds = res.likes.map(like => like.userId);

    return likesUserIds;
  }

  // Unlike post
  static async unlike(data, token) {
    this.token = token;
    const { type, postId } = data;
    let path;
    if (type === 'comments') {
      path = `posts/${postId}/${type}/${data.commentId}/like`;
    } else {
      path = `${type}/${postId}/like`;
    }
    await this.request(path, data, 'delete');
  }
}

// for now, put token ("testuser" / "password" on class)
// Api.token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
//   'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
//   'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default Api;
