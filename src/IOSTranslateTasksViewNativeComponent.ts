import {
  type CodegenTypes,
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from "react-native";

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
  onSuccess?: CodegenTypes.DirectEventHandler<OnSuccessEvent>;
  onError?: CodegenTypes.DirectEventHandler<OnErrorEvent>;
}

export default codegenNativeComponent<IOSTranslateTasksProps>(
  "IOSTranslateTasksView",
) as HostComponent<IOSTranslateTasksProps>;
