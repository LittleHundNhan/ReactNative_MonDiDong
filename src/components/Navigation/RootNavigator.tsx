import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import OnboardingScreen from "../../Screens/OnboardingScreens"
import { NavigatorScreenParams } from "@react-navigation/native";
import TabsNavigator, { TabsStackParams } from "./TabsNavigation";
import ProductDetails from "../../Screens/ProductDetails";
import CartScreen from "../../Screens/CartScreen";
import UserAuth from "../../Screens/LoginRegisterScreen";
export type RootStackParams = {
    OnboardingScreen: undefined,
    TabsStack: NavigatorScreenParams<TabsStackParams>,
    Deals: undefined,
    Profile: undefined,
    productDetails: {
        _id: string;
        images: [string];
        name: string;
        price: number;
        oldPrice?: number;
        inStock?: boolean;
        color?: string;
        size?: string;
        description?: string;
        quantity: number
    },
    Cart: {
        _id: string;
        images: [string];
        name: string;
        price: number;
        color?: string;
        size?: string;
        quantity: number
    },
    UserLogin: {
        email?: string;
        password?: string;
        confirmPassword?: string;
        firstName?: string;
        lastName?: string;
        mobileNo?: string;
        screenTitle?: string;
    };
}
const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;
const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="TabsStack"
                component={TabsNavigator}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="productDetails"
                component={ProductDetails}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ headerShown: false }}
            />
             <RootStack.Screen
                name="UserLogin"
                component={UserAuth}
                options={{ headerShown: false }}
            />
        </RootStack.Navigator>
    )
}
export default RootNavigator