import React, { useEffect } from "react";
import { Alert, Button, Platform, View } from "react-native";
import * as Notifications from "expo-notifications";
import Ex01 from "../components/ex/Ex01";
import Ex03 from "@/components/ex/Ex03";
import Ex04 from "@/components/ex/Ex04";
import Ex06 from "@/components/ex/Ex06";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("⚠️ Bạn cần cấp quyền để nhận thông báo!");
      } else {
        console.log("✅ Quyền thông báo đã được cấp!");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    };

    requestPermission();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📦 Xem chi tiết sản phẩm",
        body: "Nhấn vào để xem chi tiết Item 123",
        data: { screen: "Details", itemId: 123 },
        android: { channelId: "reminders" },
      },
      trigger: null, // gửi ngay
    });

    Alert.alert("✅ Đã gửi thông báo!");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Ex01 /> */}
      {/* <Ex03 /> */}
      {/* <Ex04 />
      <Ex06 /> */}
      <Button title="Gửi Local Notification" onPress={sendNotification} />
    </View>
  );
}
