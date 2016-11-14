export class ConfigService {

  baseClickAmount = 1
  clickUpgradeMultiplier = 1.5
  baseClickUpgradeCost = 10
  clickUpgradeCostMultiplier = 1.25
  autoclickInterval = 1000
  baseAutoclickCost = 100
  autoclickCostMultiplier = 1.4

  constructor ($log) {
    'ngInject'
    $log.debug('ConfigService instantiated!')
  }
}
