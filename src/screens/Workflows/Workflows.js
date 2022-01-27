import { useEffect, useState } from "react";

//Import component.
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";

//Import firebase and config DB.
import firebase from '../../database/config'
import { collection, doc, getDocs, query, addDoc, onSnapshot, orderBy } from 'firebase/firestore'

//Import vector icons.
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'

export default function Workflows(props) {
  //Init const state.
  const [flowsRef, setFlowRef] = useState([])
  const [flows, setFlows] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [viewFlow, setViewFlow] = useState([])
  const [modalAddWf, setModalAddSeq] = useState(false)
  const [newWf, setNewWf] = useState('')

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const workFlowCol = collection(doc(firebase, 'users', props.extraData.id), 'workflows')

  //Get all workflows
  useEffect(() => {
    const adminsSubscribe = onSnapshot(query(workFlowCol, orderBy('createdDate')), data => {
      let i = 1
      let wfRef = []
      data.forEach(wf => {
        let wfData = wf.data()
        wfData.id = wf.id
        getDocs(query(collection(wf.ref, 'sequences'), orderBy('number'))).then(seqs => {
          wfData.sequence = seqs.docs.map(seq => seq.data())
          wfRef.push(wfData)
          if (i == data.docs.length) {
            setFlowRef(wfRef.map(item => item))
            setFlows(wfRef.map(item => item))
          }
          i++
        })
      })
    })
    return () => adminsSubscribe()
  }, [])

  //On search flows
  const onSearch = (text) => {
    setNameSearch(text)
    let flowsFilter = []
    flowsRef.forEach(item => {
      if (item.name.toLowerCase().includes(text.toLowerCase())) {
        flowsFilter.push(item)
      }
    })
    setFlows(flowsFilter)
  }

  //See sequence of workflow
  const onPressWorkflow = (index) => {
    let viewFlowRef = viewFlow
    viewFlowRef[index] = !viewFlowRef[index]
    setViewFlow(viewFlowRef.map(item => item))
  }

  //On view workflows
  const viewWorkflow = (wf) => {
    props.navigation.navigate('WorkflowViewScreen', { workflow: wf, wfId: wf.id })
  }

  const onPressAddWf = () => {
    setModalAddSeq(true)
  }

  const addWorkflow = () => {
    if (newWf && newWf.match(/^ *$/) == null) {
      addDoc(workFlowCol, { name: newWf, createdDate: new Date(), updatedDate: new Date() }).then(() => {
        setModalAddSeq(false)
        setNewWf('')
      })
    }
  }

  const closeModalAddWf = () => {
    setModalAddSeq(false)
    setNewWf('')
  }

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.flowsList}>
          {flows.map((wf, index) => {
            return <View key={index}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.flowBox, mainTheme.Color]}
                onPress={() => onPressWorkflow(index)}
              >
                <Text style={[styles.flowName, mainTheme.TextColorLight]}>
                  {wf.name}
                </Text>
                <TouchableOpacity onPress={() => viewWorkflow(wf)}>
                  <FontAwesome5
                    name="edit"
                    color={mainTheme.TextColorLight.color}
                    size={20}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              {viewFlow[index] ? wf.sequence.map((sequence, i) => {
                return <TouchableOpacity
                  key={i}
                  activeOpacity={0.6}
                >
                  <View style={[styles.sequenceBox, mainTheme.ColorLight, mainTheme.BorderLight]}>
                    <Text style={[styles.sequenceText, mainTheme.TextColorGrey]}>{sequence.work}</Text>
                  </View>
                </TouchableOpacity>
              }) : <></>}
            </View>
          })}
        </View>
      </ScrollView>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalAddWf}
        onRequestClose={() => closeModalAddWf()}
        propagateSwipe={true}
      >
        <TouchableOpacity
          style={{ height: '100%' }}
          onPressOut={() => closeModalAddWf()}
          activeOpacity={1}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback>
            <View style={[styles.modalAddContent, mainTheme.ColorLight]}>
              <Text style={[styles.addAdminTitle, mainTheme.TextColorGrey]}>
                New workflow
              </Text>
              <TouchableOpacity
                style={styles.btnCloseModal}
                onPress={() => closeModalAddWf()}
              >
                <MaterialCommunityIcons
                  name="close-box"
                  size={30}
                  color={mainTheme.Border2.borderColor}
                />
              </TouchableOpacity>
              <ScrollView>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  placeholder="Workflow"
                  value={newWf}
                  color={mainTheme.TextColor.Color}
                  onChangeText={text => setNewWf(text)}
                  onSubmitEditing={() => addWorkflow()}
                />
                <TouchableOpacity
                  style={[styles.buttonAdd, mainTheme.Color]}
                  onPress={() => addWorkflow()}>
                  <Foundation
                    name="plus"
                    size={25}
                    color={mainTheme.TextColorLight.color}
                  />
                  <Text style={styles.buttonAddTitle}>
                    Add
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.search}
          placeholder='Search workflows'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => onSearch(text)}
          value={nameSearch}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.addFlowBtn, mainTheme.Color]}
          onPress={() => onPressAddWf()}
        >
          <MaterialIcons
            name='playlist-add'
            size={32}
            color={mainTheme.TextColorLight.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}