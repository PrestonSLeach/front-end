export class EditUserService {

  constructor ($log) {
    'ngInject'
    // options listed in edit profile
    this.editUsername
    this.editPassword
    this.editFirstName
    this.editLastName
    this.editPhoneNumber
    this.deleteAccount
    this.editEmail
    // optional?
    // editPrivacy
    $log.debug('EditUserService instantiated')
  }
}
