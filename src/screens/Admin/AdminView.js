import React, { useEffect, useState } from "react";

//Import component.
import styles from "./styles-view";
import { View, Text, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput, SafeAreaView, RefreshControl } from "react-native";

//Import firebase and config DB.
import firebase from '../../database/config'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDocs, query, addDoc, where, onSnapshot, orderBy, getDoc, FieldPath, documentId } from 'firebase/firestore'

//Import vector icons.
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { EditProducts } from "..";

export default function AdminView(props) {
  const [refreshing, setRefreshing] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [adminName, setAdminName] = useState('')
  const [adminRef, setAdminRef] = useState('')
  const [products, setProducts] = useState([])

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const userDoc = doc(firebase, 'users', props.extraData.id)
  const adminCol = doc(firebase, 'users', props.route.params.adminId)
  const productAdminCol = collection(userDoc, 'product_admin')
  const productCol = collection(userDoc, 'products')

  const callbackAdmins = (adminData) => {
    setAdmin(adminData)
    setAdminName(adminData.data().username)
    setAdminRef(adminData.data().ref)
    getDocs(query(productAdminCol, where('admin', '==', adminData.ref))).then(product_adminsData => {
      if (product_adminsData.docs.length > 0) {
        getDocs(query(productCol, where(documentId(), 'in', product_adminsData.docs.map(item => item.data().product.id)))).then(productsData => {
          setProducts(productsData.docs.map(item => item).sort(sortProductsByCode))
          setRefreshing(false)
        })
      }
    })
  }

  useEffect(() => {
    getDoc(adminCol).then(adminData => callbackAdmins(adminData))
  }, [])

  const onRefresh = () => {
    getDoc(adminCol).then(adminData => callbackAdmins(adminData))
  }

  const sortProductsByCode = (a, b) => {
    if (a.data().code < b.data().code) {
      return -1;
    }
    if (a.data().code > b.data().code) {
      return 1;
    }
    return 0;
  }

  const onPressEditProducts = () => {
    props.navigation.navigate('EditProducts', {products: products})
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
        <View style={[styles.adminNameBox, mainTheme.ColorAdmin]}>
          <Text
            style={[styles.adminName, styles.flex1, mainTheme.TextColorLight]}
          >
            {adminName}
          </Text>
          <Text
            style={[styles.adminRef, mainTheme.TextColorLight]}
          >
            {'#' + adminRef}
          </Text>
        </View>
        <View style={[styles.productsBox, mainTheme.ColorLight, mainTheme.BorderProduct]}>
          <View style={styles.productsHead}>
            <Text style={[styles.productsLabel, mainTheme.TextColor, styles.flex3]}>Products</Text>
            <TouchableOpacity
              activeOpacity={0}
              onPress={() => onPressEditProducts()}
            >
              <FontAwesome5
                name="edit"
                color={mainTheme.ColorProduct.backgroundColor}
                size={26}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.productList]}>
            {products.map((product, index) => {
              return <View
                style={[styles.product, mainTheme.ColorProduct]}
                key={index}
              >
                <View style={styles.flex1}>
                  <Text style={[mainTheme.TextColorLight]}>{product.data().code}</Text>
                </View>
                <View style={styles.flex3}>
                  <Text style={[mainTheme.TextColorLight]}>{product.data().name}</Text>
                </View>
              </View>
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}