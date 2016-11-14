export class GameService {
  initialized = false

  constructor ($log, $config, $interval) {
    'ngInject'
    this.$config = $config
    this.$interval = $interval
    $log.debug('GameService instantiated!')
  }

  init () {
    this.total = 0
    this.autoclickers = []
    this.initialized = true
  }

  destroy () {
    if (this.initialized) {
      this.initialized = false
      this.autoclickers.forEach(p => this.$interval.cancel(p))
    }
  }

  get numAutoclickers () {
    return this.autoclickers.length
  }

  click () {
    this.total += this.$config.baseClickAmount
  }

  canAddAutoclicker () {
    return this.total >= this.$config.baseAutoclickCost
  }

  addAutoclicker () {
    if (this.canAddAutoclicker()) {
      this.total -= this.$config.baseAutoclickCost
      this.autoclickers.push(
        this.$interval(::this.click, this.$config.autoclickInterval)
      )
    }
  }

  exists () {
    return this.initialized !== false
  }
}
