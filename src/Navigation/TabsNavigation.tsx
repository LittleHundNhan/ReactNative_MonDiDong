import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackScreenProps } from './RootNavigator';
import HomeScreen from '../Screens/HomeScreen';
import CartScreen from '../Screens/CartScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import OrderScreen from '../Screens/OrderScreen';

export type TabsStackParams = {
    Home: undefined;
    Cart?:
    {
        _id?: string;
        images?: [string];
        name?: string;
        price?: number;
        color?: string;
        size?: string;
        quantity?: number
    },
    Payment: {address: string};
    Profile: undefined;
    Order: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParams>();
export type TabsStackScreenProps<T extends keyof TabsStackParams> =
    CompositeScreenProps<BottomTabScreenProps<TabsStackParams, T>, RootStackScreenProps<"TabsStack">>;
const TabsNavigation = () => {
    return (
        <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <TabsStack.Screen
                name="Home" component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <AntDesign name="home" size={24} color="#00970a" />
                    ) : (
                        <AntDesign name="home" size={24} color="#000" />
                    )
                }}
            />
            <TabsStack.Screen
                name="Cart" component={CartScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <AntDesign name="shoppingcart" size={24} color="#00970a" />
                    ) : (
                        <AntDesign name="shoppingcart" size={24} color="#000" />
                    )
                }}
            />
             <TabsStack.Screen
                name="Order" component={OrderScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="copy" size={24} color="#00970a" />
                    ) : (
                        <Ionicons name="copy-outline" size={24} color="#000" />
                    )
                }}
            />
            <TabsStack.Screen
                name="Payment" component={PaymentScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="card" size={24} color="#00970a" />
                    ) : (
                        <Ionicons name="card" size={24} color="#000" />
                    )
                }}
            />
           
        </TabsStack.Navigator>
    )
}
export default TabsNavigation