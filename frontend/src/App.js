import { Button } from "@chakra-ui/react";
import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Homepage}></Route>
      <Route path="/chats" component={ChatPage}></Route>
    </div>
  );
}

export default App;
