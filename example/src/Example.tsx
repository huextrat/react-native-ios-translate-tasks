import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIOSTranslateTasks } from "react-native-ios-translate-tasks";

const targetLanguages = ["it_IT", "fr_FR", "es_ES", "de_DE"];

export const Example = () => {
  const { startIOSTranslateTasks } = useIOSTranslateTasks();

  const [isLoading, setIsLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState(targetLanguages[0]);

  const [texts, setTexts] = useState<
    { base: string; translation: string | undefined }[]
  >([
    {
      base: "Hello world! This is a sample text to translate.",
      translation: undefined,
    },
    {
      base: "How are you?",
      translation: undefined,
    },
  ]);

  const handleTranslate = async () => {
    try {
      setIsLoading(true);
      const { translatedTexts } = await startIOSTranslateTasks(
        texts.map((text) => text.base),
        {
          sourceLanguage: "en_EN",
          targetLanguage: targetLanguage,
        },
      );
      setTexts(
        texts.map((text, index) => ({
          ...text,
          translation: translatedTexts[index],
        })),
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>iOS Native Translator</Text>
      <Text style={styles.subtitle}>iOS Translate Tasks for React Native</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={handleTranslate}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>
        <View style={styles.languageSelector}>
          {targetLanguages.map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageButton,
                targetLanguage === language && styles.selectedLanguage,
              ]}
              onPress={() => setTargetLanguage(language)}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  targetLanguage === language && styles.selectedLanguageText,
                ]}
              >
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {texts.map((text, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Just for the example
          <View style={styles.card} key={index}>
            <Text style={styles.cardTitle}>{text.base}</Text>
            {isLoading ? (
              <ActivityIndicator size="small" color="#1E1E2E" />
            ) : (
              text.translation && (
                <Text style={styles.cardDescription}>{text.translation}</Text>
              )
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1E1E2E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 40,
    fontWeight: "300",
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#EAEEF2",
    marginBottom: 4,
    gap: 8,
  },
  cardContent: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5D5FEF",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E2E",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#5D5FEF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  languageSelector: {
    flexDirection: "row",
    gap: 8,
  },
  languageButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#EAEEF2",
  },
  languageButtonText: {
    color: "#1E1E2E",
    fontSize: 18,
    fontWeight: "700",
  },
  selectedLanguage: {
    backgroundColor: "#5D5FEF",
  },
  selectedLanguageText: {
    color: "#FFFFFF",
  },
});
