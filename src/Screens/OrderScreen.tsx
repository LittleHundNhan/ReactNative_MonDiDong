import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { TabsStackScreenProps } from "../components/Navigation/TabsNavigation";

const OrderScreen = ({ navigation }: TabsStackScreenProps<"Order">) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleConfirm = () => {
    // Xử lý lưu địa chỉ hoặc chuyển đến bước tiếp theo
    console.log({ fullName, phone, address, city, postalCode });
    navigation.navigate("Payment"); // Giả sử có màn Payment
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập Địa Chỉ Giao Hàng</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Thành phố"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã bưu điện"
        keyboardType="numeric"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <Button title="Xác Nhận" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default OrderScreen;
