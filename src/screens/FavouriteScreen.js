import React ,{useContext} from "react";
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
  Feather,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import { Context as CartContext } from "../context/CartContext";
import { Context as PriceContext } from "../context/PriceContext";
import FullData from "../components/FullData"


const FavouriteScreen = props => {

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
        {text:"OK", onPress : () => console.log()}
      ]);
    }
  }


  return (
    <View style={{ backgroundColor: "#F6F7FC", flex: 1, marginTop: 30 }}>
      <View style={{ backgroundColor: "#F6F7FC" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
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
                color: "#F8C009",
                marginHorizontal: 84,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Favourites
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: -30,
            }}
          >
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
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("home");
              }}
            >
              <MaterialIcons
                name="add"
                style={{
                  fontSize: 30,
                  color: "#F8C009",
                  marginTop: 4,
                  marginRight: 2,
                }}
              ></MaterialIcons>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
            <Ionicons
              name="ios-arrow-back"
              style={{
                fontSize: 30,
                marginHorizontal: 5,
                marginTop: 12,
              }}
            ></Ionicons>
          </TouchableOpacity>
          <SearchBar text="Search your favourite products" getText={searchText} searchIt={goSearch}></SearchBar>
        </View>
      </View>
      <View style={{ marginTop: 20, height: "75%" }}>
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
                  backgroundColor: "#F6F7FC",
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
                <View style={{ paddingLeft: 10 }}>
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
                    {item.price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      paddingRight: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Cart')
                      }}
                    >
                      <AntDesign
                        name="shoppingcart"
                        style={{
                          fontSize: 30,
                          color: "#FF2D88",
                        }}
                      ></AntDesign>
                    </TouchableOpacity>
                  </View>
                  <View>
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
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#F8C009",
          width: 244,
          height: 36,
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 10,
          elevation: 10,
          shadowColor: "black",
          shadowOpacity: 0.5,
          shadowOffset: { width: 2, height: 0 },
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
          }}
        >
          Add All to Cart
        </Text>
      </TouchableOpacity>
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
});

FavouriteScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

export default FavouriteScreen;
