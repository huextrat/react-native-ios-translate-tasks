import { useRef, useState } from "react";
import { type NativeSyntheticEvent, Platform } from "react-native";
import type {
  OnErrorEvent,
  OnSuccessEvent,
} from "../IOSTranslateTasksViewNativeComponent";

const isSupported =
  Platform.OS === "ios" && Number.parseFloat(String(Platform.Version)) >= 18.0;

export const useInternalTranslateTasks = () => {
  const [shouldTranslate, setShouldTranslate] = useState(false);
  const resolvePromiseRef = useRef<
    ((res: { translatedTexts: string[] }) => void) | null
  >(null);
  const rejectPromiseRef = useRef<((res: { error: string }) => void) | null>(
    null,
  );

  const texts = useRef<string[]>([]);
  const sourceLanguage = useRef<string | undefined>(undefined);
  const targetLanguage = useRef<string | undefined>(undefined);

  const startIOSTranslateTasks = (
    _texts: string[],
    _options?: {
      sourceLanguage?: string;
      targetLanguage?: string;
    },
  ): Promise<{ translatedTexts: string[] }> => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        throw new Error("startIOSTranslateTasks is not supported");
      }
      texts.current = _texts;
      sourceLanguage.current = _options?.sourceLanguage;
      targetLanguage.current = _options?.targetLanguage;
      setShouldTranslate(true);
      resolvePromiseRef.current = resolve;
      rejectPromiseRef.current = reject;
    });
  };

  const onSuccess = (res: NativeSyntheticEvent<OnSuccessEvent>) => {
    resolvePromiseRef.current?.({
      translatedTexts: res.nativeEvent.translatedTexts,
    });
    setShouldTranslate(false);
  };

  const onError = (res: NativeSyntheticEvent<OnErrorEvent>) => {
    rejectPromiseRef.current?.({
      error: res.nativeEvent.error,
    });
    setShouldTranslate(false);
  };

  return {
    shouldTranslate,
    startIOSTranslateTasks,
    onSuccess,
    onError,
    texts: texts.current,
    sourceLanguage: sourceLanguage.current,
    targetLanguage: targetLanguage.current,
    isSupported,
  };
};
