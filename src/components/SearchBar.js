import React, { useState } from "react";
import { View, StyleSheet, TextInput,Keyboard} from "react-native";
import { Feather ,AntDesign} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBar = props => {
  const [text,setText]=useState('');
  const textHandler = (enteredText) => {
    setText(enteredText);
    props.getText(enteredText);
  }
  const search = () =>{
    props.searchIt()
    setText('')
  }
  const cancelSearch = () =>{
    setText('');
    Keyboard.dismiss();
  }
  return (
    <View style={styles.backgroundstyle}>
      <View>
        <TouchableOpacity
          onPress={search}
        >
          <Feather name="search" size={35} style={styles.iconStyle}></Feather>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.searchbar}
          placeholder={props.text}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={textHandler}
          defaultValue ={""}
          value={text}
        ></TextInput>
      </View>
      <View style={{height:"100%",paddingTop:4}}>
        <TouchableOpacity
          onPress={cancelSearch}
        >
          <AntDesign name="close" style={styles.iconStyle} size={25}></AntDesign>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundstyle: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 15,
    width: 320,
    marginLeft: 15,
    justifyContent:"space-between"
  },
  searchbar: {
    backgroundColor: "white",
    alignItems:"center"
  },
  iconStyle: {
    marginHorizontal: 7,
    alignContent:"space-between",
  },
});

export default SearchBar;
