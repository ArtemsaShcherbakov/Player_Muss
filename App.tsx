import { StyleSheet, View } from "react-native";

import { AudioList } from "./src/components";

const App = () => {
  return (
    <View style={styles.container}>
      <AudioList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
