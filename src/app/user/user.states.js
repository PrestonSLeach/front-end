export const user = {
  // parent: 'app',
  name: 'user',
  url: '/user',
  // resolve: {
  //   user: (Users) => Users.all()
  // },
  component: 'user'
}

export const userView = {
  name: 'user.userView',
  url: '/:user',
  params: {
    user: user
  },
  // resolve: {
  //   user: (Users, $transition$) => Users.get($transition$.params().userName)
  // },
  component: 'userView'
}

export const followers = {
  name: 'user.followers',
  url: '/:user/followers',
  component: 'followers',
  params: {
    user: user
  }
}
//
// export const following = {
//   name: 'user.following',
//   url: '/following',
//   component: 'following'
// }
