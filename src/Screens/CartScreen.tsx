import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Platform,
    Pressable,
    Alert,
    Dimensions,
    ImageBackground,
    Image,
} from "react-native";
import { RootStackScreenProps } from "../components/Navigation/RootNavigator";
import {
    AntDesign,
    MaterialCommunityIcons,
    Ionicons,
    Feather,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "../components/redux/CartReducer";
import { TabsStackScreenProps } from "../components/Navigation/TabsNavigation";
import { CartState, ProductListParams } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../components/DisplayMessage";
import  HeaderComponent  from "../components/HeaderComponent";
import { UserType } from "../components/LoginRegisterComponents/UserContext";
const screenWidth = Dimensions.get("window").width;

const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const gotoPreviousScreen = () => {
        navigation.goBack();
    };
    const gotoCartScreen = () => {
        navigation.navigate("TabsStack", { screen: "Cart" });
    };

    const { getUserId, setGetUserId } = useContext(UserType);
    const proceed = () => {
        if (getUserId === "") {
            navigation.navigate("UserLogin", { screenTitle: "User Authentication" });
        } else {
            if (cart.length === 0) {
                navigation.navigate("TabsStack", { screen: "Home" });
            }
            else {            }
        }
    };

    const decreaseItem = (item: ProductListParams) => {
        if (item.quantity > 1) {
            dispatch(decreaseQuantity(item));
            setMessage("Product Quantity Updated Successfully");
        } else {
            deleteItem(item); // Nếu số lượng <= 1, xóa sản phẩm
        }
        setDisplayMessage(true);
        setTimeout(() => {
            setDisplayMessage(false);
        }, 3000);
    };
    const deleteItem = (item: ProductListParams) => {
        dispatch(removeFromCart(item._id)); // Chỉ truyền ID của sản phẩm
        setMessage("Product Removed Successfully");
        setDisplayMessage(true);
        setTimeout(() => {
            setDisplayMessage(false);
        }, 3000);
    };
    const increaceQuantity = (item: ProductListParams) => {
        dispatch(increaseQuantity(item)); // Gọi action để tăng số lượng
        setMessage("Product Quantity Updated Successfully");
        setDisplayMessage(true);
        setTimeout(() => {
            setDisplayMessage(false);
        }, 3000);
    };
    useEffect(() => {
        if (cart.length === 0) {
            setMessage("Your cart is Empty,Please Add product to continue!");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
                navigation.navigate("TabsStack", { screen: "Home" });
            }, 3000);
        }
    }, [cart.length]);
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === "android" ? 40 : 0,
                flex: 1,
                backgroundColor: "#000",
            }}
        >
            {displayMessage && <DisplayMessage message={message} />}

            <HeaderComponent
                gotoCartScreen={gotoCartScreen}
                cartLength={cart.length}
                goToPrevious={gotoPreviousScreen}
            />

            <ScrollView
                style={{ backgroundColor: "#fff", flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginHorizontal: 10 }}>
                    {cart?.map((item, index) => (
                        <View
                            style={{
                                backgroundColor: "#fff",
                                marginVertical: 10,
                                borderColor: "#F0F0F0",
                                borderWidth: 2,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderTopWidth: 0,
                            }}
                            key={index}
                        >
                            <Pressable
                                style={{
                                    marginVertical: 10,
                                    flexDirection: "row",
                                    // justifyContent: "space-between",
                                }}
                            >
                                <View>
                                    <Image
                                        style={{ width: 140, height: 140, resizeMode: "contain" }}
                                        source={{ uri: item?.images[0] }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text numberOfLines={3} style={{ fontSize: 16, width: 250, marginTop: 10 }}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{ fontSize: 16, marginTop: 6, fontWeight: "bold" }}
                                    >
                                        Price: {item.price.toLocaleString("vi-VN")}$
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={{
                                    marginTop: 15,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                }}
                            >
                                <View
                                    style={{
                                        marginVertical: 10,
                                        paddingVertical: 5,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                    }}
                                >
                                    {item?.quantity > 1 ? (
                                        <Pressable
                                            onPress={() => decreaseItem(item)}
                                            style={{
                                                backgroundColor: "#D8D8D8",
                                                padding: 7,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <AntDesign
                                                name="minus"
                                                size={22}
                                                color="black"
                                            />
                                        </Pressable>
                                    ) : (
                                        <Pressable
                                            onPress={() => deleteItem(item)}
                                            style={{
                                                backgroundColor: "#D8D8D8",
                                                padding: 7,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <AntDesign
                                                name="delete"
                                                size={24}
                                                color="black"
                                            />
                                        </Pressable>
                                    )}
                                    <Pressable
                                        style={{
                                            backgroundColor: "#fff",
                                            paddingHorizontal: 10,
                                            paddingVertical: 6,
                                        }}
                                    >
                                        <Text>{item?.quantity}</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => increaceQuantity(item)}
                                        style={{
                                            backgroundColor: "#D8D8D8",
                                            padding: 7,

                                        }}
                                    >
                                        <Feather
                                            name="plus"
                                            size={24}
                                            color="black"
                                        />
                                    </Pressable>
                                    <Pressable
                                        onPress={() => deleteItem(item)}
                                        style={{
                                            backgroundColor: "#D8D8D8",
                                            padding: 7,
                                            paddingHorizontal: 18,
                                            paddingVertical: 10,
                                            borderColor: "#C0C0C0",
                                            marginLeft: 10,
                                        }}
                                    >
                                        <Text>Delete</Text>
                                    </Pressable>
                                    <View style={{ marginLeft: 120 }}>
                                        <Text
                                            style={{ fontSize: 20, marginTop: 6, fontWeight: "bold", color: "green" }}
                                        >
                                            {(item.price * item.quantity).toLocaleString("vi-VN")}$
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <View style={{ backgroundColor: "#eee", borderColor: "#fff", alignContent: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ marginLeft: 10, fontSize: 28, fontWeight: "400", color: "blue" }}>Total:</Text>
                        <Text style={{ fontSize: 28, fontWeight: "bold", color: "blue" }}>
                            {total.toLocaleString("vi-VN")}$
                        </Text>
                    </View>
                    <Pressable
                        onPress={proceed}
                            
                        style={{
                            backgroundColor: "#FFC72C",
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 10,
                            marginTop: 10,
                        }}
                    >
                        <Text style={{ fontSize: 28, fontWeight: "bold", color: "purple" }}>Click to buy ({cart.length})</Text>
                    </Pressable>
                </View>
            </ScrollView >
        </SafeAreaView >
    );
};

export default CartScreen;
