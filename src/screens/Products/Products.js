import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

//Import vector icons.
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from "react";

export default function Products(props) {
  //Init const state.
  const [nameSearch, setNameSearch] = useState('')
  
  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <ScrollView style={{ width: '100%' }}>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.search}
          placeholder='Search products'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => onSearch(text)}
          value={nameSearch}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.addFlowBtn, mainTheme.Color]}
          onPress={() => addFlowPress()}
        >
          <MaterialIcons
            name='add-to-photos'
            size={32}
            color={mainTheme.TextColorLight.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}