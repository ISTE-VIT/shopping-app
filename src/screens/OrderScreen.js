import React , {useState,useContext}from "react";
import { Text,Image, View, TouchableOpacity,Alert, StyleSheet } from "react-native";
import {Feather,AntDesign } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import Data from "../components/Data";
import FullData from "../components/FullData"
import { FlatList } from "react-native-gesture-handler";
import { Context as CartContext } from "../context/CartContext";
import { Context as PriceContext } from "../context/PriceContext";

const OrderScreen = props => {
  const { state, deleteItem } = useContext(CartContext);
  const {
    state: { price },
    deletePrice,
  } = useContext(PriceContext);


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
        <FlatList
          data={state}
          keyExtractor={item => {
            return (
              item.id.toString() +
              new Date().getTime().toString() +
              Math.floor(
                Math.random() * Math.floor(new Date().getTime())
              ).toString()
            );
          }}
          renderItem ={({item}) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 15,
                  marginHorizontal: 30,
                  marginVertical: 10,
                  padding: 10,
                  justifyContent: "space-between",
                  borderColor: "white",
                }}
              >
                <TouchableOpacity onPress={() =>
                  props.navigation.navigate("Details", { details: item })

                }>
                  <Image
                    source={item.imageSource}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 14,
                    }}
                  ></Image>
                </TouchableOpacity>
                <View style={{ paddingLeft: 10,borderLeftColor:'balck',borderLeftWidth:1 }}>
                  <Text
                    style={{
                      color: "#353E5A",
                      fontSize: 13,
                      fontFamily: "Roboto",
                      fontWeight: "700",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      width: 150,
                    }}
                  >
                    <Text
                      style={{
                        color: "#353E5A",
                        fontSize: 10,
                        fontFamily: "Roboto",
                        fontWeight: "300",
                        marginTop: 1,
                      }}
                    >
                      {item.details}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#353E5A",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    ${item.price}
                  </Text>
                </View>
              </View>
            );
              
          }}
        >
        </FlatList>
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



  menu: {
    alignSelf: "center",
    color: "#343D59",
    fontSize: 35,
    marginTop: 5,
  },
  icon: {
    alignSelf: "center",
    color: "#F8C009",
    fontSize: 40,
    marginTop: 3,
  },
  image: {
    width: 28,
    height: 28,
    marginTop: 8,
    marginLeft: 10,
    alignSelf: "stretch",
  },
  searchResults: {
    fontSize: 25,
    color: "#FF2D88",
    marginLeft: 84,
    marginRight: 65,
    alignSelf: "center",
    fontWeight: "bold",
  },
  arrow: {
    color: "#343D59",
    fontSize: 35,
    alignSelf: "center",
    marginTop: 17,
    paddingLeft: 10,
  },
  image1: {
    height: 70,
    width: 70,
    borderRadius: 14,
  },
});

export default OrderScreen;
