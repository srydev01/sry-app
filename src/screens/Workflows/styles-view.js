import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingVertical: 10
  },
  wfNameBox: {
    height: 60,
    paddingHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inputWfName: {
    height: 60,
    fontSize: 22,
    fontWeight: 'bold',
    width: '100%'
  },
  onEdit: {
    zIndex: -1
  },
  editWfName: {
    position: 'absolute',
    right: 40,
    left: 0,
    paddingRight: 16,
    paddingTop: 20,
    alignItems: 'flex-end',
    height: 60
  },
  deleteWf: {
    position: 'absolute',
    right: 0,
    paddingRight: 14,
    paddingTop: 20,
    alignItems: 'flex-end',
    height: 60,
    width: 40
  },
  sequenceBox: {
    padding: 10,
    paddingRight: 0,
    margin: '4%',
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  sequenceText: {
    fontSize: 20,
    marginBottom: 2
  },
  SequenceDetails: {
    padding: 5,
    borderRadius: 6,
  },
  sequenceSubTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#000'
  },
  statusText: {
    color: 'green'
  },
  adminsBox: {
    marginLeft: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  adminName: {
    margin: 4,
    paddingHorizontal: 5,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff'
  },
  btnEditSequence: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
    right: 0,
    width: 50,
    height: 40
  },
  deleteSeq: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40
  },
  btnSaveSequence: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
    right: 40,
    width: 50,
    height: 40
  },
  btnCancelSequence: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
    right: 0,
    width: 50,
    height: 40
  },
  btnAddSequence: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#070',
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  deleteLabel: {
    color: '#fff',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor: '#0009'
  },
  modalAddContent: {
    maxHeight: '80%',
    marginHorizontal: '5%',
    width: '96%',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  addAdminTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 10
  },
  btnCloseModal: {
    position: 'absolute',
    right: -7,
    top: -8,
    padding: 5
  },
  editLabel: {
    marginTop: 16,
    marginLeft: 30,
    fontSize: 16,
    fontWeight: 'bold'
  },
  adminsEditLabel: {
    flexDirection: 'row'
  },
  adminsEditBtn: {
    alignSelf: 'flex-end',
    marginLeft: 10
  },
  inputNameSeq: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  inputStatusSeq: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  adminsEditBox: {
    marginLeft: '4%',
    marginRight: '10%'
  },
  adminEditName: {
    justifyContent: 'center',
    maxWidth: 300,
    height: 40,
    marginLeft: 30,
    marginVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  adminEditNameLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalGrpBtn: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonSave: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    width: 70,
    height: 36,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonCancel: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    width: 70,
    height: 36,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonAddTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 5
  },
  modalConfirmDeletet: {
    width: '76%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  alertContent: {
    paddingBottom: 8
  },
  alertMessage: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30
  }
})