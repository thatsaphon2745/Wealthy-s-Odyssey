import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { showCurrentEmail } from '../../firebase/AuthModel';
import { signOut } from '../../firebase/AuthModel';
import { useDispatch } from 'react-redux';
import { setStatus } from '../../redux/variableSlice';

const TurquoiseHeader = ({ navigation }) => {
  return (
    <View style={ styles.turquoiseHeaderContainer }>
      <Image source={require('../../assets/ovalBar.png')} style = { styles.ovalBar } />

      <TouchableOpacity style={ styles.arrowLeft } onPress={() => { navigation.goBack(); }}>
        <IconAntDesign name="arrowleft" size={30} color="#ffffff" />
      </TouchableOpacity>
      
      <Text style={ styles.headerText }>Your Profile</Text>
    </View>
  );
};

const SecureEmail = ({ email }) => {
  const firstPart = email.substring(0, email.indexOf('@'));
  const securePart = firstPart.substring(0,3) + firstPart.substring(3).replace(/./g, '*');
  const visiblePart = email.substring(email.indexOf('@'));
  const secureEmail = securePart + visiblePart;

  return <Text style={styles.buttonText}>{secureEmail}</Text>;
};

export const MoreScreen = ({ navigation }) => {
  const [email,setEmail] = useState('');

  const dispatch = useDispatch()

  useEffect(() => {
    showCurrentEmail(
      (currentEmail) => setEmail(currentEmail),
      (error) => console.log(error)
    );
  }, []);

  const changeProfilePics = () => {
    console.log(`change profile picture`);
  };

  const handleEmailPress = () => {
    console.log(`reveal email: ${email}`);
  };

  const handleChatBot = () => {
    console.log(`navigate to chatBotScreen`);
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const handleLogOut = () => {
    signOut();
    navigation.navigate('SplashScreen');
  };

  return (
    <View style={ styles.container }>
      <TurquoiseHeader
        navigation={navigation}
      />
      {/* Profile Button */}
      <View style={ styles.button }>
        <TouchableOpacity onPress={changeProfilePics}>
          <Image source={require('../../assets/profiledeluxe_non-editable.png')} style={ styles.profileDeluxe }/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEmailPress}>
          <SecureEmail email={email} />
        </TouchableOpacity>
      </View>

      {/* Chat-Bot Button */}
      <View style={ styles.button }>
        <Image source={require('../../assets/circle_light.png')} style={ styles.circleLight }/>
        <Image source={require('../../assets/logoGreen.png')} style={ styles.icons }/>

        <TouchableOpacity onPress={handleChatBot}>
          <Text style={styles.chatbotText}>CHAT-BOT AI (BETA)</Text>
        </TouchableOpacity>
      </View>

      {/* Account Button */}
      <Text style={ styles.AccountText }>Account</Text>

      {/* Change Password Button */}
      <View style={ styles.button }>
        <Image source={require('../../assets/circle_light.png')} style={ styles.circleLight }/>
        <Image source={require('../../assets/lock.png')} style={ styles.icons }/>

        <TouchableOpacity onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleChangePassword}>
          <Image source={require('../../assets/right_arrow.png')} style={ styles.rightArrowIcons }/>
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <View style={styles.logOutButton}>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container:{
    flex: 1, 
    backgroundColor: '#FFFFFA'
  },
  turquoiseHeaderContainer:{
    height: 80, 
    backgroundColor: '#0ABAB5', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  arrowLeft:{
    position: 'absolute', 
    left: 15, 
    top:'40%'
  },
  headerText: {
    fontFamily: 'ZenOldMincho-Regular', 
    fontSize: 32, 
    color: '#FFFFFF',
    bottom:'200%'
  },
  ovalBar: {
    bottom: '50%'
  },
  button: {
    flexDirection: 'row',
    height:60,
    marginTop:'5%',
    marginHorizontal: '14%',
    paddingLeft:15,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.75,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'ZenOldMincho-Bold',
    paddingTop:'2%'
  },
  logOutButton: {
    alignItems: 'center',
  },
  logOutText: {
    color: 'lightgray',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16, 
    fontWeight: 'bold', 
    borderBottomColor: 'lightgray', 
    borderBottomWidth: 1, 
  },
  chatbotText: {
    fontSize: 12,
    
    color:'#0ABAB5',
    marginTop:7
  },
  circleLight: {
    width: 34, 
    height: 34,
    marginRight:"6.9%"
  },
  profileDeluxe: {
    width: 35, 
    height: 35, 
    marginRight:"6.9%"
  },
  icons: {
    width: 9.69, 
    height: 9.69,
    position:'absolute',
    marginTop:'6.69%',
    marginLeft:'6.69%'
  },
  rightArrowIcons: {
    width: 9.69, 
    height: 9.69, 
    marginLeft:'50%',
    marginTop:'8%'
  },
  AccountText: {
    marginTop:'3%', 
    marginLeft:'15%', 
    fontFamily: 'ZenOldMincho-Bold',
    fontWeight:'bold'
  }
};
