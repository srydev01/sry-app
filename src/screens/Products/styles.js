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
  addFlowBtn: {
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
})