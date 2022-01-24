import React, { useState } from 'react'

//Import component.
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'

//Import firebase and config DB.
import firebase from '../../database/config'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, query, doc, setDoc, getDocs, getDoc } from 'firebase/firestore'

export default function RegistrationScreen(props) {
  //Init const state.
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const auth = getAuth()

  //On press Log in.
  const onFooterLinkPress = () => {
    props.navigation.navigate('Login')
  }

  //On press Create account.
  const onRegisterPress = () => {
    //Check matching between password and confirm password.
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    getUniqueNumber().then(ref => {
      createUserWithEmailAndPassword(auth, email, password).then(res => {
        const uid = res.user.uid
        const data = {
          id: uid,
          username: username,
          ref: ref,
          email: email,
          type: 'Admin'
        }
        //Add to Users collection.
        setDoc(doc(firebase, 'users', uid), data).then(() => {
          getDoc(doc(firebase, 'users', uid)).then(data => {
            console.log(data.data().username + ' logged in.');
            props.navigation.navigate('Home', { user: data.data() })
          })
        })
      })
    })
  }

  //Get unique number (Only type is "Admin").
  const getUniqueNumber = () => {
    return new Promise((resolve, reject) => {
      let number, numberRef = []
      getDocs(query(collection(firebase, 'users'))).then(data => {
        data.forEach(item => {
          numberRef.push(item.data().refNo)
        })
        let find = true
        while (find) {
          number = Math.round((Math.random() * 10000000)).toString(36)
          if (!numberRef.includes(number)) {
            find = false
          }
        }
        resolve(number)
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
          placeholder='Full Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
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
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, mainTheme.Color]}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>
            Create account
          </Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={[styles.footerText, mainTheme.TextColorGrey]}>
            Already got an account? <Text
              onPress={onFooterLinkPress}
              style={[styles.footerLink, { color: mainTheme.Color.backgroundColor }]}
            >
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}