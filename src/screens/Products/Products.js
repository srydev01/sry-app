import { useEffect, useRef, useState } from "react";

import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from "react-native";
import { RadioButton } from 'react-native-paper'
import styles from "./styles";

//Import vector icons.
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import firebase from "../../database/config";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

export default function Products(props) {
  //Init const state.
  const [nameSearch, setNameSearch] = useState('')
  const [productsRef, setProductsRef] = useState([])
  const [products, setProducts] = useState([])
  const [modalAddProduct, setModalAddProduct] = useState(false)
  const [workflows, setWorkflows] = useState([])

  //Add Product
  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDesc, setProductDesc] = useState('')
  const [checkedWf, setCheckedWf] = useState(null)

  //Edit Product
  const [onEdit, setOnEdit] = useState(false)
  const [productEdit, setProductEdit] = useState(null)

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const productCol = collection(doc(firebase, 'users', props.extraData.id), 'products')
  const workflowCol = collection(doc(firebase, 'users', props.extraData.id), 'workflows')

  //Use ref input field
  const productCodeRef = useRef()
  const productNameRef = useRef()
  const productPriceRef = useRef()
  const productDescRef = useRef()


  //Get all workflows
  useEffect(() => {
    const adminsSubscribe = onSnapshot(query(productCol, orderBy('code')), productsDocs => {
      setProducts(productsDocs.docs.map(product => product))
      setProductsRef(productsDocs.docs.map(product => product))
    })
    return () => adminsSubscribe()
  }, [])

  const onSearch = (text) => {
    setNameSearch(text)
    let productsFilter = []
    productsRef.forEach(item => {
      if (item.data().name.toLowerCase().includes(text.toLowerCase()) || item.data().code.toLowerCase().includes(text.toLowerCase())) {
        productsFilter.push(item)
      }
    })
    setProducts(productsFilter.map(item => item))
  }

  const onPressAddProduct = () => {
    setWorkflows([])
    getDocs(query(workflowCol, orderBy('createdDate'))).then(wfList => {
      setWorkflows(wfList.docs.map(item => item))
    })
    setModalAddProduct(true)
  }

  const addProduct = () => {
    addDoc(productCol, {
      code: productCode,
      name: productName,
      price: parseFloat(productPrice),
      description: productDesc,
      workflow: checkedWf.ref,
      createdDate: new Date(),
      updatedDate: new Date()
    }).then(() => {
      cancelAddProduct()
    })
  }

  const cancelAddProduct = () => {
    setModalAddProduct(false)
    setProductCode('')
    setProductName('')
    setProductPrice('')
    setProductDesc('')
    setCheckedWf(null)
    setOnEdit(false)
  }

  const onPressEditProduct = (product) => {
    setWorkflows([])
    getDocs(query(workflowCol, orderBy('createdDate'))).then(wfList => {
      setWorkflows(wfList.docs.map(item => item))
    })
    getDoc(product.data().workflow).then(wf => {
      setCheckedWf(wf)
    })
    setProductEdit(product)
    setOnEdit(true)
    setModalAddProduct(true)
    setProductCode(product.data().code)
    setProductName(product.data().name)
    setProductPrice(product.data().price.toString())
    setProductDesc(product.data().description)
  }

  const saveProduct = () => {
    updateDoc(productEdit.ref, {
      code: productCode,
      name: productName,
      price: parseFloat(productPrice),
      description: productDesc,
      workflow: checkedWf.ref,
      updatedDate: new Date()
    }).then(() => {
      cancelAddProduct()
    })
  }

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
                  {product.data().price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                <TouchableOpacity onPress={() => onPressEditProduct(product)}>
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
          onPress={() => onPressAddProduct()}
        >
          <MaterialIcons
            name='add-to-photos'
            size={32}
            color={mainTheme.TextColorLight.color}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalAddProduct}
        onRequestClose={() => cancelAddProduct()}
        propagateSwipe={true}
      >
        <View
          style={styles.modalContainer}
        >
          <View style={[styles.modalAddContent, mainTheme.ColorLight]}>
            <ScrollView>
              <TextInput
                ref={productCodeRef}
                style={styles.input}
                color={mainTheme.TextColor.Color}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Product Name"
                value={productName}
                onChangeText={text => setProductName(text)}
                onSubmitEditing={() => onEdit ? {} : productNameRef.current.focus()}
              />
              <TextInput
                ref={productNameRef}
                style={styles.input}
                color={mainTheme.TextColor.Color}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Product Code"
                value={productCode}
                onChangeText={text => setProductCode(text)}
                onSubmitEditing={() => onEdit ? {} : productPriceRef.current.focus()}
              />
              <TextInput
                ref={productPriceRef}
                style={styles.input}
                color={mainTheme.TextColor.Color}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                placeholder="Price"
                value={productPrice}
                onChangeText={text => setProductPrice(text)}
                onSubmitEditing={() => onEdit ? {} : productDescRef.current.focus()}
              />
              <TextInput
                ref={productDescRef}
                multiline={true}
                numberOfLines={4}
                style={styles.inputArea}
                color={mainTheme.TextColor.Color}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Description"
                value={productDesc}
                onChangeText={text => setProductDesc(text)}
              />
              <View style={styles.selectWf}>
                <Text style={styles.selectWfLabel}>Workflow</Text>
                {workflows.map((wf, index) => {
                  return <TouchableOpacity
                    key={index}
                    style={[styles.wfBox, checkedWf && checkedWf.id == wf.id ? mainTheme.ColorSuccess : mainTheme.colorInActive]}
                    onPress={() => setCheckedWf(wf)}
                  >
                    <Text style={[styles.wfLabel, mainTheme.TextColorLight]}>{wf.data().name}</Text>
                  </TouchableOpacity>
                })}
              </View>
            </ScrollView>
            <View style={styles.modalGrpBtn}>
              <TouchableOpacity
                style={[styles.buttonSave, mainTheme.ColorSuccess]}
                onPress={onEdit ? () => saveProduct() : () => addProduct()}
              >
                <Text style={[styles.buttonAddTitle, mainTheme.TextColorLight]}>
                  {onEdit ? 'Save' : 'Add'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCancel, mainTheme.ColorLight, mainTheme.ColorLight]}
                onPress={() => cancelAddProduct()}
              >
                <Text style={[styles.buttonAddTitle, mainTheme.TextColor]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}