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

    return { allUserInfo, token: this.token };
  }

  // Update User
  static async updateUser(userData, username, token) {
    this.token = token;
    let res = await this.request(`users/${username}`, userData, 'patch');

    return res.user;
  }

  // Delete user

  static async deleteUser(data, token) {
    this.token = token;
    let res = await this.request(`users/${data.username}`, data, 'delete');

    return res;
  }

  // Get All Users
  static async getAllUsers(token) {
    this.token = token;
    let res = await this.request(`users`);

    return res.users;
  }

  // Follow user
  static async follow(data, token) {
    this.token = token;
    await this.request(`users/follow`, data, 'post');
  }

  // Unfollow user

  static async unfollow(data, username, token) {
    this.token = token;

    let res = await this.request(`users/${username}/unfollow`, data, 'delete');

    return res;
  }

  // GET following list
  static async getFollowingList(id, token) {
    this.token = token;
    let res = await this.request(`users/${id}/following`);
    const listOfIds = res.following.map(follow => follow.followed_id);
    return listOfIds;
  }
  // Create post
  //User data should contain post and user token
  static async createPost(userData, token) {
    this.token = token;
    let res = await this.request(`posts/new`, userData, 'post');

    return res;
  }
  // Get posts
  static async getPosts() {
    let res = await this.request(`posts`);
    return res.posts;
  }

  // Update post
  static async updatePost(postData, postId, token) {
    this.token = token;

    let res = await this.request(`posts/${postId}/update`, postData, 'patch');

    return res.post;
  }

  // Delete post

  static async deletePost(data, token) {
    this.token = token;
    let res = await this.request(`posts/${data.postId}/delete`, data, 'delete');

    return res;
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

    return res.comment;
  }

  // Get Comments
  static async getComments(postId, token) {
    this.token = token;
    let res = await this.request(`posts/${postId}/comments`);
    return res.comments;
  }

  static async updateComment(data, token) {
    this.token = token;
    let res = await this.request(
      `posts/${data.postId}/comments/${data.commentId}/update`,
      data,
      'patch'
    );

    return res.post;
  }

  // Delete Comment

  static async deleteComment(data, token) {
    this.token = token;
    let res = await this.request(
      `posts/${data.postId}/comments/${data.commentId}/delete`,
      data,
      'delete'
    );

    return res;
  }

  // Add like to post
  // Should contain postId or commentId, user token and the users id
  // postId/commentId will be id in the arguments
  // idType will specify wether it is a post or comment
  static async addLike(data, token) {
    this.token = token;
    const { type, postId, id } = data;

    let path;
    if (type === 'comments') {
      path = `posts/${postId}/${type}/${id}/like`;
    } else {
      path = `${type}/${postId}/like`;
    }

    await this.request(path, data, 'post');

    return true;
  }

  // Get all likes for page
  static async getLikes(data, token) {
    this.token = token;
    const { type, postId, id } = data;

    let path;
    if (type === 'comments') {
      path = `posts/${postId}/${type}/${id}/likes`;
    } else {
      path = `${type}/${postId}/likes`;
    }
    const res = await this.request(path);

    const likesUserIds = res.likes.map(like => like.userId);
    return likesUserIds;
  }

  // Unlike
  static async unlike(data, token) {
    this.token = token;
    const { type, postId, id } = data;

    let path;
    if (type === 'comments') {
      path = `posts/${postId}/${type}/${id}/like`;
    } else {
      path = `${type}/${postId}/like`;
    }
    await this.request(path, data, 'delete');
  }
}

// Delete Comment

// for now, put token ("testuser" / "password" on class)
// Api.token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
//   'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
//   'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default Api;
