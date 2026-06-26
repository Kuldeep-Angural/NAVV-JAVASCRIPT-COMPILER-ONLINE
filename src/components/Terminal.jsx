export const Terminal = ({ output }) => {
  return (
    <div className="terminal">
      <div className="title">output</div>
      <pre>{output}</pre>
    </div>
  );
};
