import gql from 'graphql-tag';

const SIGNUP_QUERY = gql`
mutation ($userEmail: String, $userPassword: String, $firstName: String, $lastName: String, $userPhone: String, $userAddress: String, $userZip: String, $accountType: Int) {
    customersignup(userEmail: $userEmail, userPassword: $userPassword, firstName: $firstName, lastName: $lastName, userPhone: $userPhone, userAddress: $userAddress, userZip: $userZip, accountType: $accountType) {
      success
      duplicateUser
    }
  }`

const OWNER_SIGNUP_QUERY = gql`
  mutation ($userEmail: String, $userPassword: String, $firstName: String, $lastName: String, $userPhone: String, $restAddress: String, $restZip: String, $accountType: Int, $restName: String, $restPhone : String, $restDesc: String) {
      ownersignup(userEmail: $userEmail, userPassword: $userPassword, firstName: $firstName, lastName: $lastName, userPhone: $userPhone, accountType: $accountType, restName: $restName, restAddress: $restAddress, restZip:$restZip, restPhone: $restPhone, restDesc: $restDesc) {
        success
        duplicateUser
      }
    }`

const UPDATE_PROFILE_QUERY = gql`
    mutation ($userEmail: String, $userPassword: String, $firstName: String, $lastName: String, $userPhone: String, $userAddress: String, $userZip: String, $accountType: Int) {
        updateProfile(userEmail: $userEmail, userPassword: $userPassword, firstName: $firstName, lastName: $lastName, userPhone: $userPhone, userAddress: $userAddress, userZip: $userZip, accountType: $accountType) {
          success
        }
    }`

const OWNER_UPDATE_PROFILE_QUERY = gql`
    mutation ($userEmail: String, $userPassword: String, $firstName: String, $lastName: String, $userPhone: String, $userAddress: String, $userZip: String, $accountType: Int, $restName: String, $restAddress: String, $restZip: String, $restPhone: String, $restDesc: String) {
        updateProfile(userEmail: $userEmail, userPassword: $userPassword, firstName: $firstName, lastName: $lastName, userPhone: $userPhone, userAddress: $userAddress, userZip: $userZip, accountType: $accountType, restName: $restName, restAddress: $restAddress, restZip: $restZip, restPhone: $restPhone, restDesc: $restDesc) {
          success
        }
    }`

const ADD_ITEM = gql`
    mutation($userEmail: String, $itemName: String,$itemType: String, $itemPrice: Int, $itemDesc: String, $cuisineName: String){
        additem(userEmail:$userEmail, itemName: $itemName, itemType: $itemType, itemPrice: $itemPrice, itemDesc: $itemDesc, cuisineName: $cuisineName){
          success
        }
      }`


export { SIGNUP_QUERY, OWNER_SIGNUP_QUERY, UPDATE_PROFILE_QUERY, OWNER_UPDATE_PROFILE_QUERY, ADD_ITEM }