import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image,Alert } from "react-native";
import SearchBar from "../components/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as CartContext } from "../context/CartContext";
import { Context as PriceContext } from "../context/PriceContext";
import AwesomeAlert from "react-native-awesome-alerts";
import FullData from "../components/FullData"


const SearchScreen = props => {
  const { addItem } = useContext(CartContext);
  const { addPrice } = useContext(PriceContext);
  const [alert, setAlert] = useState(false);
  const data = props.navigation.getParam("data");


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
      <View style={styles.top}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Feather name="menu" style={styles.menu}></Feather>
        </TouchableOpacity>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.image}
        ></Image>
        <Text style={styles.searchResults}>Search</Text>
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
        <TouchableOpacity onPress={() => props.navigation.navigate("Cart")}>
          <AntDesign name="shoppingcart" style={styles.icon}></AntDesign>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
          <Ionicons name="ios-arrow-back" style={styles.arrow}></Ionicons>
        </TouchableOpacity>
          <SearchBar text="Search your favourite products" getText={searchText} searchIt={goSearch}></SearchBar>
      </View>
      <FlatGrid
        items={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Details", { details: item })
                }
              >
                <Image
                  source={item.imageSource}
                  style={styles.listimage}
                  resizeMode="cover"
                ></Image>
              </TouchableOpacity>

              <Text style={styles.name}> {item.name}</Text>

              <Text style={styles.details}>{item.details}</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", marginTop: 3 }}>
                  <TouchableOpacity>
                    <AntDesign
                      name="hearto"
                      style={{
                        color: "#CE1E19",
                        fontSize: 17,
                        marginLeft: 20,
                      }}
                    ></AntDesign>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      await addItem(item);
                      setAlert(!alert);
                      addPrice(item.price);
                    }}
                  >
                    <AntDesign
                      name="shoppingcart"
                      style={{ color: "#1592E6", fontSize: 17 }}
                    ></AntDesign>
                  </TouchableOpacity>
                </View>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
          );
        }}
      ></FlatGrid>
      <AwesomeAlert
        show={alert}
        showProgress={false}
        customView={
          <View style={{}}>
            <Text style={{ color: "#353E5A", fontFamily: "Roboto" }}>
              Your item has been added to the cart.
            </Text>
          </View>
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Continue Shopping"
        confirmButtonColor="#000000"
        onConfirmPressed={() => {
          setAlert(!alert);
        }}
      />
    </View>
  );
};

SearchScreen.navigationOptions = () => {
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
  arrow: {
    color: "#343D59",
    fontSize: 35,
    alignSelf: "center",
    marginTop: 16,
    marginLeft: 5,
  },
});

export default SearchScreen;
