import { useState } from "react";
import Logo from "./assets/compressed-file.png";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [compMsg, setCompMsg] = useState("");
  const [path1, setPath1] = useState("");
  const [path2, setPath2] = useState("");

  async function compress() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setCompMsg(await invoke("compress", { path1,path2 }));
  }

  return (
    <div className="container">
      <h1>This is Simple File Compressor!</h1>

      <div className="row">
          <img src={Logo} className="logo comp" alt="Comp logo" />
      </div>

      <p>Enter the source file path and give a target file name.</p>

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            compress();
          }}
        >
          <input
            id="greet-input1"
            onChange={(e) => setPath1(e.currentTarget.value)}
            placeholder="Enter a source path..."
          />
          <input
            id="greet-input2"
            onChange={(e) => setPath2(e.currentTarget.value)}
            placeholder="Enter a output path..."
          />
          <button type="submit" className="button">Compress!</button>
        </form>
      </div>

      <p>{compMsg}</p>
    </div>
  );
}

export default App;
