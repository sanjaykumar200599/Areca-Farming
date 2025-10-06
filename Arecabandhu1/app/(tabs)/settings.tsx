import { View, Text, TouchableOpacity, Modal, FlatList, ScrollView, Animated, Dimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const modalScaleAnim = useRef(new Animated.Value(0.8)).current;
  const modalOpacityAnim = useRef(new Animated.Value(0)).current;

  const languages = [
    { name: 'English', code: 'en', flag: 'E' },
    { name: 'Kannada', code: 'kn', flag: 'ಕ' },
  ];

  const selectedLanguage = languages.find(l => l.code === language);

  // Entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Modal animations
  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(modalScaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      modalScaleAnim.setValue(0.8);
      modalOpacityAnim.setValue(0);
    }
  }, [modalVisible]);

  return (
    <ScrollView
      className="flex-1 bg-gradient-to-b bg-green-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Enhanced Header */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
        className="bg-white shadow-2xl rounded-b-3xl px-6 py-8 mb-6"
      >
        <View className="items-center">
          <View className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-3xl">⚙️</Text>
          </View>
          <Text className="text-3xl  text-gray-800 text-center">
            {translations[language]?.settings || 'Settings'}
          </Text>
          <Text className="text-base text-gray-500 text-center mt-2 leading-5">
            {translations[language]?.customizeExperience || 'Customize your experience'}
          </Text>
        </View>
      </Animated.View>

      <View className="px-6 space-y-8">

        {/* Language Selection Card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }]
          }}
        >
          <View className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 mb-2">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full items-center justify-center mr-4">
                <Ionicons name="language" size={24} color="black" className="mr-2" />
              </View>
              <View>
                <Text className="text-xl text-gray-800">
                  {translations[language]?.language || 'Language'}
                </Text>
                <Text className="text-sm text-gray-500">
                  {translations[language]?.chooseLanguage || 'chooseLanguage'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-5"
              onPress={() => setModalVisible(true)}
              style={{
                shadowColor: '#ea580c',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View className="flex-row justify-between items-center ">
                <View className="flex-row items-center">
                  <Text className="text-4xl mr-4">{selectedLanguage?.flag}</Text>
                  <View>
                    <Text className="text-gray-800 text-lg">
                      {translations[language]?.languageNames[selectedLanguage?.code]}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                        {translations[language]?.currentlySelected || 'currentlySelected'}
                    </Text>
                  </View>
                </View>
                <View className="w-10 h-10 bg-green-600 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">›</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* App Information Card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }]
          }}
        >
          <View className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 mb-2">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full items-center justify-center mr-4">
                <Ionicons name="information-circle-outline" size={28} color="black" />
              </View>
              <View>
                <Text className="text-xl  text-gray-800">
                  {translations[language]?.appInformation || 'App Information'}
                </Text>
                <Text className="text-sm text-gray-500">
                    {translations[language]?.aboutApp || 'aboutApp'}
                </Text>
              </View>
            </View>

            <View className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5">
              <View className="flex-row items-start">
                <View className="w-10 h-10 rounded-full items-center justify-center mr-3 mt-1 border-black border">
                  <Ionicons name="leaf-outline" size={24} color="green" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 leading-6 text-base">
                    {translations[language]?.appDescription || 'This app is designed to provide a seamless multilingual experience for detecting and managing arecanut diseases with advanced AI technology'} 
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-blue-200">
                <Text className="text-blue-600 font-semibold">Version</Text>
                <View className="bg-blue-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-sm font-bold">v1.0.0</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Development Team Card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }]
          }}
        >
          <View className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 mb-2">
            <View className="flex-row items-center ">
              <View className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full items-center justify-center mr-4">
                <Ionicons name="code-slash-outline" size={24} color="black" />
              </View>
              <View>
                <Text className="text-xl text-gray-800">
                  {translations[language]?.developmentTeam || 'Development Team'}
                </Text>
                <Text className="text-sm text-gray-500">
                   {translations[language]?.meetDevelopers || 'meetDevelopers'}
                </Text>
              </View>
            </View>

            <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5">
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-purple-500 rounded-full items-center justify-center mr-4 mb-2">
                    <Text className="text-white font-bold text-lg">SK</Text>
                  </View>
                  <View>
                    <Text className="text-gray-800 text-lg">{translations[language]?.sanjay_kumar_puttur || 'sanjay_kumar_puttur'}</Text>
                    <Text className="text-gray-500 text-sm">4SO22CS094</Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-pink-500 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold text-lg">PG</Text>
                  </View>
                  <View>
                    <Text className="text-gray-800  text-lg">{translations[language]?.parlakoti_gowrav || 'parlakoti_gowrav'}</Text>
                    <Text className="text-gray-500 text-sm">4SO22CS101</Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-pink-500 rounded-full items-center justify-center mr-4 mt-2">
                    <Text className="text-white font-bold text-lg">NG</Text>
                  </View>
                  <View>
                    <Text className="text-gray-800  text-lg">{translations[language]?.niteesh_gowda || 'niteesh_gowda'}</Text>
                    <Text className="text-gray-500 text-sm">4SO22CS98</Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-pink-500 rounded-full items-center justify-center mr-4 mt-2">
                    <Text className="text-white font-bold text-lg">AN</Text>
                  </View>
                  <View>
                    <Text className="text-gray-800  text-lg">{translations[language]?.anonymous_developer || 'anonymous_developer'}</Text>
                    <Text className="text-gray-500 text-sm">4SO22CS075</Text>
                  </View>
                </View>

              </View>

            </View>
          </View>
        </Animated.View>

        {/* Quick Actions Card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: slideAnim }]
          }}
        >
          <View className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 mb-20">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full items-center justify-center mr-4">
                <Ionicons name="flash-outline" size={24} color="black" />
              </View>
              <View>
                <Text className="text-xl  text-gray-800">
                  {translations[language]?.quickActions || 'Quick Actions'}
                </Text>
                <Text className="text-sm text-gray-500">
                {translations[language]?.helpfulShortcuts || 'helpfulShortcuts'}
                </Text>
              </View>
            </View>

            <View className="space-y-3">
              <TouchableOpacity className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4 flex-row items-center">
                <View className="w-10 h-10 rounded-full border border-black items-center justify-center mr-4">
                  <Ionicons name="help-circle-outline" size={24} color="black" />
                </View>
                <View>
                  <Text className="text-gray-800 text-lg">
                    {translations[language]?.helpSupport || 'Help & Support'}
                  </Text>
                  <Text className="text-gray-500 text-sm">{translations[language]?.helpSupportSubtitle || 'helpSupportSubtitle'}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 flex-row items-center">
                <View className="w-10 h-10 rounded-full border border-black items-center justify-center mr-4 ">
                  <Ionicons name="star" size={24} color="black" />
                </View>

                <View>
                  <Text className="text-gray-800  text-lg">
                    {translations[language]?.rateApp || 'Rate App'}
                  </Text>
                  <Text className="text-gray-500 text-sm">{translations[language]?.rateAppSubtitle || 'rateAppSubtitle'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Enhanced Language Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <TouchableOpacity
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onPress={() => setModalVisible(false)}
        >
          <Animated.View
            style={{
              opacity: modalOpacityAnim,
              transform: [{ scale: modalScaleAnim }]
            }}
            className="bg-white rounded-3xl mx-6 shadow-2xl border border-gray-200 w-80"
          >
            <View className="p-6">
              <View className="items-center mb-6">
                <View className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full items-center justify-center mb-4">
                  <Ionicons name="globe-outline" size={24} color="black" />
                </View>
                <Text className="text-2xl  text-gray-800 text-center">
                  {translations[language]?.language || 'Select Language'}
                </Text>
                <Text className="text-gray-500 text-center mt-2">
               {translations[language]?.chooseLanguage || 'Choose your preferred language'}
                </Text>
              </View>

              <View className="space-y-3 mb-6 ">
                {languages.map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    className={`p-5 rounded-2xl flex-row items-center justify-between ${language === item.code
                        ? 'bg-gradient-to-r from-orange-500 to-red-500  mt-3  border-black-100 border'
                        : 'bg-gray-100 mt-2'
                      }`}
                    onPress={() => {
                      setLanguage(item.code);
                      setModalVisible(false);
                    }}
                    style={language === item.code ? {
                      shadowColor: '#ea580c',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                    } : {}}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-4xl mr-4">{item.flag}</Text>
                      <View>
                        <Text className={` text-lg ${language === item.code ? 'text-black' : 'text-gray-800'
                          }`}>
                         {translations[language]?.languageNames[item.code] || item.name}
                        </Text>
                        <Text className={`text-sm ${language === item.code ? 'text-orange-400' : 'text-gray-500'
                          }`}>
                          {item.code.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    {language === item.code && (
                      <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
                        <Text className="text-orange-500 text-lg font-bold">✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                className="bg-gray-100 rounded-2xl p-4 items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-700  text-lg"> {translations[language]?.cancel || "Cancel"}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}