// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View className="absolute bottom-4 left-4 right-4 flex-row justify-around 
                    bg-[#111] rounded-full h-16 items-center shadow-lg">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.title ?? route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
                if (route.name === "home") {
                    iconName = isFocused ? "home" : "home-outline";
                }
                if (route.name === "search") {
                    iconName = isFocused ? "search" : "search-outline";
                }
                if (route.name === "settings") {
                    iconName = isFocused ? "settings" : "settings-outline";
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        className="flex-1 items-center justify-center"
                    >
                        <Ionicons
                            name={iconName}
                            size={22}
                            color={isFocused ? "#22c55e" : "#737373"}
                        />
                        <Text className={`text-xs ${isFocused ? "text-green-500" : "text-gray-400"}`}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <MyTabBar {...props} />}
        />
    );
}
