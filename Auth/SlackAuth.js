import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();


const discovery = {
  authorizationEndpoint: "https://slack.com/oauth/authorize",
  tokenEndpoint: "https://slack.com/api/oauth.access",
};

export const SlackAuth = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "4420006041748.4417748524994",
      clientSecret: "274da7e81129409b18d5002389a24093",
      scopes: ["email", "identify", "identity.avatar","identity.basic","profile"],
      redirectUri: makeRedirectUri({
        scheme: "https://auth.expo.io/@loju/ChatAir",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <TouchableOpacity
      onPress={() => {
        promptAsync();
      }}
      disabled={!request}
    >
      <View style={styles.provider}>
        <MaterialCommunityIcons size={32} name="slack" color="#ffff00" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    provider: {
      marginTop: 30,
      backgroundColor: "#000",
      width: 300,
      alignItems: "center",
      borderRadius:5
    }
  });
  