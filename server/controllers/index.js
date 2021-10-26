module.exports = {
  post_signin : require('./methods/post/signin.js'),
  post_signup : require('./methods/post/signup'),
  post_signout : require('./methods/post/signout'),
  post_myvideo : require('./methods/post/myvideo'),
  post_like : require('./methods/post/like'),
  post_comment : require('./methods/post/comment'),
  post_socialSignin : require('./methods/post/socialSignin'),

  get_userinfo : require('./methods/get/userinfo'),
  get_videos : require('./methods/get/videos'),
  get_myvideo : require('./methods/get/myvideo'),
  get_like : require('./methods/get/like'),
  
  put_myvideo : require('./methods/put/myvideo'),
  put_comment : require('./methods/put/comment'),
  put_userinfo : require('./methods/put/userinfo'),

  delete_userinfo : require('./methods/delete/userinfo'),
  delete_like : require('./methods/delete/like'),
  delete_myvideo : require('./methods/delete/myvideo'),
  delete_comment : require('./methods/delete/comment'),
};
