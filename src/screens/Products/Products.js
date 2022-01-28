import { useEffect, useState } from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

//Import vector icons.
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import firebase from "../../database/config";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Products(props) {
  //Init const state.
  const [nameSearch, setNameSearch] = useState('')
  const [products, setProducts] = useState([])

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const productCol = collection(doc(firebase, 'users', props.extraData.id), 'products')

  //Get all workflows
  useEffect(() => {
    const adminsSubscribe = onSnapshot(query(productCol, orderBy('code')), productsDocs => {
      setProducts(productsDocs.docs.map(product => product))
    })
    return () => adminsSubscribe()
  }, [])

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.productsList}>
          {products.map((product, index) => {
            return <View key={index}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.productBox, mainTheme.Color]}
              >
                <Text style={[styles.productCode, mainTheme.TextColorLight]}>
                  {product.data().code}
                </Text>
                <Text style={[styles.productName, mainTheme.TextColorLight]}>
                  {product.data().name}
                </Text>
                <Text style={[styles.productPrice, mainTheme.TextColorLight]}>
                  {product.data().price}
                </Text>
                <TouchableOpacity>
                  <FontAwesome5
                    name="edit"
                    color={mainTheme.TextColorLight.color}
                    size={20}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          })}
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.search}
          placeholder='Search products'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => onSearch(text)}
          value={nameSearch}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.addFlowBtn, mainTheme.Color]}
          onPress={() => addFlowPress()}
        >
          <MaterialIcons
            name='add-to-photos'
            size={32}
            color={mainTheme.TextColorLight.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}