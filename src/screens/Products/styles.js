import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingVertical: 10
  },
  bottomBar: {
    zIndex: 1000,
    position: 'absolute',
    bottom: 4,
    height: 50,
    width: '100%'
  },
  search: {
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  addProductBtn: {
    zIndex: 1000,
    position: 'absolute',
    bottom: 0,
    right: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  productsList: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  productBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginTop: 5,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  productCode: {
    flex: 2,
    fontSize: 16
  },
  productName: {
    flex: 7,
    fontSize: 16
  },
  productPrice: {
    flex: 3,
    fontSize: 16,
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
    width: '90%',
    borderRadius: 5,
    paddingTop: 30,
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
  addProductLabel: {
    marginTop: 10,
    marginLeft: 30,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    marginVertical: 8,
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginHorizontal: 30,
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
  inputArea: {
    marginVertical: 8,
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
  selectWf: {
    marginHorizontal: 30,
    marginVertical: 10
  },
  selectWfLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4
  },
  wfBox: {
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
  wfLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
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
  }
})