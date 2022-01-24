import { useEffect, useRef, useState } from "react"

import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from "./styles-view"

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore"
import firebase from "../../database/config"

export default function WorkflowView(props) {
  const [wf, setWf] = useState(null)
  const [editWfName, setEditWfName] = useState(false)
  const [viewSequence, setViewSequence] = useState([])
  const [wfName, setWfName] = useState('')
  const [sequences, setSequences] = useState([])
  const [addSeq, setAddseq] = useState(false)
  const [newSeq, setNewSeq] = useState('')

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  const wfNameRef = useRef()
  const newSeqRef = useRef()

  const workflowDoc = doc(doc(firebase, 'users', props.extraData.id), 'workflows', props.route.params.workflow.id)

  useEffect(() => {
    const workflowSubscribe = onSnapshot(workflowDoc, wfData => {
      if (wfData.data()) {
        setWf(wfData)
        setWfName(wfData.data().name)
        getDocs(query(collection(wfData.ref, 'sequences'), orderBy('number'))).then(seqs => {
          let i = 1
          let seqsRef = []
          seqs.forEach(seq => {
            let seqData = seq.data()
            getDocs(query(collection(seq.ref, 'admins'))).then(adminsList => {
              seqData.admins = adminsList.docs.map(admin => admin.data())
              seqsRef.push(seqData)
              if (i == seqs.docs.length) {
                setSequences(seqsRef.map(item => item))
              }
              i++
            })
          })
        })
      } else {
        props.navigation.navigate('WorkflowsScreen')
      }
    })
    return () => workflowSubscribe()
  }, [])

  const onPressEditWfName = () => {
    setEditWfName(true)
    wfNameRef.current.focus()
  }

  const onChangeWfName = () => {
    if (wfName != wf.data().name) {
      updateDoc(wf.ref, { name: wfName, updatedDate: new Date() }).then(() => {
        setEditWfName(false)
      })
    } else {
      setEditWfName(false)
    }
  }

  const onPressViewSequence = (index) => {
    let viewSequenceRef = viewSequence
    viewSequenceRef[index] = !viewSequenceRef[index]
    setViewSequence(viewSequenceRef.map(item => item))
  }

  const removeSequence = (index) => {
    let sequencesRef = sequences
    delete sequencesRef[index]
    setSequences(sequencesRef.map(data => data))
  }

  const onPressAddSeq = () => {
    setAddseq(true)
  }

  const addSequence = () => {
    if (newSeq) {
      addDoc(collection(wf.ref, 'sequences'), { work: newSeq, number: sequences.length + 1, createdDate: new Date(), updatedDate: new Date() }).then(() => {
        updateDoc(wf.ref, { updatedDate: new Date() }).then(() => {
          setAddseq(false)
          setNewSeq('')
        })
      })
    }
  }

  const cancelAddSeq = () => {
    setAddseq(false)
    setNewSeq('')
  }

  const deleteWf = () => {
    deleteDoc(wf.ref)
  }

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <ScrollView style={{ width: '100%' }}>
        <View style={[styles.wfNameBox, editWfName ? { backgroundColor: '#fff' } : mainTheme.Color]}>
          <TextInput
            ref={wfNameRef}
            style={[styles.inputWfName, editWfName ? mainTheme.TextColor : mainTheme.TextColorLight]}
            placeholderTextColor="#aaaaaa"
            value={wfName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={setWfName}
            onBlur={() => onChangeWfName()}
          />
          <TouchableOpacity
            style={[styles.editWfName, editWfName ? styles.onEdit : {}]}
            activeOpacity={1}
          >
            <FontAwesome5
              name="edit"
              color={mainTheme.TextColorLight.color}
              size={20}
              onPress={() => onPressEditWfName()}
            />
          </TouchableOpacity>
          <View
            style={[styles.deleteWf]}
          >
            <FontAwesome5
              name='trash-alt'
              size={20}
              color={mainTheme.TextColorLight.color}
              onPress={() => deleteWf()}
            />
          </View>
        </View>
        {sequences.map((sequence, index) => {
          return <TouchableOpacity
            key={index}
            style={[styles.sequenceBox, mainTheme.ColorLight]}
            onPress={() => onPressViewSequence(index)}
            activeOpacity={0.4}
          >
            <Text style={[styles.sequenceText, mainTheme.TextColor]}>{sequence.work}</Text>
            <TouchableOpacity style={styles.btnEditSequence}>
              <FontAwesome5
                name="edit"
                color={mainTheme.TextColor.color}
                size={20}
              />
            </TouchableOpacity>
            {viewSequence[index]
              ?
              <View style={[styles.SequenceDetails]}>
                <Text style={[mainTheme.TextColor, styles.sequenceSubTitle]}>Status Success: <Text style={styles.statusText}>
                  {sequence.statusSuccess}</Text>
                </Text>
                <Text style={styles.sequenceSubTitle}>Admins</Text>
                <View style={styles.adminsBox}>
                  {sequence.admins.map((admin, i) => {
                    return <View style={[styles.adminName]} key={i}>
                      <Text style={mainTheme.TextColor}>
                        {admin.name}
                      </Text>
                    </View>
                  })}
                </View>
              </View>
              :
              <></>}
          </TouchableOpacity>
        })}
        {addSeq
          ?
          <View
            style={[styles.sequenceBox, mainTheme.BGColor, mainTheme.BorderLight]}
          >
            <TextInput
              style={[styles.sequenceText, mainTheme.TextColor]}
              value={newSeq}
              onChangeText={text => setNewSeq(text)}
            />
            <TouchableOpacity
              style={styles.btnSaveSequence}
              onPress={() => addSequence()}
            >
              <FontAwesome
                name="check"
                color={mainTheme.TextColor.color}
                size={24}
                color='green'
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCancelSequence}
              onPress={() => cancelAddSeq()}
            >
              <FontAwesome
                name="close"
                color={mainTheme.TextColor.color}
                size={24}
                color='#a00'
              />
            </TouchableOpacity>
          </View>
          :
          <></>}
        <TouchableOpacity style={[styles.btnAddSequence, mainTheme.Color, addSeq ? { display: 'none' } : {}]}>
          <FontAwesome5
            name="plus"
            size={26}
            color={mainTheme.ColorLight.backgroundColor}
            onPress={() => onPressAddSeq()}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}