import { StyleSheet, StatusBar } from "react-native";
import { HEIGHT, WIDTH } from "../../Constants/GlobalWidthHeight";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding:10,
    paddingTop:0,

  },
  searchBar: {
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: WIDTH * 0.94,
    height: HEIGHT * 0.06,
  },

  divider: {
    height: 1,
    backgroundColor: "silver",
    width: WIDTH * 0.94,
  },
  compCountSec: {
    alignItems: "flex-end",
  },
  compCount: {
    fontStyle: "italic",
    fontSize:  HEIGHT*0.015,
    marginRight: 10,
  },
  complaintsList: {
    marginTop: 10,
    marginBottom: 10,
  },
  complaintTit: {
    fontSize:  HEIGHT*0.025,
    fontWeight:'bold',
  },
  
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: HEIGHT*0.03,
    fontWeight: "bold",
    backgroundColor: "green",
    textAlign: "center",
    color: "white",
    padding: 20,
    textTransform:"uppercase"

  },
  modalDescription: {
    fontSize: HEIGHT*0.020,
    marginBottom: 10,
    fontWeight:'normal'
  },
  modalCloseButton: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    width:WIDTH*0.9,
    justifyContent:'center',
    alignItems:'center'
  },
  modalCloseButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize:HEIGHT*0.024,
    textTransform:"uppercase"
    
  },
  complaintContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 8,
    elevation:20,
    display: "flex",
  },
  id: { fontSize: HEIGHT*0.015, width:WIDTH*0.9 },
  complainer:{ fontSize: HEIGHT*0.015, width:WIDTH*0.9 },
});

export { styles };

