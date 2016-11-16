import { editUser } from './editUser.component'
import { configure } from './editUser.config'
import { EditUserService } from './editUser.service'

export default
  angular
    .module('twitter-edit-user', [])
    .component('editUser', editUser)
    .service('$editUser', EditUserService)
    .config(configure)
    .name
