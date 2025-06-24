import { createContext, type ReactNode, useContext } from "react";
import { StyleSheet } from "react-native";
import { useInternalTranslateTasks } from "./hooks/useInternalTranslate";
import IOSTranslateTasks from "./IOSTranslateTasksViewNativeComponent";

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
}: {
  children: ReactNode;
}) => {
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
        style={StyleSheet.absoluteFillObject}
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
