import { StatusBar, StyleSheet, View } from "react-native";
import { IOSTranslateTasksProvider } from "react-native-ios-translate-tasks";
import { Example } from "./Example";

export default function App() {
  return (
    <IOSTranslateTasksProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Example />
      </View>
    </IOSTranslateTasksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
