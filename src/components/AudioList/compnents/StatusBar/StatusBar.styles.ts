import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  centeredView: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 25,
  },
  modalView: {
    width: "100%",
    gap: 15,
    margin: 20,
    backgroundColor: "#605d5d",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  controls: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#d2cdcd",
  },
});
