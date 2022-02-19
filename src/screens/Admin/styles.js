import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingVertical: 10
  },
  adminsList: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  adminBox: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  adminTitle: {
    textShadowColor: '#444',
    textShadowRadius: 4,
    textShadowOffset: {
      width: 1,
      height: 1
    }
  },
  adminUsername: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  adminRef: {
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  adminFlows: {
    marginTop: 7,
    fontSize: 14
  },
  productList: {
    marginLeft: 20,
  },
  productName: {
    
  },
  modalAddContent: {
    position: 'absolute',
    width: 300,
    borderRadius: 5,
    paddingTop: 2,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor: '#0009'
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
  addAdminBtn: {
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
  flex1: {
    flex: 1
  },
  input: {
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
    fontWeight: 'bold',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  buttonAdd: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 48,
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
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 5
  },
})