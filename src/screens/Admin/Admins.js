import { useEffect, useState } from "react";

//Import component.
import styles from "./styles";
import { View, Text, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput } from "react-native";

//Import firebase and config DB.
import firebase from '../../database/config'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDocs, query, addDoc, where, onSnapshot, orderBy, getDoc } from 'firebase/firestore'

//Import vector icons.
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Admins(props) {
  //Init const state.
  const [adminsRef, setAdminsRef] = useState([])
  const [admins, setAdmins] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [modalAdd, setModalAdd] = useState(false)
  const [ref, setRef] = useState('')

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const auth = getAuth()

  //Get all admins
  useEffect(() => {
    const adminsSubscribe = onSnapshot(query(collection(doc(firebase, 'users', props.extraData.id), 'admins'), orderBy('createdDate')), data => {
      let i = 1
      let adminsBuffer = []
      data.forEach(admin => {
        getDoc(admin.data().user).then(user => {
          adminsBuffer.push(user.data())
          if (i == data.docs.length) {
            setAdmins(adminsBuffer)
            setAdminsRef(adminsBuffer)
          }
          i++
        })
      })
    })
    return () => adminsSubscribe()
  }, [])

  //On search admins
  const onSearch = (text) => {
    setNameSearch(text)
    let adminsFilter = []
    adminsRef.forEach(item => {
      if (item.username.toLowerCase().includes(text.toLowerCase())) {
        adminsFilter.push(item)
      }
    })
    setAdmins(adminsFilter)
  }

  //On press add admin.
  const addAdminPress = () => {
    setModalAdd(true)
  }

  //On close modal.
  const closeModalAdd = () => {
    setModalAdd(false)
    setRef('')
  }

  //Add admin
  const addAdmin = () => {
    getDocs(query(collection(firebase, 'users'), where('ref', '==', ref))).then(data => {
      if (data.docs.length > 0) {
        data.forEach(user => {
          addDoc(collection(doc(firebase, 'users', props.extraData.id), 'admins'), {
            user: doc(firebase, 'users', user.data().id),
            createdDate: new Date(),
            updatedDate: new Date()
          }).then(() => {
            setModalAdd(false)
            setRef('')
            console.log('success');
          })
        })
      } else {
        Alert.alert("Can't find user.")
      }
    })
  }

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.adminsList}>
          {admins.map((item, index) => {
            return <TouchableOpacity
              key={index}
              style={[styles.adminBox, mainTheme.Color]}
            >
              <Text style={[styles.adminTitle, mainTheme.TextColorLight]}>
                <Text style={styles.adminUsername}>{item.username + '  '}</Text><View style={styles.adminRef}><Text>{'#' + item.ref}</Text></View>
              </Text>
              <Text style={[styles.adminFlows, mainTheme.TextColorLight]}>
                Workflows: All
              </Text>
              <Text style={[styles.adminFlows, mainTheme.TextColorLight]}>
                Products: All
              </Text>
            </TouchableOpacity>
          })}
        </View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalAdd}
          onRequestClose={() => closeModalAdd()}
        >
          <TouchableOpacity
            style={{ height: '100%' }}
            onPressOut={() => closeModalAdd()}
            activeOpacity={1}
            style={styles.modalContainer}
          >
            <TouchableWithoutFeedback>
                <View style={[styles.modalAddContent, mainTheme.BGColor, mainTheme.Border2]}>
                  <Text style={[styles.addAdminTitle, mainTheme.TextColorGrey]}>
                    Add admin
                  </Text>
                  <TouchableOpacity
                    style={styles.btnCloseModal}
                    onPress={() => closeModalAdd()}
                  >
                    <MaterialCommunityIcons
                      name="close-box"
                      size={30}
                      color={mainTheme.Border2.borderColor}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    placeholder='Ref'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setRef(text)}
                    value={ref}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={[styles.buttonAdd, mainTheme.Color]}
                    onPress={() => addAdmin()}>
                    <Foundation
                      name="plus"
                      size={25}
                      color={mainTheme.TextColorLight.color}
                    />
                    <Text style={styles.buttonAddTitle}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.search}
          placeholder='Search admins'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => onSearch(text)}
          value={nameSearch}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.addAdminBtn, mainTheme.Color]}
          onPress={() => addAdminPress()}
        >
          <FontAwesome
            name='user-plus'
            size={25}
            color={mainTheme.TextColorLight.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}