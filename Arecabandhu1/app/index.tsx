import { useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home"); // Go to home after 2.5s
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />

      {/* App Name */}
      <Text className="text-3xl font-bold text-white mb-2 tracking-wide">
        ArecaBandhu
      </Text>

      {/* Tagline */}
      <Text className="text-gray-400 mb-8">Connecting Areca Farmers</Text>

      {/* Loading Spinner */}
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}
