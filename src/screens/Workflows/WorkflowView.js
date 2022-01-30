import { useEffect, useRef, useState } from "react"

import { Modal, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import styles from "./styles-view"

//Import firebase and config DB.
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"
import firebase from "../../database/config"

//Import vector icons.
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function WorkflowView(props) {
  const [wf, setWf] = useState(null)
  const [editWfName, setEditWfName] = useState(false)
  const [viewSequence, setViewSequence] = useState([])
  const [wfName, setWfName] = useState('')
  const [sequences, setSequences] = useState([])
  const [adminsExisting, setAdminsExisting] = useState([])
  const [addSeq, setAddseq] = useState(false)
  const [newSeq, setNewSeq] = useState('')
  const [modalEditSeq, setModalEditSeq] = useState(false)
  const [seqNameEdit, setSeqNameEdit] = useState('')
  const [seqStatusEdit, setSeqStatusEdit] = useState('')
  const [adminsNotAssigned, setAdminsNotAssigned] = useState([])
  const [adminsAssigned, setAdminsAssigned] = useState([])
  const [sequenceRef, setSequenceRef] = useState(null)

  const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
  const [docDelete, setDocDelete] = useState(null)
  const [messageAlert, setMessageAlert] = useState('')

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
          if (seqs.docs.length > 0) {
            let i = 1
            let seqsRef = []
            seqs.forEach(seq => {
              let seqData = seq.data()
              seqData.ref = seq.ref
              getDocs(query(collection(seq.ref, 'admins'))).then(adminsList => {
                if (adminsList.docs.length > 0) {
                  let j = 1
                  let adminsBuffer = []
                  adminsList.forEach(admin => {
                    getDoc(admin.data().user).then(user => {
                      adminsBuffer.push(user)
                      if (j == adminsList.docs.length) {
                        seqData.admins = adminsBuffer
                        seqsRef[seq.data().number] = seqData
                        if (i == seqs.docs.length) {
                          setSequences(seqsRef.map(item => item))
                        }
                        i++
                      }
                      j++
                    })
                  })
                } else {
                  seqData.admins = adminsList.docs.map(admin => admin.data())
                  seqsRef[seq.data().number] = seqData
                  if (i == seqs.docs.length) {
                    setSequences(seqsRef.map(item => item))
                  }
                  i++
                }
              })
            })
          } else {
            setSequences([])
          }
        })
      } else {
        props.navigation.navigate('WorkflowsScreen')
      }
    })
    return () => workflowSubscribe()
  }, [])

  useEffect(() => {
    const adminsSubscribe = onSnapshot(query(collection(doc(firebase, 'users', props.extraData.id), 'admins')), admins => {
      let i = 1
      let adminsRef = []
      admins.forEach(admin => {
        getDoc(admin.data().user).then(adminData => {
          adminsRef.push(adminData)
          if (i == admins.docs.length) {
            setAdminsExisting(adminsRef.map(adm => adm))
          }
          i++
        })
      })
    })
    return () => adminsSubscribe()
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

  const onPressAddSeq = () => {
    setAddseq(true)
    setTimeout(() => {
      newSeqRef.current.focus()
    }, 0)
  }

  const addSequence = () => {
    if (newSeq) {
      addDoc(collection(wf.ref, 'sequences'), {
        work: newSeq,
        number: sequences.length + 1,
        createdDate: new Date(),
        updatedDate: new Date(),
        statusSuccess: ''
      }).then(() => {
        updateDoc(wf.ref, {
          updatedDate: new Date()
        }).then(() => {
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

  const onPressEditSeq = (sequence) => {
    setAdminsNotAssigned(adminsExisting.filter(exist => sequence.admins.findIndex(assigned => assigned.id == exist.id) < 0))
    setSequenceRef(sequence)
    setAdminsAssigned(sequence.admins.map(admin => admin))
    setSeqNameEdit(sequence.work)
    setSeqStatusEdit(sequence.statusSuccess)
    setModalEditSeq(true)
  }

  const assignAdmin = (admin) => {
    let adminsAssignedRef = adminsAssigned
    adminsAssignedRef.push(admin)
    setAdminsAssigned(adminsAssignedRef.map(adminData => adminData))

    let adminsNotAssignedRef = adminsNotAssigned.filter(adminData => adminData.id != admin.id)
    setAdminsNotAssigned(adminsNotAssignedRef.map(adminData => adminData))
  }

  const unAssignAdmin = (admin) => {
    let adminsNotAssignedRef = adminsNotAssigned
    adminsNotAssignedRef.push(admin)
    setAdminsAssigned(adminsNotAssignedRef.map(adminData => adminData))

    let adminsAssignedRef = adminsAssigned.filter(adminData => adminData.id != admin.id)
    setAdminsAssigned(adminsAssignedRef.map(adminData => adminData))
  }

  const saveEditSeq = () => {
    adminsAssigned.forEach(admin => {
      getDocs(query(collection(sequenceRef.ref, 'admins'), where('user', '==', admin.ref))).then(existing => {
        if (existing.docs.length == 0) {
          addDoc(collection(sequenceRef.ref, 'admins'), {
            user: admin.ref
          })
        }
      })
    })
    if (adminsNotAssigned.length > 0) {
      getDocs(query(collection(sequenceRef.ref, 'admins'), where('user', 'in', adminsNotAssigned.map(admin => admin.ref)))).then(admins => {
        admins.forEach(admin => {
          deleteDoc(admin.ref)
        })
      })
    }
    updateDoc(sequenceRef.ref, {
      work: seqNameEdit,
      statusSuccess: seqStatusEdit,
      updatedDate: new Date()
    }).then(() => {
      updateDoc(wf.ref, {
        updatedDate: new Date()
      }).then(() => {
        setModalEditSeq(false)
      })
    })
  }

  const cancelEditSeq = () => {
    setModalEditSeq(false)
  }

  const onPressDeleteWf = () => {
    setDocDelete(wf.ref)
    setMessageAlert({
      message: 'You want to delet workflow \n"' + wf.data().name + '" ?',
      type: 'workflow'
    })
    setModalConfirmDelete(true)
  }

  const onPressDeleteSeq = (sequence) => {
    setDocDelete(sequence.ref)
    setMessageAlert({
      message: 'You want to delet sequence \n"' + sequence.work + '" ?',
      type: 'sequence'
    })
    setModalConfirmDelete(true)
  }

  const confirmDelete = () => {
    deleteDoc(docDelete).then(() => {
      if (messageAlert.type == 'sequence') {
        updateDoc(wf.ref, { updatedDate: new Date() })
      }
      setDocDelete(null)
      setMessageAlert('')
      setModalConfirmDelete(false)
    })
  }

  const cancelDelete = () => {
    setDocDelete(null)
    setMessageAlert('')
    setModalConfirmDelete(false)
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
          <TouchableOpacity
            style={[styles.deleteWf]}
            onPress={() => onPressDeleteWf()}
          >
            <FontAwesome5
              name='trash-alt'
              size={20}
              color={mainTheme.TextColorLight.color}
            />
          </TouchableOpacity>
        </View>
        {sequences.map((sequence, index) => {
          return <TouchableOpacity
            key={index}
            style={[styles.sequenceBox, mainTheme.ColorLight]}
            onPress={() => onPressViewSequence(index)}
            activeOpacity={0.4}
          >
            <Text style={[styles.sequenceText, mainTheme.TextColor]}>{sequence.work}</Text>
            <TouchableOpacity
              style={styles.btnEditSequence}
              onPress={() => onPressEditSeq(sequence)}
            >
              <FontAwesome5
                name="edit"
                color={mainTheme.TextColor.color}
                size={20}
              />
            </TouchableOpacity>
            {viewSequence[index]
              ?
              <View style={[styles.SequenceDetails]}>
                <TouchableOpacity
                  style={[styles.deleteSeq]}
                  onPress={() => onPressDeleteSeq(sequence)}
                >
                  <FontAwesome5
                    name='trash-alt'
                    size={20}
                    color={mainTheme.ColorFail.backgroundColor}
                  />
                </TouchableOpacity>
                <Text style={[mainTheme.TextColor, styles.sequenceSubTitle]}>Status Success: <Text style={styles.statusText}>
                  {sequence.statusSuccess}</Text>
                </Text>
                <Text style={styles.sequenceSubTitle}>Admins</Text>
                <View style={styles.adminsBox}>
                  {sequence.admins.map((admin, i) => {
                    return <View style={[styles.adminName]} key={i}>
                      <Text style={mainTheme.TextColor}>
                        {admin.data().username}
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
              ref={newSeqRef}
              style={[styles.sequenceText, mainTheme.TextColor]}
              value={newSeq}
              onChangeText={text => setNewSeq(text)}
              onSubmitEditing={() => addSequence()}
            />
            <TouchableOpacity
              style={styles.btnSaveSequence}
              onPress={() => addSequence()}
            >
              <FontAwesome
                name="check"
                size={24}
                color={mainTheme.ColorSuccess.backgroundColor}
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
                color={mainTheme.ColorFail.backgroundColor}
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
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalEditSeq}
        onRequestClose={() => cancelEditSeq()}
        propagateSwipe={true}
      >
        <View
          style={styles.modalContainer}
        >
          <View style={[styles.modalAddContent, mainTheme.ColorLight]}>
            <ScrollView>
              <Text style={[styles.editLabel, mainTheme.TextColor]}>Sequence</Text>
              <TextInput
                style={styles.inputNameSeq}
                color={mainTheme.TextColor.Color}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={seqNameEdit}
                onChangeText={text => setSeqNameEdit(text)}
              />
              <Text style={[styles.editLabel, mainTheme.TextColor]}>Status Success</Text>
              <TextInput
                style={styles.inputStatusSeq}
                color={mainTheme.ColorSuccess.backgroundColor}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={seqStatusEdit}
                onChangeText={text => setSeqStatusEdit(text)}
              />
              <View style={styles.adminsEditLabel}>
                <Text style={[styles.editLabel, mainTheme.TextColor]}>Admins</Text>
              </View>
              <View style={styles.adminsEditBox}>
                <Text style={[styles.editLabel, mainTheme.TextColor]}>Assigned</Text>
                {adminsAssigned.map((admin, index) => {
                  return <TouchableOpacity
                    key={index}
                    activeOpacity={0.6}
                    style={[styles.adminEditName, mainTheme.ColorSuccess]}
                    onPress={() => unAssignAdmin(admin)}
                  >
                    <Text style={[styles.adminEditNameLabel, mainTheme.TextColorLight]}>
                      {admin.data().username}
                    </Text>
                  </TouchableOpacity>
                })}
                <Text style={[styles.editLabel, mainTheme.TextColor]}>Not assigned</Text>
                {adminsNotAssigned.map((admin, index) => {
                  return <TouchableOpacity
                    key={index}
                    activeOpacity={0.6}
                    style={[styles.adminEditName, mainTheme.colorInActive]}
                    onPress={() => assignAdmin(admin)}
                  >
                    <Text style={[styles.adminEditNameLabel, mainTheme.TextColorLight]}>
                      {admin.data().username}
                    </Text>
                  </TouchableOpacity>
                })}
              </View>
            </ScrollView>
            <View style={styles.modalGrpBtn}>
              <TouchableOpacity
                style={[styles.buttonSave, mainTheme.ColorSuccess]}
                onPress={() => saveEditSeq()}
              >
                <Text style={[styles.buttonAddTitle, mainTheme.TextColorLight]}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCancel, mainTheme.ColorLight, mainTheme.ColorLight]}
                onPress={() => cancelEditSeq()}
              >
                <Text style={[styles.buttonAddTitle, mainTheme.TextColor]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalConfirmDelete}
        onRequestClose={() => cancelDelete()}
        propagateSwipe={true}
      >
        <View
          style={styles.modalContainer}
        >
          <View style={[styles.modalConfirmDeletet, mainTheme.ColorLight, mainTheme.BorderLight2]}>
            <MaterialCommunityIcons
              name="delete-alert"
              size={30}
              color={mainTheme.ColorFail.backgroundColor}
            />
            <View style={styles.alertContent}>
              <Text style={styles.alertMessage}>{messageAlert.message}</Text>
            </View>
            <View style={styles.modalGrpBtn}>
              <TouchableOpacity
                style={[styles.buttonSave, mainTheme.ColorFail]}
                onPress={() => confirmDelete()}
              >
                <Text style={[styles.buttonAddTitle, mainTheme.TextColorLight]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCancel, mainTheme.ColorLight, mainTheme.ColorLight]}
                onPress={() => cancelDelete()}
              >
                <Text style={[styles.buttonAddTitle, mainTheme.TextColor]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}