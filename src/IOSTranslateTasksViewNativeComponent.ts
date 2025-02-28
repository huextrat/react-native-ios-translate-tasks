import type { ViewProps } from "react-native";
import type { DirectEventHandler } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export interface OnSuccessEvent {
  translatedTexts: string[];
}

export interface OnErrorEvent {
  error: string;
}

interface IOSTranslateTasksProps extends ViewProps {
  texts?: string[];
  shouldTranslate?: boolean;
  sourceLanguage?: string;
  targetLanguage?: string;
  onSuccess?: DirectEventHandler<OnSuccessEvent>;
  onError?: DirectEventHandler<OnErrorEvent>;
}

export default codegenNativeComponent<IOSTranslateTasksProps>(
  "IOSTranslateTasksView",
);
