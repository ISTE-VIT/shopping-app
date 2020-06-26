import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import HomeList from "../components/HomeList";
import healthFitnessData from "../components/HealthFitnessData";
import EssentialsData from "../components/EssentialsData";
import FashionData from "../components/FashionData";
import FullData from "../components/FullData"
import { useSafeArea } from "react-native-safe-area-context";

const HomeScreen = props => {
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
    <View style={{ marginTop: 30, backgroundColor: "#F6F7FC" }}>
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
              style={styles.searchResults} >
              Home
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
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View  >
          <SearchBar text="Search your favourite products" getText={searchText} searchIt={goSearch}></SearchBar>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Search", { data: EssentialsData })
          }
        >
          <HomeList title="Daily Essentials" list={EssentialsData}></HomeList>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Search", { data: healthFitnessData })
          }
        >
          <HomeList
            title="Health And Fitness"
            list={healthFitnessData}
          ></HomeList>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Search", { data: FashionData })
          }
        >
          <HomeList title="Fashion Essentials" list={FashionData}></HomeList>
        </TouchableOpacity>
      </ScrollView>
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
  searchResults: {
    fontSize: 25,
    color: "#FF2D88",
    marginLeft:-25,
    alignSelf: "center",
    fontWeight: "bold",
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
});

HomeScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

export default HomeScreen;
