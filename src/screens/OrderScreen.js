import React , {useState}from "react";
import { Text,Image, View, TouchableOpacity,Alert, StyleSheet } from "react-native";
import {Feather,AntDesign } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import Data from "../components/Data";
import FullData from "../components/FullData"

const OrderScreen = props => {
  const [searchMode,setSearchMode]=useState(false);
  var searchData=[];
  const searchText = (enteredText) => {
    if(String(enteredText).length !== 0){
      searchData = (FullData.filter(x => String(x.name.toLocaleLowerCase()).includes(enteredText.toLocaleLowerCase())));
      setSearchMode(true)
    }
  }
  const goSearch = () => {
    if(searchData.length !== 0 && searchMode !== false ){
      props.navigation.navigate("Search", { data: searchData })

    }
    else if(searchMode === true){
      Alert.alert('Sorry!',"Item currently unavailable",[
        {text:"OK"}
      ]);
    }
    else{
      Alert.alert('Oops!',"Enter the item name",[
        {text:"OK"}
      ]);
    }
  }

  return (
    <View style={{ backgroundColor: "#F6F7FC",  marginTop: 30 }} >
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
                color: "#21aaff",
                marginHorizontal: 84,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Orders
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
                  marginRight:10,
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
      <View style={{alignItems:"center"}}>
      <SearchBar text="Search your favourite products" getText={searchText} searchIt={goSearch}></SearchBar>
      </View>
      <View>
        <FlatGrid
          items={Data}
          renderItem ={({item}) => {
            return (
              <View style={styles.container}>
                <TouchableOpacity onPress={()=>props.navigation.navigate("details")}>
                  <View style={{}}>
                    <Image
                      source={item.imageSource}
                      style={styles.listimage}
                      resizeMode="cover"
                    ></Image>
                  </View>
                  <Text style={styles.name}> {item.name}</Text>
                  <Text style={styles.details}>{item.details}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        >
        </FlatGrid>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  menu: {
    alignSelf: "center",
    color: "#343D59",
    fontSize: 35,
    marginTop: 5,
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
    width:"100%",
    marginBottom: 15,
    marginLeft: 10,
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
    flex:2,
    borderWidth: 5,
    backgroundColor: "#F7F8FC",
    borderColor: "#F7F8FC",
    borderRadius: 10,
    marginBottom: 10,
    marginRight:15,
  },
  details: {
    color: "#353E5A",
    marginLeft: 19,
    fontSize: 12,
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
  searchResults: {
    fontSize: 25,
    color: "#FF2D88",
    marginLeft: 95,
    marginRight: 65,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default OrderScreen;
