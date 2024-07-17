import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addUser, addFinancials, addPetsQuest} from './UserModel';
import { Alert } from 'react-native';


export const signUpEmailPass = (profile, success, unsuccess)=>{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // เพิ่ม 1 เพราะเดือนใน JavaScript เริ่มนับที่ 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log(`email: ${profile.email}`)
    auth().createUserWithEmailAndPassword(profile.email, profile.password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log(`User: in signUpEmailPass: ${user}`)
      addUser(user, profile, success, unsuccess)
      addFinancials(user,formattedDate)
      addPetsQuest(user)
    })
    .catch((error)=>{
      const msg = (`signUpEmailPass error: ${error}`)
      unsuccess(msg)
    })
}

export const signInEmailPass = (email, password, success,unsuccess) => {
    
    auth().signInWithEmailAndPassword(email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        updateCurrentDate(user.uid)
        console.log(`user after logged in: ${user}`)
        success(user)
    })
    .catch((error) => {
      const msg = (`signInEmailPass error: ${error}`)
      unsuccess(msg)
    });
}

export const updateCurrentDate = (userUID)=>{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // เพิ่ม 1 เพราะเดือนใน JavaScript เริ่มนับที่ 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return firestore()
        .collection('financials')
        .doc(userUID)
        .update({
            CurrentDate: formattedDate
        })
        .then(() => {
            console.log("Update CurrentDate successfully!");

        })
       
        .catch((error) => {
            console.error("Error update currentDate:", error);
            throw error;
        });
}

export const showCurrentEmail = (success, unsuccess) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const currentEmail = currentUser.email;
    success(currentEmail);
  } else {
    unsuccess('No user is signed in');
  }
};

export const retrieveUserData = ()=>{
  return firestore()
        .collection('users')
        .get()
        .then((doc)=>{
          if (!doc.empty) {
            const userData = [];
            doc.forEach((doc) => {
              userData.push(doc.data());
            });
            return userData;
          } else {
              console.log("No such document");
              return false;
          }
        })
        .catch((error) => {
          console.log(`retrieveUserData error: ${error}`)
        })
}

export const forgetPassword = async(email, phoneNumber, success, unsuccess) => {
  console.log(email)
  console.log(phoneNumber)
  const userData = await retrieveUserData()
  if(userData){
    let matchingUserData = userData.find(data => data.email == email && data.phoneNumber == phoneNumber)
    if(matchingUserData){
      auth().sendPasswordResetEmail(email)
      .then(() => {
        success(`Reset password ${email}`)
      })
      .catch((error) => {
        const msg = `Reset password error: ${error}`
        unsuccess(msg)
      }) 
    }else{
      Alert.alert(`email กับ phone number ไม่ตรงกัน หรือ ไม่มี email นี้อยู่ในระบบ`)
    }
  } else {
    console.log("No user data");
  }
}



export const changePassword = (email, oldPassword, newPassword, success, unsuccess) => {
  const user = auth().currentUser;

  if (!user) {
    const msg = "User is not authenticated. Please log in.";
    unsuccess(msg);
    return;
  }
  // Re-authenticate
  const credential = auth.EmailAuthProvider.credential(email, oldPassword);
  console.log("Re-authenticating user...");
  console.log(`old password: ${oldPassword}`)
  
  user.reauthenticateWithCredential(credential)
    .then(() => {
      console.log("User re-authenticated successfully.");
      // update the password
      user.updatePassword(newPassword)
        .then(() => {
          console.log("Password updated successfully.");
          console.log(`new password: ${newPassword}`)
          success();
        })
        .catch((error) => {
          const msg = `Failed to update password: ${error}`;
          unsuccess(msg);
        });
    })
    .catch((error) => {
      const msg = `Re-authentication failed: ${error}`;
      unsuccess(msg);
    });
};

export const signOut = ()=>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}
