import React, { useEffect, useState } from "react";

//Import component.
import styles from "./styles";
import { View, Text, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput, SafeAreaView, RefreshControl } from "react-native";

//Import firebase and config DB.
import firebase from '../../database/config'
import { collection, doc, getDocs, query, addDoc, where, onSnapshot, orderBy, documentId } from 'firebase/firestore'

//Import vector icons.
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Admins(props) {
  //Init const state.
  const [refreshing, setRefreshing] = useState(false)
  const [adminsRef, setAdminsRef] = useState([])
  const [admins, setAdmins] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [modalAdd, setModalAdd] = useState(false)
  const [ref, setRef] = useState('')

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const userDoc = doc(firebase, 'users', props.extraData.id)
  const adminCol = collection(userDoc, 'admins')
  const userCol = collection(firebase, 'users')

  const callbackAdmins = (admins) => {
    getDocs(query(userCol, where(documentId(), 'in', admins.docs.map(item => item.data().user.id)))).then(admins => {
      setAdmins(admins.docs.map(adm => adm))
      setAdminsRef(admins.docs.map(adm => adm))
      setRefreshing(false)
    })
  }

  //Get all admins
  useEffect(() => {
    const adminsSubscribe = onSnapshot(query(adminCol, orderBy('createdDate')), admins => callbackAdmins(admins))
    return () => adminsSubscribe()
  }, [])

  const onRefresh = () => {
    getDocs(query(adminCol, orderBy('createdDate'))).then(admins => callbackAdmins(admins))
  }

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

  const onPressAdmin = (admin) => {
    props.navigation.navigate('AdminViewScreen', { adminId: admin.id })
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
    <SafeAreaView style={[styles.container, mainTheme.BGColor]}>
      <ScrollView
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.adminsList}>
          {admins.map((admin, index) => {
            return <TouchableOpacity
              key={index}
              style={[styles.adminBox, mainTheme.ColorAdmin]}
              onPress={() => onPressAdmin(admin)}
            >
              <Text style={[styles.adminTitle, mainTheme.TextColorLight]}>
                <Text style={styles.adminUsername}>{admin.data().username + '  '}</Text><View style={styles.adminRef}><Text>{'#' + admin.data().ref}</Text></View>
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
              <View style={[styles.modalAddContent, mainTheme.ColorLight]}>
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
                  style={[styles.input, mainTheme.BorderAdmin2]}
                  placeholder='Ref'
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setRef(text)}
                  value={ref}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  color={mainTheme.TextColor.Color}
                />
                <TouchableOpacity
                  style={[styles.buttonAdd, mainTheme.ColorAdmin]}
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
          style={[styles.search, mainTheme.BorderAdmin2]}
          placeholder='Search admins'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => onSearch(text)}
          value={nameSearch}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.addAdminBtn, mainTheme.ColorAdmin]}
          onPress={() => addAdminPress()}
        >
          <FontAwesome
            name='user-plus'
            size={25}
            color={mainTheme.TextColorLight.color}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}