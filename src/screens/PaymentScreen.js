import React from 'react';
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

const PaymentScreen = props => {
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
                                marginLeft: -20,
                                color: "#4C515C",
                                alignSelf: "center",
                                fontWeight: "bold",
                            }}
                        >
                            Payment
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
            <View style={{flexDirection:'row',marginTop: 12,alignItems:'center'}}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                    <Ionicons
                        name="ios-arrow-back"
                        style={{
                            fontSize: 30,
                            marginHorizontal: 10,
                            
                        }}
                    ></Ionicons>
                </TouchableOpacity>
                <Text style={{
                    fontSize:18,
                    fontWeight:'700',
                    marginLeft:40,
                    color:'#343D59'
                }}>SELECT A PAYMENT OPTION</Text>
            </View>
            <View style={{margin:70,alignItems:'center',justifyContent:"center"}}>
                <TouchableOpacity>
                <View style={styles.card}>
                    <Text style={styles.mode}>
                        Credit Card
                    </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.card}>
                    <Text style={styles.mode}>
                        Dedit Card
                    </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
                <View style={styles.card}>
                    <Text style={styles.mode}>
                        Net Banking
                    </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
                <View style={styles.card}>
                    <Text style={styles.mode}>
                        Cash on Delivery
                    </Text>
                </View>
                </TouchableOpacity>
            </View>

        </View>

    );
}



const styles = StyleSheet.create({
    mode:{
        color:'#343D59',
        fontSize:20
    },
    view: {
      backgroundColor: "#F6F7FC",
      flex: 1,
      marginTop: 30,
    },
    card: {
        backgroundColor:"#F7F8FC",
        borderColor:'#FFFFFF',
        borderWidth:1,
        elevation:10,
        height:50,
        width:295,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        marginVertical:10,
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
    menu: {
      alignSelf: "center",
      color: "#343D59",
      fontSize: 35,
      marginTop: 5,
    },
  });
  

export default PaymentScreen;