import { StyleSheet } from "react-native";

export default StyleSheet.create({
  track: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    color: "#fff",
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
});
