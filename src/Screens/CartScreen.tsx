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
    Image,
    StyleSheet,
} from "react-native";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "../redux/CartReducer";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { CartState, ProductListParams } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../components/DisplayMessage";
import HeaderComponent from "../components/HeaderComponent";
import { UserType } from "../components/LoginRegisterComponents/UserContext";

const screenWidth = Dimensions.get("window").width;

const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {
    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);

    const gotoPreviousScreen = () => navigation.goBack();
    const gotoCartScreen = () => navigation.navigate("TabsStack", { screen: "Cart" });

    const { getUserId } = useContext(UserType);
    
    const proceed = () => {
        if (getUserId === "") {
            navigation.navigate("UserLogin", { screenTitle: "User Authentication" });
        } else if (cart.length === 0) {
            navigation.navigate("TabsStack", { screen: "Home" });
        }
    };

    const decreaseItem = (item: ProductListParams) => {
        if (item.quantity > 1) {
            dispatch(decreaseQuantity(item));
        } else {
            deleteItem(item);
        }
        setTimeout(() => setDisplayMessage(false), 3000);
    };

    const deleteItem = (item: ProductListParams) => {
        dispatch(removeFromCart(item._id));
        setMessage("Product Removed Successfully");
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
    };

    const increaceQuantity = (item: ProductListParams) => {
        dispatch(increaseQuantity(item));
        setTimeout(() => setDisplayMessage(false), 3000);
    };

    useEffect(() => {
        if (cart.length === 0) {
            setMessage("Your cart is Empty, Please Add product to continue!");
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
            <SafeAreaView style={styles.container}>
                {displayMessage && <DisplayMessage message={message} />}
        
                <HeaderComponent
                    gotoCartScreen={gotoCartScreen}
                    cartLength={cart.length}
                    goToPrevious={gotoPreviousScreen}
                />
        
                {cart.length === 0 ? (
                    <View style={styles.emptyCartContainer}>
                        <Image 
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png" }} 
                            style={styles.emptyCartImage} 
                        />
                        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
                        <Pressable onPress={() => navigation.navigate("Home")} style={styles.emptyCartButton}>
                            <Text style={styles.emptyCartButtonText}>Mua sắm ngay</Text>
                        </Pressable>
                    </View>
                ) : (
                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <View style={styles.cartContainer}>
                            {cart?.map((item, index) => (
                                <View style={styles.cartItem} key={index}>
                                    <Pressable style={styles.productRow}>
                                        <Image style={styles.productImage} source={{ uri: item?.images[0] }} />
                                        <View style={styles.productDetails}>
                                            <Text numberOfLines={3} style={styles.productName}>{item.name}</Text>
                                            <Text style={styles.productPrice}>Price: {item.price.toLocaleString("vi-VN")}$</Text>
                                        </View>
                                    </Pressable>
        
                                    <Pressable style={styles.quantityRow}>
                                        {item?.quantity > 1 ? (
                                            <Pressable onPress={() => decreaseItem(item)} style={styles.iconButton}>
                                                <AntDesign name="minus" size={22} color="black" />
                                            </Pressable>
                                        ) : (
                                            <Pressable onPress={() => deleteItem(item)} style={styles.iconButton}>
                                                <AntDesign name="delete" size={24} color="black" />
                                            </Pressable>
                                        )}
                                        <Text style={styles.quantityText}>{item?.quantity}</Text>
                                        <Pressable onPress={() => increaceQuantity(item)} style={styles.iconButton}>
                                            <Feather name="plus" size={24} color="black" />
                                        </Pressable>
                                        <Pressable onPress={() => deleteItem(item)} style={styles.deleteButton}>
                                            <Text>Delete</Text>
                                        </Pressable>
                                        <Text style={styles.totalPrice}>
                                            {(item.price * item.quantity).toLocaleString("vi-VN")}$
                                        </Text>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
        
                        <View style={styles.totalContainer}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalAmount}>{total.toLocaleString("vi-VN")}$</Text>
                            </View>
                            <Pressable onPress={proceed} style={styles.checkoutButton}>
                                <Text style={styles.checkoutText}>Đặt hàng ({cart.length})</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        );
        
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "#F5F5F5", // Màu nền sáng hơn, dễ nhìn hơn
    },
    scrollContainer: {
        backgroundColor: "#FFF",
        flex: 1,
    },
    cartContainer: {
        marginHorizontal: 12,
    },
    cartItem: {
        backgroundColor: "#FFF",
        marginVertical: 12,
        borderBottomWidth: 2,
        borderColor: "#E0E0E0",
        paddingVertical: 10,
        borderRadius: 8, // Bo góc mềm mại
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Hiệu ứng đổ bóng cho Android
    },
    productRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    productImage: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        borderRadius: 8, // Bo góc ảnh
    },
    productDetails: {
        marginLeft: 14,
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    productPrice: {
        fontSize: 18,
        marginTop: 6,
        fontWeight: "bold",
        color: "#FF5722", // Màu cam nổi bật
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    iconButton: {
        backgroundColor: "#E0E0E0",
        padding: 8,
        borderRadius: 5,
    },
    quantityText: {
        backgroundColor: "#FFF",
        paddingHorizontal: 14,
        paddingVertical: 6,
        fontSize: 18,
        fontWeight: "bold",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    deleteButton: {
        backgroundColor: "#FF5252",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    totalContainer: {
        backgroundColor: "#FFF",
        padding: 16,
        borderTopWidth: 2,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    totalLabel: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF5722",
    },
    checkoutButton: {
        backgroundColor: "#FFC72C",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    checkoutText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black", // Màu tím nổi bật
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green",
        textAlign: "right",
        marginTop: 8,
        marginRight: 10,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    emptyCartImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    emptyCartButton: {
        backgroundColor: "#FF5722",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    emptyCartButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
});


export default CartScreen;
