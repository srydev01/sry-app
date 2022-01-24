import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileBox: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  profileImg: {
    paddingRight: 20,
    flex: 1
  },
  profileName: {
    justifyContent: "center",
    flex: 2
  },
  profileLabel: {
    fontSize: 22,
    fontWeight: "bold"
  },
  profileRef: {
    fontSize: 16,
  },
  profileEnd: {
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end"
  },
  editProfile: {
    fontSize: 14,
    color: '#555'
  },
  menuBtn: {
    flexDirection: "row",
    alignItems: "center"
  },
  menu: {
    fontSize: 18,
    paddingVertical: 14,
    marginLeft: 8
  },
  logout: {
    fontWeight: "bold",
    color: '#c00',
    fontSize: 16,
    paddingVertical: 14,
    marginLeft: 8
  }
})