module.exports = {
  post_signin : require('./methods/post/signin.js'),
  post_signup : require('./methods/post/signup'),
  post_signout : require('./methods/post/signout'),
  post_myvideo : require('./methods/post/myvideo'),
  post_like_video : require('./methods/post/like_video'),
  post_like_comment : require('./methods/post/like_comment'),
  post_comment : require('./methods/post/comment'),
  post_socialSignin : require('./methods/post/socialSignin'),
  
  get_emailauth: require('./methods/get/emailauth'),
  get_userinfo : require('./methods/get/userinfo'),
  get_videos : require('./methods/get/videos'),
  get_myvideo : require('./methods/get/myvideo'),
  get_like_video : require('./methods/get/like_video'),
  get_like_comment : require('./methods/get/like_comment'),
  
  put_myvideo : require('./methods/put/myvideo'),
  put_comment : require('./methods/put/comment'),
  put_userinfo : require('./methods/put/userinfo'),

  delete_userinfo : require('./methods/delete/userinfo'),
  delete_like_video : require('./methods/delete/like_video'),
  delete_like_comment : require('./methods/delete/like_comment'),
  delete_myvideo : require('./methods/delete/myvideo'),
  delete_comment : require('./methods/delete/comment'),
};
