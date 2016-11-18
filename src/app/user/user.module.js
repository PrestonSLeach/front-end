import { user } from './user.component'
import { configure } from './user.config'
import { UserService } from './user.service'
import { userView } from './userView.component'
import { UserViewService } from './userView.service'
import { followers } from './followers/followers.component'
import { FollowersService } from './followers/followers.service'
import { following } from './following/following.component'
import { FollowingService } from './following/following.service'

export default
  angular
    .module('twitter-user', [])
    .component('user', user)
    .service('$user', UserService)
    .component('userView', userView)
    .service('$userView', UserViewService)
    .component('followers', followers)
    .service('$followers', FollowersService)
    .component('following', following)
    .service('$following', FollowingService)
    .config(configure)
    .name
