import { type ReactNode, createContext, useContext } from "react";
import { StyleSheet } from "react-native";
import IOSTranslateTasks from "./IOSTranslateTasksViewNativeComponent";
import { useInternalTranslateTasks } from "./hooks/useInternalTranslate";

type TranslateContextType = {
  isSupported: boolean;
  startIOSTranslateTasks: (
    texts: string[],
    options?: {
      /**
       * A Unicode language identifier of the source language, like en-US, fr_FR, es-419, or zh-Hant-TW.
       */
      sourceLanguage?: string;
      /**
       * A Unicode language identifier of the target language, like en-US, fr_FR, es-419, or zh-Hant-TW.
       */
      targetLanguage?: string;
    },
  ) => Promise<{ translatedTexts: string[] }>;
};

const TranslateContext = createContext<TranslateContextType | null>(null);

export const IOSTranslateTasksProvider = ({
  children,
}: { children: ReactNode }) => {
  const {
    startIOSTranslateTasks,
    shouldTranslate,
    texts,
    sourceLanguage,
    targetLanguage,
    onSuccess,
    onError,
    isSupported,
  } = useInternalTranslateTasks();

  return (
    <TranslateContext.Provider value={{ startIOSTranslateTasks, isSupported }}>
      <IOSTranslateTasks
        texts={texts}
        shouldTranslate={shouldTranslate}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onSuccess={onSuccess}
        onError={onError}
        style={styles.translateView}
      />
      {children}
    </TranslateContext.Provider>
  );
};

export const useIOSTranslateTasks = () => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error(
      "useIOSTranslateTasks must be used within a IOSTranslateTasksProvider",
    );
  }
  return context;
};

const styles = StyleSheet.create({
  translateView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
