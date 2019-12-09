import gql from 'graphql-tag';

const LOGIN_QUERY = gql`
query LoginQuery($userEmail: String, $userPassword: String){
        login(userEmail: $userEmail, userPassword: $userPassword){
        accountType
        firstName
        lastName
        userEmail
    }
}`


const PROFILE_QUERY = gql`
query($userEmail: String){
    profile(userEmail: $userEmail){
    userPassword
    accountType
    firstName
    lastName
    userEmail
    userPhone
    userAddress
    userZip
}
}`

const OWNER_PROFILE_QUERY = gql`
query($userEmail: String){
    profile(userEmail: $userEmail){
    userPassword,
    accountType,
    firstName,
    lastName,
    userEmail,
    userPhone,
    restaurant {
        restName
        restAddress
        restZip
        restPhone
        restDesc
    }
}
}`


const ALL_SECTIONS_QUERY = gql`
query($userEmail: String){
    sections(userEmail: $userEmail)
  }`

const ALL_ITEMS_QUERY = gql`
query($userEmail: String){
    items(userEmail: $userEmail){
      itemName
      itemType
      itemDesc
      itemPrice
      itemImage
      cuisineName
    }
  }`

const SEARCH = gql`
query($itemName: String){
    search(itemName: $itemName){
        restaurant{
        restName
        restAddress
        restZip
        restDesc
        restImage
        items{
            itemName
            cuisineName
            itemType
            itemPrice
            itemDesc
        }
      }
    }
  }`



const ITEMS_BY_RESTAURANT = gql`
  query($restName: String){
      restaurantitems(restName: $restName){
          restaurant{
          restName
          restAddress
          restZip
          restDesc
          restPhone
          restImage
          items{
            itemName
            itemType
            itemPrice
            cuisineName
            itemDesc
          }
        }
      }
    }`

const RESTAURANTS_BY_ITEM_CUISINE = gql`query($itemName: String, $cuisineName:String){
      restaurantbyitemcuisine(itemName: $itemName, cuisineName:$cuisineName){
        restaurant{
          restName
          restAddress
          restZip
          restDesc
          restImage
          items{
            itemName
            itemType
            itemPrice
            cuisineName
            itemDesc
          }
        }
      }
    }`




export { LOGIN_QUERY, PROFILE_QUERY, OWNER_PROFILE_QUERY, ALL_ITEMS_QUERY, ALL_SECTIONS_QUERY, SEARCH, RESTAURANTS_BY_ITEM_CUISINE, ITEMS_BY_RESTAURANT }