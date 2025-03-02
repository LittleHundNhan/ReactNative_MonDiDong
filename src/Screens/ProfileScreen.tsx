import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import axios from "axios";

type ProfileScreenProps = TabsStackScreenProps<"Profile">;

type User = {
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const testSaveUserId = async () => {
            await AsyncStorage.setItem("userId", "67c17225d53e0a648eb20333"); // Thay userId của bạn
            const userId = await AsyncStorage.getItem("userId");
            console.log("userId kiểm tra lại:", userId);
        };
        testSaveUserId();
    }, []);
    
    

    return (
        <View>
            {user ? (
                <>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Số điện thoại: {user.mobileNo}</Text>
                </>
            ) : (
                <Text>Đang tải thông tin...</Text>
            )}

            <Button title="Đăng xuất" onPress={async () => {
                await AsyncStorage.removeItem("authToken");
                navigation.replace("UserLogin", {
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    mobileNo: "",
                    screenTitle: "Đăng nhập"
                });
                
            }} />
        </View>
    );
};

export default ProfileScreen;
