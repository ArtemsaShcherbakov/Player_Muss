import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lists: { marginTop: 50, marginBottom: 45 },
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
    padding: 5,
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

  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#d2cdcd",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
