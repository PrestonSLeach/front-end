export const user = {
  name: 'user',
  url: '/user',
  component: 'user'
}

export const userView = {
  name: 'user.userView',
  url: '/:user',
  params: {
    user: user
  },
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

export const following = {
  name: 'user.following',
  url: '/:user/following',
  component: 'following',
  params: {
    user: user
  }
}
