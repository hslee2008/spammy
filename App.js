import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";

export default function App() {
  const [text, setText] = useState(
    "Please come visit our site to claim your rewards"
  );
  const [result, setResult] = useState("please change the input to get result");

  let debounceTimeout;

  const Classify = (text) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      axios
        .get(`http://spammy-9stp.onrender.com/detect/${encodeURI(text)}`)
        .then((res) => {
          setResult(res.data);
        });
    }, 1000); // Adjust the delay time as needed (in milliseconds)
  };

  return (
    <View style={styles.container}>
      <TextInput
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
});
