import React, { useContext,useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import SearchBar from "../components/SearchBar";
import { AntDesign, Feather, Ionicons, EvilIcons } from "@expo/vector-icons";
import { Context as CartContext } from "../context/CartContext";
import { Context as PriceContext } from "../context/PriceContext";
import FullData from "../components/FullData"

const DetailsScreen = props => {
  const { addItem } = useContext(CartContext);
  const { addPrice } = useContext(PriceContext);
  const details = props.navigation.getParam("details");

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
      <SliderBox
        style={styles.SliderBox}
        images={[
          details.imageSource,
          details.imageSource1,
          details.imageSource2,
        ]}
        resizeMethod={"resize"}
        resizeMode={"cover"}
        autoplay
        circleLoop
        dotColor="#343D59"
      ></SliderBox>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 175, marginLeft: 70, marginTop: 15 }}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.details}>{details.details}</Text>
          <Text style={styles.price}>${details.price}</Text>
        </View>
        <View style={{ marginLeft: 15 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#FF2D88",
              alignItems: "center",
              marginBottom: 5,
              justifyContent:"center",
            }}
          >
            <TouchableOpacity
            onPress={async () => {
              await addItem(details, () => {
                props.navigation.navigate("Favourite");
              });
              addPrice(details.price);
            }}
          >
            <AntDesign
              name="heart"
              style={{ fontSize: 25, color: "white"}}
            ></AntDesign>
          </TouchableOpacity>
            
          </View>
          <TouchableOpacity
            onPress={async () => {
              await addItem(details, () => {
                props.navigation.navigate("Cart");
              });
              addPrice(details.price);
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#F8C009",
                alignItems: "center",
                marginTop: 5,
                justifyContent:'center'
              }}
            >
              <AntDesign
                name="shoppingcart"
                style={{ fontSize: 30, color: "white",  }}
              ></AntDesign>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "white",
              alignItems: "center",
              marginTop: 7,
              justifyContent:'center'
            }}
          >
            <Ionicons
              name="md-share"
              style={{ fontSize: 30, color: "#2F9DFB"}}
            ></Ionicons>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => props.navigation.navigate("details")}
        
      >
        <View style={styles.buy}>
          <Text
            style={{
              color: "white",
              fontFamily: "Roboto",
              fontWeight: "bold",
              marginTop: 1,
            }}
          >
            BUY NOW
        </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          width: 300,
          height: 140,
          borderRadius: 10,
          marginTop: 15,
          alignSelf:'center',
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            marginTop: 12,
            marginLeft: 18,
            fontFamily: "Roboto",
            color: "#343D59",
            fontWeight: "500",
          }}
        >
          About this item:
        </Text>
        <Text
          style={{
            marginLeft: 17,
            fontSize: 12,
            fontFamily: "Roboto",
            color: "#343D59",
            marginRight: 17,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          maximus nec nisi non aliquam. Vivamus pretium, elit ac condimentum
          faucibus, purus nibh cursus nisi, quis aliquet ligula orci sed metus.
        </Text>
      </View>
    </View>
  );
};

DetailsScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
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
  icon: {
    alignSelf: "center",
    color: "#FF2D88",
    fontSize: 35,
    marginTop: 5,
  },
  top: {
    flexDirection: "row",
  },
  menu: {
    alignSelf: "center",
    color: "#343D59",
    fontSize: 35,
    marginTop: 5,
  },
  arrow: {
    color: "#343D59",
    fontSize: 35,
    alignSelf: "center",
    marginTop: 17,
    paddingLeft: 10,
  },
  SliderBox: {
    height: 250,
    width: 250,
    marginLeft: 70,
    borderRadius: 27,
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#353E5A",
    marginTop: 10,
  },
  details: {
    fontSize: 19,
    fontFamily: "Roboto",
    color: "#353E5A",
  },
  price: {
    fontSize: 25,
    fontFamily: "Roboto",
    color: "#353E5A",
    fontWeight: "700",
  },
  buy: {
    width: 261,
    height: 36,
    alignItems: "center",
    alignSelf:'center',
    borderRadius: 10,
    backgroundColor: "#975EFF",
    paddingTop: 6,
    marginTop: 10,
    elevation:8
  },
  icon1: {
    fontSize: 28,
    color: "white",
    marginTop: 4,
    marginRight: 2,
  },
});

export default DetailsScreen;
