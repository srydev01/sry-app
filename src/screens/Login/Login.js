import React, { useState } from 'react'

//Import component.
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

//Import firebase and config DB.
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import firebase from '../../database/config';

export default function LoginScreen(props) {
  //Init const state.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const auth = getAuth()

  //On press Sign up.
  const onFooterLinkPress = () => {
    props.navigation.navigate('RegistrationScreen')
  }

  //On press Log in
  const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password).then(res => {
      const uid = res.user.uid
      getDoc(doc(firebase, 'users', uid)).then(data => {
        console.log(data.data().username + ' logged in.');
      })
    })
  }

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, mainTheme.Color]}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>
            Log in
          </Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={[styles.footerText, mainTheme.TextColorGrey]}>
            Don't have an account? <Text
              onPress={onFooterLinkPress}
              style={[styles.footerLink, { color: mainTheme.Color.backgroundColor }]}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}