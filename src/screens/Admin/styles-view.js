import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingVertical: 10
  },
  adminNameBox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 40,
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
  adminName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  adminRef: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  productsBox: {
    width: '90%',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  productsHead: {
    flexDirection: 'row'
  },
  productsLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productList: {
    padding: 10,
    maxWidth: 300,
  },
  product: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row'
  },
  flex1: {
    flex: 1
  },
  flex3: {
    flex: 3
  }
})