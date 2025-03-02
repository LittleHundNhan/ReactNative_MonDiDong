import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";

const PaymentScreen = ({ route, navigation }: TabsStackScreenProps<"Payment">) => {
  const handleConfirmPayment = () => {
    Alert.alert("Thanh toán thành công", "Đơn hàng của bạn đã được đặt thành công!", [
      { text: "OK", onPress: () => navigation.navigate("Home") }, // Quay về trang chủ
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác Nhận Thanh Toán</Text>
      <Text style={styles.address}>Địa chỉ giao hàng: {route.params?.address || "Chưa có địa chỉ"}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmButtonText}>Xác Nhận Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
