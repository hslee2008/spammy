import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import classifier from './utils/natural'

export default function App() {
  const Classify = (text) => {
    const result = classifier.classify(text)
    return result
  }

  return (
    <View style={styles.container}>
      <TextInput></TextInput>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
