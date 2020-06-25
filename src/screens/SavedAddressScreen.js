import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert
} from "react-native";
import {
    Ionicons,
    Feather,
    MaterialIcons,
    AntDesign,
    EvilIcons,
  } from "@expo/vector-icons";

const SavedAddressScreen = props =>{


    return(
      <View style={styles.view}>
        <View style={{ backgroundColor: "#F6F7FC" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Feather name="menu" style={styles.menu}></Feather>
              </TouchableOpacity>
              <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
              ></Image>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  marginLeft:-20,
                  color: "#975EFF",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Select Address
            </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: -30,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Favourite")}
              >
                <AntDesign
                  name="hearto"
                  style={{
                    fontSize: 30,
                    alignSelf: "center",
                    marginTop: 7,
                    marginRight: 10,
                    color: "#CE1E19",
                  }}
                ></AntDesign>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Cart");
                }}
              >
                <AntDesign
                  name="shoppingcart"
                  style={{
                    fontSize: 30,
                    color: "#FF2D88",
                    marginTop: 4,
                    marginRight: 2,
                  }}
                ></AntDesign>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{
          marginTop:10,
          flexDirection:'row',
          justifyContent:'space-around',
        }}>
          <TouchableOpacity onPress={() => props.navigation.navigate("details")}>
            <View style={{
              padding: 10,
            }}>
              <Text style={{
                color: '#828CAC',
                fontSize: 18,
                fontWeight: '700',
              }}>NEW ADDRESS</Text>
           </View>
        </TouchableOpacity>
        <View style={{ 
                padding: 10,
                borderBottomColor:'#00004a',
                borderBottomWidth:4,
            }}>
              <Text style={{
                color: '#00004a',
                fontSize: 18,
                fontWeight: '700',
              }}>SAVED ADDRESS</Text>
            </View>
        </View>
        <FlatList>
            
        </FlatList>
      </View>

    )
};


const styles = StyleSheet.create({
  text:{
    color:'#828CAC',
    fontSize:17
  },
  view: {
    backgroundColor: "#F6F7FC",
    flex: 1,
    marginTop: 30,
  },
  image: {
    width: 28,
    height: 28,
    marginTop: 8,
    marginLeft: 10,
    alignSelf: "stretch",
  },
  listimage: {
    height: 120,
    width: 120,
    marginBottom: 15,
    marginLeft: 20,
    alignSelf: "stretch",
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#353E5A",
    marginLeft: 15,
  },
  container: {
    borderWidth: 5,
    backgroundColor: "#F7F8FC",
    borderColor: "#F7F8FC",
    borderRadius: 10,
    marginBottom: 10,
  },
  
  top: {
    flexDirection: "row",
  },
  icon: {
    alignSelf: "center",
    color: "#FF2D88",
    fontSize: 35,
    marginTop: 5,
    marginLeft: 5,
  },
  price: {
    fontWeight: "bold",
    color: "#353E5A",
    marginLeft: 50,
    fontSize: 16,
  },
  button: {
    height: 50,
    width: 50,
    margin: 100,
  },
  menu: {
    alignSelf: "center",
    color: "#343D59",
    fontSize: 35,
    marginTop: 5,
  },
});

export default SavedAddressScreen;
