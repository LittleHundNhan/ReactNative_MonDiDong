import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../HeaderComponent';
import { CategoryCard } from './CategoryCard';
import ImageSlider from './ImageSlider';
import { fetchCategories, fetchProductsByCatID, fetchProductByFeature } from '../Middleware/HomeMiddleware';
import { TabsStackScreenProps } from '../Navigation/TabsNavigation';
import { ProductListParams } from '../TypesCheck/HomeProps';
import DisplayMessage from '../DisplayMessage';
import { useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
    const cart = useSelector((state: CartState) => state.cart.cart);
    const [message, setMessage] = React.useState("");
    const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
            }, 3000)
        } else
            navigation.navigate("TabsStack", { screen: "Cart" });
    }
    const goToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            console.log("Go back to previous page.");
            navigation.goBack();
        } else {
            console.log("Cannot return, redirected to Onboarding page.");
            navigation.navigate("OnboardingScreen"); // Navigate fallback r
        }
    };

    const sliderImage = [
        'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?cs=srgb&dl=pexels-olly-842811.jpg&fm=jpg',
        'https://www.standout.co.uk/blog/wp-content/uploads/2022/04/Screenshot-85.png',
        'https://www.ernest.ca/cdn/shop/articles/Reussir_le_style_casual_chic_homme.jpg?v=1698246829&width=2048'
    ];

    const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
    const [activeCat, setActiveCat] = useState<string>("");
    const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
    const [getProductsByFeature, setGetProductsByFeature] = useState<ProductListParams[]>([]);
    const [isViewVisible, setIsViewVisible] = useState<boolean>(true);

    useEffect(() => {
        fetchCategories({ setGetCategory });
        fetchProductByFeature({ setGetProductsByFeature });
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

    useFocusEffect(
        useCallback(() => {
            fetchCategories({ setGetCategory });
            if (activeCat) {
                fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
            }
        }, [activeCat])
    );

    const handleOutsideClick = () => {
        if (isViewVisible) {
            setIsViewVisible(false);
        }
    };

    const handleCategoryClick = (catID: string) => {
        setActiveCat(catID);
        setIsViewVisible(true);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
           {displayMessage && <DisplayMessage message = {message} visible={()=> setDisplayMessage(!displayMessage)}/>}
           <HeaderComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen} />
            <TouchableWithoutFeedback onPress={handleOutsideClick}>
                <ScrollView>

                    {/* Slider Hình Ảnh */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: "#efefef" }}>
                        <ImageSlider images={sliderImage} />
                    </ScrollView>

                    {/* Danh Mục */}
                    <View style={{ backgroundColor: "yellow", flex: 1 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            style={{ marginTop: 4 }}
                        >
                            {getCategory.map((item, index) => (
                                <CategoryCard
                                    key={index}
                                    item={{ "name": item.name, "images": item.images, _id: item._id }}
                                    catStyleProps={{
                                        "height": 50,
                                        "width": 55,
                                        "radius": 20,
                                        "resizeMode": "contain"
                                    }}
                                    catProps={{
                                        "activeCat": activeCat, "onPress": () => handleCategoryClick(item._id)
                                    }}
                                />
                            ))}
                        </ScrollView>
                        {/* Danh Sách Sản Phẩm */}
                        {isViewVisible && (
                            <>
                                <View style={{
                                    backgroundColor: "pink", flexDirection: "row", justifyContent: "space-between",
                                    marginTop: 10
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
                                        {activeCat ? "Products from Selected Category" : "Please select a category"}
                                    </Text>
                                    <Pressable>
                                        <Text style={{ fontSize: 11, fontWeight: "bold", padding: 10 }}>
                                            See ALL
                                        </Text>
                                    </Pressable>
                                </View>

                                <View style={{
                                    backgroundColor: "#fff", borderWidth: 7, borderColor: "green", flexDirection: "row",
                                    justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"
                                }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {
                                            getProductsByCatID?.length > 0 ? (
                                                getProductsByCatID.map((item, index) => (
                                                    <CategoryCard
                                                        key={index}
                                                        item={{ "name": item.name, "images": item.images, "_id": item._id }}
                                                        catStyleProps={{
                                                            "height": 100,
                                                            "width": 100,
                                                            "radius": 10,
                                                            "resizeMode": "contain"
                                                        }}
                                                        catProps={{
                                                            "onPress": () => navigation.navigate("productDetails", item)
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <Text style={{ padding: 10 }}>Không có sản phẩm nào</Text>
                                            )
                                        }

                                    </ScrollView>
                                </View>
                            </>

                        )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    );
}

export default HomeScreen;
