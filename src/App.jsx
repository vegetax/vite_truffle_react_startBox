import { useState } from "react";
import Web3login from "./compononet/Web3login";
import NFTERC721 from "./compononet/NFTERC721";

function App() {
  return (
    <div>
      <Web3login></Web3login>
      <NFTERC721></NFTERC721>
    </div>
  );
}

export default App;
