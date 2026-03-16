import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { setAudioModeAsync } from "expo-audio";

import { AudioList } from "./src/components";

const App = () => {
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
    });
  }, []);

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
