import {
  createNativeClipboardService,
  createNativeFileService,
  createNativeNotificationService,
  createNativeMediaService,
} from "@sendbird/uikit-react-native";

import * as Clipboard from "expo-clipboard";
import { Camera, CameraType } from "expo-camera";
import RNFBMessaging from "@react-native-firebase/messaging";
import { Video, AVPlaybackStatus } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "react-native-permissions";
import * as CreateThumbnail from "react-native-create-thumbnail";

const clipBoardService = createNativeClipboardService(Clipboard);
const fileService = createNativeFileService({
  fsModule: FileSystem,
  permissionModule: Permissions,
  imagePickerModule: ImagePicker,
  documentPickerModule: DocumentPicker,
  mediaLibraryModule: Camera,
});
const notificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
});
const mediaService = createNativeMediaService({
  VideoComponent: Video,
  permissionModule: Permissions,
  thumbnailModule: CreateThumbnail,
});
