import { LanguageProvider } from '../context/LanguageContext';
import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text, View, ActivityIndicator } from 'react-native';

import "../global.css";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
      
      });
      setFontsLoaded(true);
    };

    loadFonts();

    // Override default Text globally
    const oldTextRender = Text.render;
    Text.render = function (...args: any[]) {
      const origin = oldTextRender.apply(this, args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: 'SpaceMono-Regular' }, origin.props.style],
      });
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </LanguageProvider>
  );
}
