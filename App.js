import React from "react";
import { View, Image, Text, ScrollView, ImageBackground } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import SearchScreen from "./src/screens/SearchScreen";
import DetailsScreen from "./src/screens/DetailScreen";
import CartScreen from "./src/screens/CartScreen";
import { Provider as CartProvider } from "./src/context/CartContext";
import { Provider as PriceProvider } from "./src/context/PriceContext";
import OrderScreen from "./src/screens/OrderScreen";
import DeliveryDetailsScreen from "./src/screens/DeliveryDetailsScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import FavouriteScreen from "./src/screens/FavouriteScreen";
import SavedAddressScreen from "./src/screens/SavedAddressScreen";

const navigator = createDrawerNavigator(
  {
    Home: createStackNavigator(
      {
        home: HomeScreen,
        Search: SearchScreen,
        Details: DetailsScreen,
        Cart: CartScreen,
        Favourite: FavouriteScreen,
        details:DeliveryDetailsScreen,

      },
      {
        defaultNavigationOptions:{
          header:null
        }
      }
    ),
    Order: createStackNavigator(
      {
        screen:OrderScreen,
        details:DeliveryDetailsScreen,
        Cart: CartScreen,
        Favourite: FavouriteScreen,
      },
      
      {
        defaultNavigationOptions:{
          header:null
        }
      }
      
    ),
    Delivery:createStackNavigator(
      {
        details: DeliveryDetailsScreen,
        Details: DetailsScreen,
        Saved:SavedAddressScreen,
        payment:PaymentScreen,
      },
      {
        defaultNavigationOptions:{
          header:null
        }
      }

      
    )
  },
  {
    contentComponent: props => {
      return (
        <View style={{ backgroundColor: "#00000029", flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              height: 200,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("./assets/background.png")}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.7,
              }}
            >
              <Image
                source={require("./assets/JohnDoe.jpg")}
                style={{
                  height: 75,
                  width: 75,
                  marginTop: 65,
                  borderRadius: 60,
                  marginBottom: 10,
                }}
                resizeMode="cover"
              ></Image>
              <Text style={{ fontFamily: "Roboto", fontSize: 15 }}>
                John Doe
              </Text>
            </ImageBackground>
          </View>
          <ScrollView style={{ marginTop: 30 }}>
            <DrawerItems {...props}></DrawerItems>
          </ScrollView>
        </View>
      );
    },
    drawerWidth: 200,
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <PriceProvider>
      <CartProvider>
        <App></App>
      </CartProvider>
    </PriceProvider>
  );
};
