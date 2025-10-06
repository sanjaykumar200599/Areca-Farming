  import React, { useState, useEffect } from "react";
  import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from "react-native";
  import * as ImagePicker from "expo-image-picker";
  import { Camera } from "expo-camera";
  import { Ionicons } from '@expo/vector-icons';
  import { useLanguage } from "../../context/LanguageContext";
  import { translations } from "../../translation";

  const result1= {
      "solution": "Use appropriate insecticides or neem-based sprays.",
      "prevention": "Maintain proper field hygiene and remove infested plant parts."
  }
  export default function CameraGalleryPredict() {
    const { language } = useLanguage();
    const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    // Request camera permissions
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === "granted");
      })();
    }, []);

    // Request gallery permissions
    useEffect(() => {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission needed", "Gallery access is required.");
        }
      })();
    }, []);

    const pickImageFromGallery = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        sendToAPI(result.assets[0].uri);
      }
    };

    const takePhotoWithCamera = async () => {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        sendToAPI(result.assets[0].uri);
      }
    };

    const sendToAPI = async (uri: string) => {
      try {
        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("image", {
          uri,
          name: "photo.jpg",
          type: "image/jpeg",
        } as any);

        const response = await fetch("https://areca-farming.onrender.com/predict", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

        const data = await response.json();

        setResult(data);


      } catch (error) {
        Alert.alert("Error", "Something went wrong while sending the image.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // const translateResult = async (result: any, language: string) => {
    //   if (!result) return null;
    //   if (language === "en") return result;

    //   // Combine fields with markers
    //   const textToTranslate = `PREDICTION::${result.prediction}||PREVENTION::${result.prevention}||SOLUTION::${result.solution}`;

    //   try {
    //     const res = await fetch("https://libretranslate.de/translate", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //       body: JSON.stringify({
    //         q: textToTranslate,
    //         source: "en",
    //         target: language,
    //         format: "text",
    //       }),
    //     });

    //     const text = await res.text();
    //     let data;
    //     try {
    //       data = JSON.parse(text);
    //     } catch {
    //       console.error("Translation API returned invalid JSON:", text);
    //       return result; // fallback
    //     }

    //     const translated = data.translatedText || textToTranslate;

    //     // Split back into fields
    //     const parts = translated.split("||").map((part: string) => part.split("::")[1] || "");
    //     return {
    //       ...result,
    //       prediction: parts[0] || result.prediction,
    //       prevention: parts[1] || result.prevention,
    //       solution: parts[2] || result.solution,
    //     };
    //   } catch (err) {
    //     console.error("Translation failed:", err);
    //     return result; // fallback
    //   }
    // };

    if (cameraPermission === false) {
      return (
        <View className="flex-1 justify-center items-center bg-green-50 px-5">
          <Text className="text-xl font-semibold text-gray-800 text-center mb-2">📷 Camera access required</Text>
          <Text className="text-base text-gray-600 text-center">Please enable camera permissions to use this feature</Text>
        </View>
      );
    }

    return (
      <ScrollView className="flex-1 bg-green-50">
        {/* App Header */}
        <View className="px-5 pt-12 pb-6 flex-row items-center">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-12 h-12 mr-3 rounded-full"
            resizeMode="contain"
          />
          <View>
            <Text className="text-3xl  text-green-800">{translations[language]?.arecabandhu || "Arecabandhu"}</Text>
            <Text className="text-base text-gray-700">
              {translations[language]?.smart_companion || "Your smart crop disease companion"}
            </Text>
          </View>
        </View>

        <View className="px-5 pb-5 pt-6">
          {/* Section Header */}
          <View className="items-center mb-8">
            <Text className="text-xl  text-green-700 mb-2 text-center">{translations[language]?.detect_disease_title || "Detect Arecanut Diseases in Seconds"}</Text>
            <Text className="text-base text-gray-600 text-center leading-6">{translations[language]?.upload_or_capture || "Upload or capture an image to analyze disease"}</Text>
          </View>

          {/* Action Buttons */}
          <View className="mb-8 space-y-4">
            <TouchableOpacity
              className="bg-green-700 py-4 px-6 rounded-xl items-center shadow-lg flex-row justify-center"
              onPress={takePhotoWithCamera}
            >
              <Ionicons name="camera" size={20} color="white" className="mr-2" />
              <Text className="text-white text-lg font-semibold">{translations[language]?.take_photo || "Take Photo"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white py-4 px-6 rounded-xl mt-2 items-center border-2 border-green-600 shadow-md flex-row justify-center"
              onPress={pickImageFromGallery}
            >
              <Ionicons name="image" size={20} color="green" className="mr-2" />
              <Text className="text-green-600 text-lg font-semibold">{translations[language]?.choose_from_gallery || "Choose from Gallery"}</Text>
            </TouchableOpacity>
          </View>

          {/* Selected Image */}
          {image && (
            <View className="items-center mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-3">{translations[language]?.selected_image || "Selected Image"}</Text>
              <Image source={{ uri: image }} className="w-72 h-72 rounded-2xl shadow-lg" />
            </View>
          )}

          {/* Loading State */}
          {loading && (
            <View className="items-center ">
               <Text className=" mb-2 text-base text-green-700 font-medium">{translations[language]?.analyzing_image || "Analyzing image..."}</Text>
              <ActivityIndicator size="large" color="#16a34a" />
            </View>
          )}

          {/* Results */}
          {result ? (
            <View className="mt-5 mb-20 px-5">

              {/* Header */}
              <View className="flex-row items-center justify-center mb-6">
                <Ionicons name="analytics" size={30} color="#16a34a" className="mr-2" />
                <Text className="text-2xl font-bold text-green-700 text-center">
                  {translations[language]?.analysis_results || "analysis_results"}
                </Text>
              </View>

              {/* Card */}
              <View className="bg-white rounded-3xl shadow-lg p-6 space-y-5">

                {/* Predicted Disease */}
                <View className="flex-row items-center bg-green-50 rounded-xl p-4">
                  <Ionicons name="medkit" size={28} color="#16a34a" className="mr-3" />
                  <View>
                    <Text className="text-sm font-semibold text-green-700">{translations[language]?.predicted_disease || "predicted_disease"}</Text>
                    <Text className="text-lg font-bold text-gray-800"> {translations[language]?.[result.prediction]?.name || result.prediction}</Text>
                  </View>
                </View>

                {/* Confidence */}
                <View className="flex-row items-center bg-orange-50 rounded-xl p-4">
                  <Ionicons name="speedometer" size={28} color="#f97316" className="mr-3" />
                  <View>
                    <Text className="text-sm font-semibold text-orange-600">{translations[language]?.confidence || "confidence"}</Text>
                    <Text className="text-lg font-bold text-orange-500">{result.confidence}</Text>
                  </View>
                </View>

                {/* Prevention */}
                <View className="flex-row items-start bg-blue-50 rounded-xl p-4">
                  <Ionicons name="shield-checkmark" size={28} color="#0ea5e9" className="mr-3 mt-1" />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-blue-600">{translations[language]?.prevention || "prevention"}</Text>
                    <Text className="text-base text-gray-700 leading-6">{translations[language]?.[result.prediction]?.prevention || result.prevention}</Text>
                  </View>
                </View>

                {/* Solution */}
                <View className="flex-row items-start bg-yellow-50 rounded-xl p-4">
                  <Ionicons name="bulb" size={28} color="#facc15" className="mr-3 mt-1" />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-yellow-600">{translations[language]?.solution || "solution"}</Text>
                    <Text className="text-base text-gray-700 leading-6">{translations[language]?.[result.prediction]?.solution || result.solution}</Text>
                  </View>
                </View>
              </View>
            </View>


          ) : !loading && (<View className="flex-1 justify-center items-center bg-green-50">
            <Image
              source={require("../../assets/images/nature.gif")} // your GIF
              style={{ width: 250, height: 250, borderRadius: 20 }}
              contentFit="contain" // similar to resizeMode
              cachePolicy="none"   // ensures GIF plays correctly
            />
          </View>
          )}
        </View>
      </ScrollView>
    );
  }