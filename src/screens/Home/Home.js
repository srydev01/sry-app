import { View, Text } from "react-native";
import styles from "./styles";

export default function Home(props) {
  //Main theme colors. (You can modify at "MainContainer.js" ).
  const mainTheme = props.mainTheme

  return (
    <View style={[styles.container, mainTheme.BGColor]}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Home</Text>
    </View>
  )
}