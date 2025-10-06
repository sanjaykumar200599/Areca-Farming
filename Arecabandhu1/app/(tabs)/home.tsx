import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
  Dimensions
} from "react-native";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translation";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

// Diseases
const CUSTOM_DISEASES = [
  {
    id: "d1",
    nameKey: "disease_leaf_spot_name",
    descriptionKey: "disease_leaf_spot_desc",
    image: { uri: "https://daijiworld.ap-south-1.linodeobjects.com/Linode/images3/denzil_021022_yellowspot.jpg" },
    severity: "Medium",
    category: "Fungal",
    treatmentTime: "2-3 weeks"
  },
  {
    id: "d2",
    nameKey: "disease_yellow_wilt_name",
    descriptionKey: "disease_yellow_wilt_desc",
    image: { uri: "https://www.frontiersin.org/files/Articles/1023386/fpls-13-1023386-HTML-r1/image_m/fpls-13-1023386-g001.jpg" },
    severity: "High",
    category: "Viral",
    treatmentTime: "4-6 weeks"
  },
  {
    id: "d3",
    nameKey: "disease_bud_rot_name",
    descriptionKey: "disease_bud_rot_desc",
    image: { uri: "https://agritech.tnau.ac.in/crop_protection/images/arecanut_diseases/bud_rot_2.jpg" },
    severity: "Critical",
    category: "Bacterial",
    treatmentTime: "6-8 weeks"
  },
  {
    id: "d4",
    nameKey: "disease_karu_name",
    descriptionKey: "disease_karu_desc",
    image: { uri: "https://media.assettype.com/thequint%2F2022-11%2Fc5f80c72-d2e1-4cd6-9805-eafe9d2f64af%2Farecanut9.jpeg?auto=format%2Ccompress&fmt=webp&width=720" },
    severity: "High",
    category: "Fungal",
    treatmentTime: "3-5 weeks"
  },
  {
    id: "d5",
    nameKey: "disease_root_rot_name",
    descriptionKey: "disease_root_rot_desc",
    image: { uri: "https://agritech.tnau.ac.in/crop_protection/images/arecanut_diseases/foot_rot_3.jpg" },
    severity: "High",
    category: "Fungal",
    treatmentTime: "4-6 weeks"
  },
  {
    id: "d6",
    nameKey: "disease_leaf_blight_name",
    descriptionKey: "disease_leaf_blight_desc",
    image: { uri: "https://agritech.tnau.ac.in/crop_protection/images/arecanut_diseases/yellow_1.jpg" },
    severity: "Medium",
    category: "Fungal",
    treatmentTime: "2-4 weeks"
  },
  {
    id: "d7",
    nameKey: "disease_nematode_name",
    descriptionKey: "disease_nematode_desc",
    image: { uri: "https://ipm.ucanr.edu/PMG/IMAGES/M/N-RK-MSPP-CD.030banner.png" },
    severity: "Medium",
    category: "Pest",
    treatmentTime: "3-4 weeks"
  },
  {
    id: "d8",
    nameKey: "disease_stem_borer_name",
    descriptionKey: "disease_stem_borer_desc",
    image: { uri: "https://content.peat-cloud.com/w400/yellow-stem-borer-rice-2.jpg" },
    severity: "High",
    category: "Pest",
    treatmentTime: "4-5 weeks"
  },
  {
    id: "d9",
    nameKey: "disease_lichen_name",
    descriptionKey: "disease_lichen_desc",
    image: { uri: "https://extension.msstate.edu/sites/default/files/styles/large/public/newsletter/Figure_1_1.png?itok=1_7GXUAv" },
    severity: "Low",
    category: "Environmental",
    treatmentTime: "1-2 weeks"
  },
  {
    id: "d10",
    nameKey: "disease_sooty_mold_name",
    descriptionKey: "disease_sooty_mold_desc",
    image: { uri: "https://apps.lucidcentral.org/pppw_v10/images/entities/sooty_moulds_051/sooty_mould_coconut_5950.jpg" },
    severity: "Low",
    category: "Fungal",
    treatmentTime: "1-3 weeks"
  },
];

// Solutions/Treatments
const CUSTOM_SOLUTIONS = [
  {
    id: "s1",
    nameKey: "solution_neem_oil_name",
    descriptionKey: "solution_neem_oil_desc",
    image: { uri: "https://www.gardendesign.com/pictures/images/400x320Exact_40x0/dream-team-s-portland-garden_6/spraying-tomato-plant-spraying-neem-oil-shutterstock-com_17255.jpg" },
    effectiveness: "85%",
    type: "Organic",
    cost: "Low"
  },
  {
    id: "s2",
    nameKey: "solution_pruning_name",
    descriptionKey: "solution_pruning_desc",
    image: { uri: "https://www.picturethisai.com/image-handle/website_cmsname/image/1080/209408827100823552.jpeg?x-oss-process=image/format,webp&v=1.0" },
    effectiveness: "70%",
    type: "Physical",
    cost: "Free"
  },
  {
    id: "s3",
    nameKey: "solution_fungicide_name",
    descriptionKey: "solution_fungicide_desc",
    image: { uri: "https://www.samrakshanorganics.com/assets/images/b-7.png" },
    effectiveness: "95%",
    type: "Chemical",
    cost: "Medium"
  },
  {
    id: "s4",
    nameKey: "solution_sanitization_name",
    descriptionKey: "solution_sanitization_desc",
    image: { uri: "https://imgs.mongabay.com/wp-content/uploads/sites/30/2023/10/23143321/vlcsnap-2023-10-23-14h32m56s419-1200x800.png" },
    effectiveness: "80%",
    type: "Prevention",
    cost: "Low"
  },
  {
    id: "s5",
    nameKey: "solution_balanced_fertilizer_name",
    descriptionKey: "solution_balanced_fertilizer_desc",
    image: { uri: "https://www.spic.in/wp-content/uploads/2021/10/11.png" },
    effectiveness: "75%",
    type: "Nutritional",
    cost: "Medium"
  },
  {
    id: "s6",
    nameKey: "solution_irrigation_name",
    descriptionKey: "solution_irrigation_desc",
    image: { uri: "https://agritech.tnau.ac.in/horticulture/plantation/arecanut1.png" },
    effectiveness: "90%",
    type: "Management",
    cost: "High"
  },
  {
    id: "s7",
    nameKey: "solution_crop_rotation_name",
    descriptionKey: "solution_crop_rotation_desc",
    image: { uri: "https://parachutekalpavriksha.org/cdn/shop/articles/Crops_suited_for_intercropping_in_coconut_farms.webp?v=1711262578&width=1400" },
    effectiveness: "85%",
    type: "Prevention",
    cost: "Medium"
  },
  {
    id: "s8",
    nameKey: "solution_insecticide_name",
    descriptionKey: "solution_insecticide_desc",
    image: { uri: "https://nif.org.in/upload/innovation_photo/more_images/19_innovation-2.jpg" },
    effectiveness: "90%",
    type: "Chemical",
    cost: "Medium"
  },
  {
    id: "s9",
    nameKey: "solution_physical_barrier_name",
    descriptionKey: "solution_physical_barrier_desc",
    image: { uri: "https://mgnregasuccess.wordpress.com/wp-content/uploads/2018/04/87.png" },
    effectiveness: "70%",
    type: "Physical",
    cost: "Low"
  },
  {
    id: "s10",
    nameKey: "solution_organic_compost_name",
    descriptionKey: "solution_organic_compost_desc",
    image: { uri: "https://cdn.shopify.com/s/files/1/0609/1427/0467/files/Blog_Images_-_2023-08-30T095833.315_480x480.png?v=1693369777" },
    effectiveness: "80%",
    type: "Organic",
    cost: "Low"
  },
  {
    id: "s11",
    nameKey: "solution_practice_good_hygiene_name",
    descriptionKey: "solution_practice_good_hygiene_desc",
    image: { uri: "https://static.india.com/wp-content/uploads/2024/10/FEATURE-2024-10-30T033154.574.jpg?impolicy=Medium_Widthonly&w=500&h=375" },
    effectiveness: "85%",
    type: "Prevention",
    cost: "Free"
  },
];
export default function HomeScreen() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("diseases");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "#ef4444";
      case "High": return "#f97316";
      case "Medium": return "#eab308";
      case "Low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Organic": return "#22c55e";
      case "Chemical": return "#3b82f6";
      case "Physical": return "#8b5cf6";
      case "Prevention": return "#6366f1";
      case "Nutritional": return "#f97316";
      default: return "#6b7280";
    }
  };

  const filteredDiseases = CUSTOM_DISEASES.filter(disease =>
    translations[language]?.[disease.nameKey]?.toLowerCase().includes(searchQuery.toLowerCase()) || false
  );

  const filteredSolutions = CUSTOM_SOLUTIONS.filter(solution =>
    translations[language]?.[solution.nameKey]?.toLowerCase().includes(searchQuery.toLowerCase()) || false
  );

  const renderDiseaseCard = (disease) => (
    <TouchableOpacity
      key={disease.id}
      className="bg-white rounded-2xl mb-4 shadow-lg"
      onPress={() => {
        setSelectedItem(disease);
        setModalVisible(true);
      }}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="relative">
        <Image
          source={disease.image}
          className="w-full h-48 rounded-t-2xl"
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3 flex-row space-x-2">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getSeverityColor(disease.severity) }}
          >
            <Text className="text-white text-xs font-bold">{translations[language]?.severity?.[disease.severity.toLowerCase()] || disease.severity}</Text>
          </View>
        </View>
        <View className="absolute bottom-3 left-3">
          <View className="bg-black bg-opacity-60 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-semibold">{translations[language]?.category?.[disease.category.toLowerCase()] || disease.category}</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {translations[language]?.[disease.nameKey] || "Disease Name"}
        </Text>
        <Text className="text-gray-600 text-sm leading-5" numberOfLines={3}>
          {translations[language]?.[disease.descriptionKey] || "Disease description"}
        </Text>

        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="bacteria" size={22} color="black" />
            <Text className="text-gray-700 font-medium text-sm"> {translations[language]?.category?.[disease.category.toLowerCase()] || disease.category}</Text>
          </View>
          <View className="bg-blue-500 px-3 py-1 rounded-full">
            <Text className="text-white font-bold text-xs"> {translations[language]?.learnMore || "LearnMore"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSolutionCard = (solution) => (
    <TouchableOpacity
      key={solution.id}
      className="bg-white rounded-2xl mb-4 shadow-lg"
      onPress={() => {
        setSelectedItem(solution);
        setModalVisible(true);
      }}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="relative">
        <Image
          source={solution.image}
          className="w-full h-48 rounded-t-2xl"
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3">
          <View className="bg-green-500 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">{solution.effectiveness}</Text>
          </View>
        </View>
        <View className="absolute bottom-3 left-3">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getTypeColor(solution.type) }}
          >
            <Text className="text-white text-xs font-semibold">{translations[language]?.type?.[solution.type.toLowerCase()] || solution.severity}</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {translations[language]?.[solution.nameKey] || "Solution Name"}
        </Text>
        <Text className="text-gray-600 text-sm leading-5" numberOfLines={3}>
          {translations[language]?.[solution.descriptionKey] || "Solution description"}
        </Text>

        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="pill"
              size={20}
              color="black"
            />
            <Text className="text-gray-700 font-medium text-sm">{translations[language]?.type?.[solution.type.toLowerCase()] || solution.severity}</Text>
          </View>
          <View className="bg-green-500 px-3 py-1 rounded-full">
            <Text className="text-white font-bold text-xs">{translations[language]?.readMore || "ReadMore"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-green-50 mt-0">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="bg-white shadow-lg rounded-b-3xl px-6 py-8 mb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-3 overflow-hidden">
              <Image
                source={require("../../assets/images/logo.png")} // replace with your custom image url
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-3xl text-green-800 text-center">
              {translations[language]?.arecabandhu || "Arecabandhu"}
            </Text>
            <Text className="text-gray-500 text-center mt-1">
             {translations[language]?.appTitle || "Smart Arecanut Disease Management"}
            </Text>
          </View>

          {/* Search Bar */}
          <View className="bg-gray-100 rounded-xl flex-row items-center px-4 py-3 mb-4">
            <Ionicons name="search" size={28} color="black" />
            <TextInput
              className="flex-1 text-gray-800"
              placeholder= {translations[language]?.searchPlaceholder || "Search diseases or solutions..."}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Tab Selector */}
          <View className="flex-row bg-gray-100 rounded-xl p-1">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg items-center ${activeTab === "diseases" ? "bg-green-700" : ""
                }`}
              onPress={() => setActiveTab("diseases")}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="bacteria" size={22} color={activeTab === "diseases" ? "black" : "black"} />
                <Text
                  className={`ml-2  ${activeTab === "diseases" ? "text-white" : "text-gray-600"
                    }`}
                >
                   {translations[language]?.diseases || "diseases"}
                </Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg items-center ${activeTab === "solutions" ? "bg-green-700" : ""
                }`}
              onPress={() => setActiveTab("solutions")}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="medical-bag"
                  size={22}
                  color={activeTab === "solutions" ? "white" : "black"}
                />
                <Text
                  className={`ml-2 ${activeTab === "solutions" ? "text-white" : "text-gray-600"
                    }`}
                >
                  {translations[language]?.solutions || "Solutions"}
                </Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View className="px-6">
          {/* Stats */}
          <View className="flex-row  mb-6">
            <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-2xl font-bold text-black">
                {activeTab === "diseases" ? filteredDiseases.length : filteredSolutions.length}
              </Text>
              <Text className="text-gray-500 text-sm">
                {activeTab === "diseases" ? translations[language]?.diseases || "diseases" : translations[language]?.solutions || "Solutions"}
              </Text>
            </View>
            <View className="flex-1 bg-white rounded-xl p-4 shadow-sm ml-2">
              <Text className="text-2xl font-bold text-green-700">24/7</Text>
              <Text className="text-gray-500 text-sm"> {translations[language]?.support || "Support"}</Text>
            </View>
          </View>

          {/* Cards */}
          {activeTab === "diseases"
            ? filteredDiseases.map(renderDiseaseCard)
            : filteredSolutions.map(renderSolutionCard)
          }

          {/* Empty State */}
          {((activeTab === "diseases" && filteredDiseases.length === 0) ||
            (activeTab === "solutions" && filteredSolutions.length === 0)) && (
              <View className="items-center py-12">
                <Ionicons name="search" size={28} color="black" />
                <Text className="text-xl font-bold text-gray-800 mb-2">{translations[language]?.noResultsFound || "No Results Found"}</Text>
                <Text className="text-gray-500 text-center">
                 {translations[language]?.tryAdjusting || "Try adjusting your search criteria"}
                </Text>
              </View>
            )}
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedItem && (
              <>
                <View className="relative">
                  <Image
                    source={selectedItem.image}
                    className="w-full h-80"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    className="absolute top-12 right-6 w-10 h-10 bg-black bg-opacity-50 rounded-full items-center justify-center"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-white font-bold text-lg">✕</Text>
                  </TouchableOpacity>
                </View>

                <View className="p-6">
                  <Text className="text-2xl font-bold text-gray-800 mb-4">
                    {translations[language]?.[selectedItem.nameKey]}
                  </Text>
                  <Text className="text-gray-700 text-base leading-6 mb-6">
                    {translations[language]?.[selectedItem.descriptionKey]}
                  </Text>

                  {/* Additional Details */}
                  <View className="space-y-4">
                    {selectedItem.severity && (
                      <View className="flex-row items-center justify-between bg-gray-50 rounded-xl p-4">
                        <Text className="font-semibold text-gray-800">{translations[language]?.severitylevel || "Severity Level"}</Text>
                        <View
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: getSeverityColor(selectedItem.severity) }}
                        >
                          <Text className="text-white font-bold">{selectedItem.severity}</Text>
                        </View>
                      </View>
                    )}

                    {selectedItem.effectiveness && (
                      <View className="flex-row items-center justify-between bg-gray-50 rounded-xl p-4">
                        <Text className="font-semibold text-gray-800">  {translations[language]?.effectiveness || "effectiveness"}</Text>
                        <Text className="text-green-600 font-bold text-lg">{selectedItem.effectiveness}</Text>
                      </View>
                    )}

                    <TouchableOpacity
                      className="bg-green-700 rounded-xl p-4 items-center mt-6"
                      onPress={() => setModalVisible(false)}
                    >
                      <Text className="text-white font-bold text-lg"> {translations[language]?.cancel || "cancel"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}