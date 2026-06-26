import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Toolbar } from "./components/Toolbar";
import { Editor } from "./components/Editor";
import { Terminal } from "./components/Terminal";

const STORAGE_KEY = "compiler-code";

export default function App() {
  const [code, setCode] = useState(`console.log("Hello World");`);
  const [output, setOutput] = useState("");
  const [savedCode, setSavedCode] = useState(`console.log("Hello World");`);
  const [isDirty, setIsDirty] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef(null);

  const formatLogValue = (value) => {
    if (typeof value === "string") return value;
    if (typeof value === "undefined") return "undefined";

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  useEffect(() => {
    try {
      const savedCode = window.localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        setCode(savedCode);
        setSavedCode(savedCode);
        setIsDirty(false);
      }
    } catch {
      // Ignore storage access issues in browsers that block it.
    }
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
    setIsDirty(value !== savedCode);
  };

  const formatCode = () => {
    if (editorRef.current?.getAction) {
      const formatAction = editorRef.current.getAction(
        "editor.action.formatDocument",
      );
      formatAction?.run();
    }
  };

  const canSave = Boolean(code?.trim()) && isDirty;

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    setShowSaveModal(true);
  };

  const openCoffeeModal = () => {
    setShowCoffeeModal(true);
  };

  const closeCoffeeModal = () => {
    setShowCoffeeModal(false);
  };

  const saveAsFile = () => {
    const blob = new Blob([code], { type: "text/javascript" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.js";
    link.click();
    window.URL.revokeObjectURL(url);
    setOutput("Downloaded index.js");
    setShowSaveModal(false);
  };

  const saveToBrowserStorage = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
      setSavedCode(code);
      setIsDirty(false);
      setOutput("Saved to browser storage");
    } catch {
      setOutput("Could not save to browser storage");
    }

    setShowSaveModal(false);
  };

  const runCode = () => {
    const logs = [];
    const original = console.log;

    try {
      console.log = (...args) => {
        logs.push(args.map(formatLogValue).join(" "));
      };

      new Function(code)();

      setOutput(logs.join("\n") || "Code Executed");
    } catch (err) {
      setOutput(`❌ ${err?.message ?? String(err)}`);
    } finally {
      console.log = original;
    }
  };

  return (
    <div className="app">
      <Toolbar
        runCode={runCode}
        formatCode={formatCode}
        handleSave={handleSave}
        canSave={canSave}
        theme={theme}
        setTheme={setTheme}
        openinfo={openCoffeeModal}
      />
      <div className="workspace">
        <Editor
          code={code}
          setCode={handleEditorChange}
          editorRef={editorRef}
          theme={theme}
        />
        <Terminal output={output} />
      </div>

      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h3>Save options</h3>
            <p>Choose where to keep your code.</p>
            <div className="modal-actions">
              <button onClick={saveAsFile}>Save as file</button>
              <button onClick={saveToBrowserStorage}>Save in browser</button>
              <button
                className="secondary"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCoffeeModal && (
        <div
          className="modal-overlay"
          onClick={closeCoffeeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow:
                "0 20px 50px rgba(0,0,0,.15), 0 10px 20px rgba(0,0,0,.08)",
              animation: "fadeIn .2s ease",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg,#18181B,#27272A)",
                padding: "10px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "0px" }}>☕</div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                Buy Me a Coffee
              </h2>

              <p
                style={{
                  marginTop: "2px",
                  color: "#d4d4d8",
                  fontSize: "14px",
                }}
              >
                Support my work and keep creating amazing things.
              </p>
            </div>

            {/* Content */}
            <div
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              {/* Author Card */}
              <div
                style={{
                  border: "1px solid #ececec",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "16px" }}>
                  👨‍💻 Kuldeep Kumar
                </div>

                <div style={{ color: "#525252", fontSize: "14px" }}>
                  📧{" "}
                  <a
                    href="mailto:kuldeep@insonix.com"
                    style={{
                      color: "#2563eb",
                      textDecoration: "none",
                    }}
                  >
                    kuldeep@insonix.com
                  </a>
                </div>

                <div style={{ color: "#525252", fontSize: "14px" }}>
                  🌐{" "}
                  <a
                    href="https://kuldeepinfo.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#2563eb",
                      textDecoration: "none",
                    }}
                  >
                    kuldeepinfo.vercel.app
                  </a>
                </div>
              </div>

              {/* QR */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    padding: "18px",
                    border: "1px solid #eee",
                    borderRadius: "18px",
                    background: "#fff",
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img
                    src="./upipe-qr.png"
                    alt="Support QR"
                    style={{
                      width: "220px",
                      height: "220px",
                      objectFit: "contain",
                      borderRadius: "12px",
                    }}
                  />

                  <div
                    style={{
                      fontSize: "14px",
                      color: "#71717a",
                    }}
                  >
                    Scan QR to support ❤️
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={closeCoffeeModal}
                  style={{
                    border: "none",
                    background: "#18181B",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>


  );
}
