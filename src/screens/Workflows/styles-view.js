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
    left: 0,
    right: 40,
    paddingRight: 16,
    paddingTop: 20,
    alignItems: 'flex-end',
    height: 60
  },
  deleteWf: {
    position: 'absolute',
    left: 0,
    right: 2,
    paddingRight: 14,
    paddingTop: 20,
    alignItems: 'flex-end',
    height: 60
  },
  sequenceBox: {
    padding: 10,
    paddingRight: 40,
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
    fontWeight: 'bold',
    marginBottom: 2
  },
  SequenceDetails: {
    padding: 5,
    borderRadius: 6
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
    flexDirection: 'row'
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
  }
})