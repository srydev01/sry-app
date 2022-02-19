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
  const [sequenceAdmin, setSequenceAdmin] = useState([])
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

  const userCol = doc(firebase, 'users', props.extraData.id)
  const workflowDoc = doc(userCol, 'workflows', props.route.params.workflow.id)

  useEffect(() => {
    const workflowSubscribe = onSnapshot(workflowDoc, wfData => {
      if (wfData.data()) {
        setWf(wfData)
        setWfName(wfData.data().name)
        getDocs(query(collection(wfData.ref, 'sequences'), orderBy('number'))).then(seqs => {
          setSequences(seqs.docs.map(seq => seq))
          getSeuenceAdmin(seqs)
        })
      }
      else {
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

  const getSeuenceAdmin = (seqs) => {
    let sequenceAdminRef = []
    getDocs(query(collection(userCol, 'sequence_admin'), where('sequence', 'in', seqs.docs.map(seq => seq.ref)))).then(seqAdmins => {
      seqAdmins.forEach(seqAdmin => {
        getDoc(seqAdmin.data().admin).then(admin => {
          sequenceAdminRef.push({
            seq: seqAdmin.data().sequence.id,
            admin: admin
          })
          setSequenceAdmin(sequenceAdminRef.map(admin => admin))
        })
      })
    })
  }

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

  const onPressEditSeq = (sequence, index) => {
    setAdminsNotAssigned(adminsExisting.filter(exist => sequenceAdmin.findIndex(assigned => assigned.admin.id == exist.id && assigned.seq == sequence.id) < 0))
    setSequenceRef(sequence)
    setAdminsAssigned(sequenceAdmin.filter(seqAdmin => seqAdmin.seq == sequence.id).map(seqAdmin => seqAdmin.admin))
    setSeqNameEdit(sequence.data().work)
    setSeqStatusEdit(sequence.data().statusSuccess)
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
      getDocs(query(collection(userCol, 'sequence_admin'), where('sequence', '==', sequenceRef.ref), where('admin', '==', admin.ref))).then(existing => {
        if (existing.docs.length == 0) {
          addDoc(collection(userCol, 'sequence_admin'), {
            admin: admin.ref,
            sequence: sequenceRef.ref
          })
        }
      })
    })
    if (adminsNotAssigned.length > 0) {
      getDocs(query(collection(userCol, 'sequence_admin'), where('sequence', '==', sequenceRef.ref), where('admin', 'in', adminsNotAssigned.map(notAsg => notAsg.ref)))).then(admins => {
        admins.forEach(admin => deleteDoc(admin.ref))
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
        <View style={[styles.wfNameBox, editWfName ? mainTheme.ColorLight : mainTheme.ColorWF]}>
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
            <Text style={[styles.sequenceText, mainTheme.TextColor]}>{sequence.data().work}</Text>
            <TouchableOpacity
              style={styles.btnEditSequence}
              onPress={() => onPressEditSeq(sequence, index)}
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
                  {sequence.data().statusSuccess}</Text>
                </Text>
                <Text style={styles.sequenceSubTitle}>Admins</Text>
                <View style={styles.adminsBox}>
                  {sequenceAdmin.filter(seqAdmin => seqAdmin.seq == sequence.id).map((admin, i) => {
                    return <View style={[styles.adminName]} key={i}>
                      <Text style={mainTheme.TextColor}>
                        {admin.admin.data().username}
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
                    style={[styles.adminEditName, mainTheme.ColorAdmin]}
                    onPress={() => unAssignAdmin(admin)}
                  >
                    <Text style={[styles.adminEditNameLabel, mainTheme.TextColorLight]}>
                      {admin.data().username}
                    </Text>
                  </TouchableOpacity>
                })}
                <Text style={[styles.editLabel, mainTheme.TextColor]}>Unassigned</Text>
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