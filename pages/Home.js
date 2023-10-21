import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Chip } from "react-native-paper";
import axios from "axios";
import translate from "translate";

translate.engine = "google";

export default function Home() {
  const [text, setText] = useState(
    "Please come visit our site to claim your rewards"
  );
  const [result, setResult] = useState();
  const [language, setLanguage] = useState("English");

  let debounceTimeout;

  const Classify = (text) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      axios
        .get(
          `http://spammy-9stp.onrender.com/detect/${encodeURI(
            await translate(text, "en")
          )}`
        )
        .then((res) => {
          setResult(res.data);
        })
        .catch((err) => {});

        console.log(result)
    }, 1000);
  };

  useEffect(() => {
    Classify(text);
  }, [language]);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Chip
          icon="alphabetical"
          disabled={language === "English"}
          onPress={() => {
            setLanguage("English");
            setText("Please come visit our site to claim your rewards");
          }}
        >
          English
        </Chip>
        <Chip
          icon="alphabetical"
          disabled={language === "Korean"}
          onPress={() => {
            setLanguage("Korean");
            setText(
              "이번 주만 10% 할인! 사이트에서 저렴한 iPhone을 구매하세요!"
            );
          }}
        >
          한국어
        </Chip>
      </View>

      <TextInput
        multiline
        numberOfLines={10}
        textAlign="auto"
        mode="outlined"
        style={styles.textInput}
        onChangeText={(inputText) => {
          setText(inputText);
          Classify(inputText);
        }}
        value={text}
      ></TextInput>

      <Text>{result}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  flex: {
    flexDirection: "row",
    margin: 10,
    gap: 5,
  },
});
