import { PaperProvider, Appbar } from "react-native-paper";
import Home from "./pages/Home";

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="스펨이" />
        <Appbar.Action icon="information" onPress={() => {}} />
      </Appbar.Header>

      <Home />
    </PaperProvider>
  );
}
