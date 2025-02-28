import { useRef, useState } from "react";
import { type NativeSyntheticEvent, Platform } from "react-native";
import type {
  OnErrorEvent,
  OnSuccessEvent,
} from "../IOSTranslateTasksViewNativeComponent";

export const useInternalTranslateTasks = () => {
  const [shouldTranslate, setShouldTranslate] = useState(false);
  const [texts, setTexts] = useState<string[]>([]);
  const resolvePromiseRef = useRef<
    ((res: { translatedTexts: string[] }) => void) | null
  >(null);
  const rejectPromiseRef = useRef<((res: { error: string }) => void) | null>(
    null,
  );
  const [sourceLanguage, setSourceLanguage] = useState<string | undefined>(
    undefined,
  );
  const [targetLanguage, setTargetLanguage] = useState<string | undefined>(
    undefined,
  );

  const isSupported =
    Platform.OS === "ios" &&
    Number.parseFloat(String(Platform.Version)) >= 18.0;

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
      setTexts(_texts);
      setSourceLanguage(_options?.sourceLanguage);
      setTargetLanguage(_options?.targetLanguage);
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
    texts,
    sourceLanguage,
    targetLanguage,
    isSupported,
  };
};
