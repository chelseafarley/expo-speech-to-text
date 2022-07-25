import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

/*
expo init expo-speech-to-text
cd expo-speech-to-text
expo install @react-native-voice/voice expo-dev-client

Add the following to your app.json, inside the expo section:
"plugins": [
  [
    "@react-native-voice/voice",
    {
      "microphonePermission": "Allow Voice to Text Tutorial to access the microphone",
      "speechRecognitionPermission": "Allow Voice to Text Tutorial to securely recognize user speech"
    }
  ]
]

If you don't have eas installed then install using the following command:
npm install -g eas-cli

eas login
eas build:configure

Build for local development on iOS or Android:
eas build -p ios --profile development --local
OR
eas build -p android --profile development --local

May need to install the following to build locally (which allows debugging)
npm install -g yarn
brew install fastlane

After building install on your device:
For iOS (simulator): https://docs.expo.dev/build-reference/simulators/
For Android: https://docs.expo.dev/build-reference/apk/

Run on installed app:
expo start --dev-client

*/

export default function App() {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("en-NZ");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    <View style={styles.container}>
      {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => <Text key={index}>{result}</Text>)}
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
