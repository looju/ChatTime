import * as React from "react";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { TouchableOpacity, View, StyleSheet,Image } from "react-native";
import { SlackContextProvider } from "../Context/SlackContext";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://slack.com/oauth/authorize",
  tokenEndpoint: "https://slack.com/api/oauth.access",
};

export const SlackAuth = () => {
  const [slackInfo, setSlackInfo] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "4420006041748.4417748524994",
      clientSecret: "274da7e81129409b18d5002389a24093",
      scopes: [
        "email",
        "identify",
        "identity.avatar",
        "identity.basic",
        "profile",
      ],
      redirectUri: makeRedirectUri({
        scheme: "https://auth.expo.io/@loju/ChatAir",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: "Bearer" + accessToken },
      }
    );

    userInfoResponse.json().then((data) => {
      setSlackInfo(data);
      navigation.navigate("Chat");
    });
  } // fetches the user authenticated id if there is an access token

  return (
    <SlackContextProvider slackInfo={slackInfo}>
      <TouchableOpacity
        onPress={() => {
         accessToken?getUserData:promptAsync();
        }}
        disabled={!request}
      >
        <View style={styles.provider}>
        <Image source={require('../assets/slack.jpg')} style={{width:80, height:40, left:110, backgroundColor:"#000"}}/>
        </View>
      </TouchableOpacity>
    </SlackContextProvider>
  );
};

const styles = StyleSheet.create({
  provider: {
    marginTop: 30,
    backgroundColor: "#000",
    width: 300,
    borderRadius: 15,
  },
});
