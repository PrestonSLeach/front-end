import { tag } from './tag.component'
import { configure } from './tag.config'
import { TagService } from './tag.service'

export default
  angular
    .module('twitter-tag', [])
    .component('tag', tag)
    .service('$tag', TagService)
    .config(configure)
    .name
