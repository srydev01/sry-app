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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productsContainer: {
    alignSelf: 'center',
    width: '94%',
    height: '92%'
  },
  landscape: {
    flexDirection: 'row',
    height: '81%'
  },
  ProductList: {
    width: '100%',
    height: '50%',
    padding: 10,
    margin: 2
  },
  ProductListLandscape: {
    width: '50%',
    height: '100%'
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  productBox: {
    width: '96%',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 2,
    borderRadius: 2,
    flexDirection: 'row'
  },
  flex1: {
    flex: 1
  },
  flex4: {
    flex: 4
  }
})