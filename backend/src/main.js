/**
 * This serves as the entry point to your application.
 */
import collection from './db.js';

let main = (arrayOfUsers) => {
  return collection('users')
    .then ((Users) => {
      for(let i = 0; i < arrayOfUsers.length; i++) {
        Users.insertOne({username: arrayOfUsers[i][0] , shirtColor:  arrayOfUsers[i][1]})
          .then((text) => console.log(text));
      }
    });
}


export default main;
