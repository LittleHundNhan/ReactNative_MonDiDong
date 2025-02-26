import { View, Text, Platform } from 'react-native'
import React from 'react'
import { TabsStackScreenProps } from '../Navigation/TabsNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../HeaderComponent'
import DisplayMessage from '../DisplayMessage'
import { useSelector } from 'react-redux'
import { CartState } from '../TypesCheck/productCartTypes'
const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {
    const gotoCartScreen = () => {

        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
            }, 3000)
            navigation.navigate("Home")
        }
    }
    const goToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            console.log("Go back to previous page.");
            navigation.goBack();
        } else {
            console.log("Cannot return, redirecting to Home page.");
            navigation.navigate("Home"); // Navigate fallback if unable to return
        }
    };
    const cart = useSelector((state: CartState) => state.cart.cart);
    const [message, setMessage] = React.useState("");
    const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 0 : 0, flex: 1, backgroundColor: "black" }}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
            <HeaderComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen} />
        </SafeAreaView>
    )
}
export default CartScreen