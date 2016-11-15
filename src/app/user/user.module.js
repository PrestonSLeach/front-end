import { user } from './user.component'
import { configure } from './user.config'
import { UserService } from './user.service'
import { editUser } from './editUser.component'
import { EditUserService } from './editUser.service'

export default
  angular
    .module('twitter-user', [])
    .component('user', user)
    .service('$user', UserService)
    .component('editUser', editUser)
    .service('$editUser', EditUserService)
    .config(configure)
    .name
