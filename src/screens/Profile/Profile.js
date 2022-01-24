//Import component.
import { View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";

//Import vector icons.
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAuth, signOut } from "firebase/auth";

export default function Profile(props) {
  const auth = getAuth()

  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  //Label button name.
  const settingLabel = 'Setting'
  const languageLabel = 'Language'
  const supportLabel = 'Help & Support'
  const careerLabel = 'Careers'
  const logoutLabel = 'Log out'

  //On press edit profile.
  const editProfile = () => {

  }

  //On press log out.
  const logOutPrees = () => {
    signOut(auth).then(() => {
      console.log(props.extraData.username + ' log out.')
    })
  }

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <ScrollView style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() => editProfile()}
        >
          <View style={styles.profileBox}>
            <View style={styles.profileImg}>
              <FontAwesome
                name="user-circle"
                size={70}
                color={mainTheme.Color.backgroundColor}
              />
            </View>
            <View style={styles.profileName}>
              <Text style={[styles.profileLabel, mainTheme.TextColor]}>
                {props.extraData.username}
              </Text>
              <Text style={[styles.profileRef, mainTheme.TextColor]}>
                {'#' + props.extraData.ref}
              </Text>
              <Text style={[styles.editProfile, mainTheme.colorTextInActive]}>
                Edit Profile
              </Text>
            </View>
            <View style={styles.profileEnd}>
              <FontAwesome name="angle-right" size={20}></FontAwesome>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn}>
          <MaterialCommunityIcons
            name="cog"
            size={20}
            color={mainTheme.TextColorGrey.color}
          />
          <Text style={[styles.menu, mainTheme.TextColorGrey]}>
            {settingLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn}>
          <MaterialIcons
            name="language"
            size={20}
            color={mainTheme.TextColorGrey.color}
          />
          <Text style={[styles.menu, mainTheme.TextColorGrey]}>
            {languageLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn}>
          <MaterialIcons
            name="help"
            size={20}
            color={mainTheme.TextColorGrey.color}
          />
          <Text style={[styles.menu, mainTheme.TextColorGrey]}>
            {supportLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn}>
          <FontAwesome5
            name="user-tie"
            size={20}
            color={mainTheme.TextColorGrey.color}
          />
          <Text style={[styles.menu, mainTheme.TextColorGrey]}>
            {careerLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => logOutPrees()}
        >
          <FontAwesome
            name="sign-out"
            size={20}
            color='#c00'
          />
          <Text style={styles.logout}>
            {logoutLabel}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}