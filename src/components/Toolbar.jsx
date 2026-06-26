export const Toolbar = ({
  runCode,
  formatCode,
  handleSave,
  canSave,
  theme,
  setTheme,
  openinfo,
}) => {
  return (
    <div
      className="toolbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#111827",
        alignItems: "center",
        height: "7vh",
        borderBottom: "1px solid #333",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="./logo.png"
          alt="JavaScript Logo"
          style={{
            width: "60px",
            height: "55px",
            objectFit: "contain",
          }}
        />

        <span
          style={{
            fontSize: "18px",
            fontWeight: 600,
            fontFamily: "monospace",
            color: "#fff",
          }}
        >
          NavvJS
        </span>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <button onClick={formatCode} title="Format Code">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-braces-corner-icon lucide-file-braces-corner"
          >
            <path d="M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6" />
            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
            <path d="M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1" />
            <path d="M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1" />
          </svg>
        </button>

        <select
          hidden
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: "6px",
            border: "1px solid #4b5563",
            background: "#111827",
            color: "white",
          }}
        >
          <option value="vs-dark">VS Dark</option>
          <option value="vs">VS Light</option>
          <option value="hc-black">High Contrast</option>
          <option value="hc-light">High Contrast Light</option>
        </select>

        <button onClick={handleSave} disabled={!canSave} title="Save Code">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-save-icon lucide-save"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
          </svg>
        </button>

        <button onClick={runCode} title="Run Code">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-play-icon lucide-play"
          >
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </svg>
        </button>
        <button onClick={openinfo} title="Information">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-info-icon lucide-info"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </button>
      </div>
    </div>
  );
};
