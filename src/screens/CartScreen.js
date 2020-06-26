import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
import SearchBar from "../components/SearchBar";
import { Context as CartContext } from "../context/CartContext";
import { Context as PriceContext } from "../context/PriceContext";
import FullData from "../components/FullData"


const CartScreen = props => {
  const { state, deleteItem } = useContext(CartContext);
  const {
    state: { price },
    deletePrice,
  } = useContext(PriceContext);

  var searchData=[];
  const searchText = (enteredText) => {
    if(String(enteredText).length !== 0){
      searchData = (FullData.filter(x => String(x.name.toLocaleLowerCase()).includes(enteredText.toLocaleLowerCase())));
    }
  }
  const goSearch = () => {
    if(searchData.length !== 0){
        props.navigation.navigate("Search", { data: searchData })
    }
    else{
      Alert.alert('Oops!',"Enter the item name",[
        {text:"OK", onPress : () => console.log('closed')}
      ]);
    }
  }


  return (
    <View style={{ backgroundColor: "#F6F7FC", flex: 1, marginTop: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Feather name="menu" style={styles.menu}></Feather>
        </TouchableOpacity>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.image}
        ></Image>
        <Text style={styles.searchResults}>Your Cart</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Favourite")}
        >
          <AntDesign
            name="hearto"
            style={{
              fontSize: 30,
              alignSelf: "center",
              marginTop: 7,
              color: "#CE1E19",
            }}
          ></AntDesign>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("home")}>
          <MaterialIcons name="add" style={styles.icon}></MaterialIcons>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
          <Ionicons name="ios-arrow-back" style={styles.arrow}></Ionicons>
        </TouchableOpacity>
        <SearchBar text="Search your favourite products" getText={searchText} searchIt={goSearch}></SearchBar>
        <EvilIcons
          name="location"
          style={{ color: "#975EFF", fontSize: 35, marginTop: 20 }}
        ></EvilIcons>
      </View>
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
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",

                marginHorizontal: 30,

                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <View 
                style={{
                  backgroundColor: "#F6F7FC",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: "white",
                  padding:10,
                  width:'90%',
                  
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Details", { details: item })
                  }
                >
                  <Image source={item.imageSource} style={styles.image1}></Image>
                </TouchableOpacity>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      color: "#353E5A",
                      fontSize: 13,
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      marginTop: 5,
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
                        marginTop: 2,
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
                      marginTop: 5,
                    }}
                  >
                    $ {item.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  height: "100%",
                  alignItems: "center",
                  paddingTop:10
                }}
              >
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: "#F6F7FC",
                    alignItems: "center",
                    marginBottom: 5,
                    justifyContent: "center",
                    borderColor:"white",
                    borderWidth:1
                  }}
                >
                  <AntDesign
                    name="heart"
                    style={{ fontSize: 15, color: "red" }}
                  ></AntDesign>
                </View>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: "#F6F7FC",
                    marginBottom: 5,
                    justifyContent: "center",
                    borderColor:"white",
                    borderWidth:1
                  }}
                >
                  <MaterialIcons 
                    name="add" 
                    style={{
                      color:"#F8C009",
                      fontSize:25,
                    }}
                  ></MaterialIcons>
                </View>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: "#F6F7FC",
                    marginBottom: 5,
                    justifyContent: "center",
                    borderColor: "white",
                    borderWidth: 1
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      await deleteItem(item);
                      deletePrice(item.price);
                    }}
                  >
                    <Feather
                      name="minus"
                      style={{ fontSize: 20, color: "#F8C009" }}
                    ></Feather>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      ></FlatList>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 35,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 192,
            height: 44,
            backgroundColor: "#FF2D88",
            alignItems: "center",
            borderRadius: 25,
            elevation: 10,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowOffset: { width: 2, height: 0 },
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Roboto",
              color: "#FFFFFF",
              fontWeight: "700",
              marginTop: 9,
            }}
          >
            Payable Amount :${price}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 15,
            width: 98,
            height: 44,
            borderRadius: 25,
            alignItems: "center",
            backgroundColor: "#975EFF",
            elevation: 10,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowOffset: { width: 2, height: 0 },
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Roboto",
              color: "#FFFFFF",
              fontWeight: "700",
              marginTop: 4,
              marginLeft: 16,
            }}
          >
            Proceed to Payment
          </Text>
        </View>
      </View>
    </View>
  );
};

CartScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
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

export default CartScreen;
