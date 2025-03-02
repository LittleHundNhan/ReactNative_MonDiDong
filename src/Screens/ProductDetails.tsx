import {
    View, Image, Text, Platform, ScrollView, Dimensions, Pressable, SafeAreaView,
    ImageBackground, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { RootStackScreenProps } from '../Navigation/RootNavigator';
import HeaderComponent from '../components/HeaderComponent';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { ProductListParams } from '../TypesCheck/HomeProps';
import { addToCart } from '../redux/CartReducer';
import DisplayMessage from '../components/DisplayMessage';

const { width, height } = Dimensions.get("window");

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"productDetails">) => {
    const { _id, images, related_images, name, price, oldPrice, description, quantity } = route.params;
    const allImages = [...images, ...(Array.isArray(related_images) ? related_images : [])];
    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(images[0]); // Ảnh đang được hiển thị chính

    const productItemObj: ProductListParams = { ...route.params, quantity: 1 };


    const addItemToCart = () => {
        if (quantity <= 0) {
            setMessage("Product is out of stock.");
        } else if (cart.find(product => product._id === _id)) {
            setMessage("Product is already in cart.");
        } else {
            dispatch(addToCart(productItemObj));
            setMessage("Product added to cart successfully.");
        }
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
    };

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty, please add product to cart");
            setDisplayMessage(true);
            setTimeout(() => setDisplayMessage(false), 3000);
        } else {
            navigation.navigate("TabsStack", { screen: "Cart" });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(false)} />}
            <HeaderComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={() => navigation.goBack()} />
            <ScrollView>
                {/* Ảnh chính của sản phẩm */}
                <ImageBackground style={styles.imageBackground}>
                    <View style={styles.discountContainer}>
                        <Text style={styles.discountText}>{oldPrice ? ((1 - price / oldPrice) * 100).toFixed(1) : 0}% off</Text>
                    </View>
                    <View style={styles.shareContainer}>
                        <MaterialCommunityIcons name='share-variant' size={25} color="green" />
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.productImage} source={{ uri: selectedImage }} />
                    </View>
                    <View style={styles.heartContainer}>
                        <AntDesign name='heart' size={25} color="grey" />
                    </View>
                </ImageBackground>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.thumbnailContainer}
                >
                    {[...images, ...related_images ? related_images : []].map((item, index) => ( // Hợp nhất images và relatedImages
                        <TouchableOpacity key={index} onPress={() => setSelectedImage(item)}>
                            <Image
                                source={{ uri: item }}
                                style={[styles.thumbnailImage, selectedImage === item && styles.selectedThumbnail]}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>



                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.productDescription}>Description: {description}</Text>
                    <Text style={styles.priceText}>Price: ${price}</Text>
                    <Text style={styles.oldPriceText}>Old Price: {oldPrice} $</Text>
                    <Text style={styles.stockText}>{quantity > 0 ? `In Stock: ${quantity}` : "Out of Stock"}</Text>
                    <Text style={styles.colorText}>Address: Quang Trung, Gò Vấp, Tp. Hồ Chí Minh</Text>
                </View>

                <Pressable style={styles.addToCartButton} onPress={addItemToCart}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        paddingTop: Platform.OS === 'android' ? 20 : 0,
    },
    imageBackground: {
        width,
        height: height * 0.5,
        marginTop: 25,
    },
    discountContainer: {
        position: 'absolute',
        left: 15,
        top: 15,
        backgroundColor: "#d9534f",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    discountText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    shareContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50,
    },
    productImage: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
    heartContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
    },
    thumbnailContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    thumbnailImage: {
        width: 70,
        height: 70,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedThumbnail: {
        borderColor: "#28a745",
    },
    detailsContainer: {
        padding: 15,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        marginTop: 0,
    },
    productName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: -3,
    },
    productDescription: {
        fontSize: 16,
        color: "#555",
        marginBottom: 0,
    },
    priceText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#28a745",
    },
    oldPriceText: {
        fontSize: 16,
        color: "#888",
        textDecorationLine: "line-through",
    },
    stockText: {
        fontSize: 16,
        color: "#007bff",
        marginBottom: 5,
    },
    addToCartButton: {
        backgroundColor: "#28a745",
        paddingVertical: 15,
        marginHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    addToCartText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    colorText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ff9800", // Màu cam nổi bật
        marginBottom: 5,
    },
    sizeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#d32f2f", // Màu đỏ nổi bật
        marginBottom: 5,
    },

});

export default ProductDetails;
