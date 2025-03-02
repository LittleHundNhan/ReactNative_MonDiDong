import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../components/HeaderComponent';
import { CategoryCard } from './CategoryCard';
import ImageSlider from './ImageSlider';
import { fetchCategories, fetchProductsByCatID, fetchProductByFeature, fetchTrendingProducts } from '../Middleware/HomeMiddleware';
import { TabsStackScreenProps } from '../Navigation/TabsNavigation';
import { ProductListParams } from '../TypesCheck/HomeProps';
import DisplayMessage from '../components/DisplayMessage';
import { useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { ProductCard } from './ProductCard';

const productWidth = 100;
const bgImg = "https://via.placeholder.com/100";

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
    const cart = useSelector((state: CartState) => state.cart.cart);
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
            }, 3000);
        } else navigation.navigate("TabsStack", { screen: "Cart" });
    };

    const goToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("OnboardingScreen");
        }
    };

    const sliderImage = [
        'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg',
        'https://www.standout.co.uk/blog/wp-content/uploads/2022/04/Screenshot-85.png',
        'https://www.ernest.ca/cdn/shop/articles/Reussir_le_style_casual_chic_homme.jpg'
    ];

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
    const [activeCat, setActiveCat] = useState<string>("");
    const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
    const [getProductsByFeature, setGetProductsByFeature] = useState<ProductListParams[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);

    useEffect(() => {
        fetchCategories({ setGetCategory });
        fetchProductByFeature({ setGetProductsByFeature });
        fetchTrendingProducts({ setTrendingProducts });
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCategories({ setGetCategory });
            fetchProductByFeature({ setGetProductsByFeature });
        }, [])
    );

    useEffect(() => {
        if (activeCat) {
            fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
        }
    }, [activeCat]);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<ProductListParams[]>([]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim().length > 0) {
            const filtered = [...getProductsByFeature, ...trendingProducts].filter(product =>
                product.name.toLowerCase().startsWith(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
            <HeaderComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen}
                search={handleSearch} />
            {/* Hiển thị danh sách sản phẩm gợi ý */}
            {searchQuery.length > 0 && (
                <View style={styles.searchResultsContainer}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item, index) => (
                            <Pressable key={index} onPress={() => navigation.navigate("productDetails", item)}>
                                <Text style={styles.searchItem}>{item.name}</Text>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.noResults}>No products found</Text>
                    )}
                </View>
            )}
            <TouchableWithoutFeedback>
                <ScrollView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>
                        <ImageSlider images={sliderImage} />
                    </ScrollView>
                    <View style={styles.categoryContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                            {getCategory.map((item, index) => (
                                <CategoryCard key={index} item={item} catStyleProps={styles.categoryCard} catProps={{ activeCat, onPress: () => setActiveCat(item._id) }} />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{activeCat ? "Products from Selected Category" : "Please select a category"}</Text>
                        <Pressable><Text style={styles.seeAll}></Text></Pressable>
                    </View>
                    <View style={styles.productContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {getProductsByCatID.length > 0 ? (
                                getProductsByCatID.map((item, index) => (
                                    <CategoryCard key={index} item={item} catStyleProps={styles.productCard} catProps={{ onPress: () => navigation.navigate("productDetails", item) }} />
                                ))
                            ) : (
                                <Text style={styles.noProductText}>No products available</Text>
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.trendingTitle}>Trending Deals of the Week</Text>
                    </View>
                    <View style={styles.productContainer}>
                        {trendingProducts.map((item, index) => (
                            <ProductCard key={index} item={{
                                _id: item?._id || index.toString(),
                                name: item?.name || "No Name",
                                images: item?.images || [""],
                                price: item?.price || 0,
                                oldPrice: item?.oldPrice || item?.price || 0,
                                description: item?.description || "No description available",
                                quantity: item?.quantity ?? 1,
                                inStock: item?.inStock ?? true,
                                isFeatured: Boolean(item?.isFeatured),
                                category: item?.category?.toString() || "Uncategorized"
                            }}
                                pStyleProps={styles.trendingCard}
                                productProps={{
                                    imageBg: bgImg,
                                    onPress: () => navigation.navigate("productDetails", item)
                                }} />
                        ))}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB", // Màu nền nhẹ nhàng hơn
    },
    sliderContainer: {
        backgroundColor: "#E5E7EB",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D1D5DB",
    },
    categoryContainer: {
        paddingVertical: 15,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    categoryScroll: {
        paddingHorizontal: 16,
    },
    categoryCard: {
        height: 55,
        width: 60,
        borderRadius: 15,
        resizeMode: "cover",
        marginHorizontal: 5,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#374151",
    },
    seeAll: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2563EB",
    },
    productContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    productCard: {
        height: 110,
        width: 110,
        borderRadius: 12,
        resizeMode: "cover",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 5,
    },
    trendingTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D32F2F",
        paddingLeft: 16,
        marginTop: 10,
    },
    noProductText: {
        padding: 15,
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
    },
    trendingCard: {
        width: productWidth,
        height: 100,
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    searchResultsContainer: {
        backgroundColor: "#fff",
        position: "absolute",
        top: 60,
        left: 10,
        right: 10,
        zIndex: 10,
        borderRadius: 8,
        padding: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    searchItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    noResults: {
        padding: 10,
        textAlign: "center",
        color: "#666",
    },
});


export default HomeScreen;
