import { useState } from "react";
import Web3login from "./compononet/Web3login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Web3login></Web3login>
    </div>
  );
}

export default App;
