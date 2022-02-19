import { useEffect, useState } from "react";

import styles from "./styles-products";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";

import firebase from '../../database/config'
import { collection, doc, documentId, getDocs, orderBy, query, where } from "firebase/firestore";

export default function EditProducts(props) {
  //Init const state.
  const [nameSearch, setNameSearch] = useState('')
  const [products, setProducts] = useState([])

  const [unassigned, setUnassigned] = useState([])
  const [assigned, setAssigned] = useState([])
  const [newUnassigned, setNewUnassigned] = useState([])
  const [newAssigned, setNewAssigned] = useState([])
  const [indexAssigned, setIndexAssigned] = useState([])
  const [indexUnassigned, setIndexUnassigned] = useState([])

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const window = useWindowDimensions()

  const userDoc = doc(firebase, 'users', props.extraData.id)
  const productCol = collection(userDoc, 'products')

  useEffect(() => {
    setAssigned(props.route.params.products)
    getDocs(query(productCol, orderBy('code'))).then(productList => {
      setProducts(productList.docs.map(item => item))
    })
    getDocs(query(productCol, where(documentId(), 'not-in', props.route.params.products.map(item => item.id)))).then(productList => {
      setUnassigned(productList.docs.map(item => item))
    })
  }, [])

  const filterProducts = (item, text) => {
    return item.data().name.toLowerCase().includes(text.toLowerCase()) || item.data().code.toLowerCase().includes(text.toLowerCase())
  }

  const assignProduct = (product, index) => {
    setNewAssigned(newAssigned.concat([product]))
    setIndexAssigned(indexAssigned.concat([index]))
  }

  const unassignProduct = (product, index) => {
    setNewUnassigned(newUnassigned.concat([product]))
    setIndexUnassigned(indexUnassigned.concat([index]))
  }

  const assignProductFromNew = (product, index) => {
    setNewUnassigned(newUnassigned.splice(index, 1).length > 0 ? newUnassigned.splice(index, 1) : [])
    setIndexUnassigned(indexUnassigned.splice(index, 1).length > 0 ? indexUnassigned.splice(index, 1) : [])
  }

  const unassignProductFromNew = (product, index) => {
    setNewAssigned(newAssigned.splice(index, 1).length > 0 ? newAssigned.splice(index, 1) : [])
    setIndexAssigned(indexAssigned.splice(index, 1).length > 0 ? indexAssigned.splice(index, 1) : [])
  }

  return (
    <SafeAreaView style={[styles.container, mainTheme.BGColor]}>
      <View style={[styles.productsContainer, window.height < window.width ? styles.landscape : {}]}>
        <View style={[styles.ProductList, window.height < window.width ? styles.ProductListLandscape : {}]}>
          <Text style={[styles.tabLabel]}>Assigned</Text>
          <ScrollView>
            {assigned.map((product, index) => {
              return <TouchableOpacity
                style={[styles.productBox, mainTheme.ColorProduct, filterProducts(product, nameSearch) && !indexUnassigned.includes(index) ? {} : {display: "none"}]}
                key={index}
                onPress={() => unassignProduct(product, index)}
              >
                <Text style={[styles.flex1, mainTheme.TextColorLight]}>{product.data().code}</Text>
                <Text style={[styles.flex4, mainTheme.TextColorLight]}>{product.data().name}</Text>
              </TouchableOpacity>
            })}
            {newAssigned.map((product, index) => {
              return <TouchableOpacity
                style={[styles.productBox, mainTheme.ColorProduct, filterProducts(product, nameSearch) ? {} : {display: "none"}]}
                key={index}
                onPress={() => unassignProductFromNew(product, index)}
              >
                <Text style={[styles.flex1, mainTheme.TextColorLight]}>{product.data().code}</Text>
                <Text style={[styles.flex4, mainTheme.TextColorLight]}>{product.data().name}</Text>
              </TouchableOpacity>
            })}
          </ScrollView>
        </View>
        <View style={[styles.ProductList, window.height < window.width ? styles.ProductListLandscape : {}]}>
          <Text style={[styles.tabLabel]}>Unassigned</Text>
          <ScrollView>
            {unassigned.map((product, index) => {
              return <TouchableOpacity
                style={[styles.productBox, mainTheme.colorInActive, filterProducts(product, nameSearch) && !indexAssigned.includes(index) ? {} : {display: "none"}]}
                key={index}
                onPress={() => assignProduct(product, index)}
              >
                <Text style={[styles.flex1, mainTheme.TextColorLight]}>{product.data().code}</Text>
                <Text style={[styles.flex4, mainTheme.TextColorLight]}>{product.data().name}</Text>
              </TouchableOpacity>
            })}
            {newUnassigned.map((product, index) => {
              return <TouchableOpacity
                style={[styles.productBox, mainTheme.colorInActive, filterProducts(product, nameSearch) ? {} : {display: "none"}]}
                key={index}
                onPress={() => assignProductFromNew(product, index)}
              >
                <Text style={[styles.flex1, mainTheme.TextColorLight]}>{product.data().code}</Text>
                <Text style={[styles.flex4, mainTheme.TextColorLight]}>{product.data().name}</Text>
              </TouchableOpacity>
            })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <TextInput
          style={[styles.search, mainTheme.BorderProduct2]}
          placeholder='Search products'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setNameSearch(text)}
          value={nameSearch}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
    </SafeAreaView>
  )
}