import { fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useRef } from 'react';
import App from './App';

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ value, onChange, onMount }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (onMount) {
        onMount({
          getAction: () => ({
            run: () => {
              const formatted = value
                .replace(/function\s+(\w+)\s*\(\)\s*\{/, 'function $1() {')
                .replace(/return\s+"hi"/, 'return "hi";');

              if (textareaRef.current) {
                textareaRef.current.value = formatted;
              }
              onChange(formatted);
            },
          }),
        });
      }
    }, [onMount, onChange, value]);

    return (
      <textarea
        aria-label="editor"
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  },
}));

test('shows readable output when code logs an object', () => {
  render(<App />);

  const editor = screen.getByLabelText(/editor/i);
  fireEvent.change(editor, { target: { value: 'console.log({ name: "Ada" })' } });
  fireEvent.click(screen.getByRole('button', { name: /run/i }));

  expect(screen.getByText(/"name": "Ada"/i)).toBeInTheDocument();
});

test('formats code when the format button is clicked', () => {
  render(<App />);

  const editor = screen.getByLabelText(/editor/i);
  fireEvent.change(editor, { target: { value: 'function greet(){return "hi"}' } });
  fireEvent.click(screen.getByRole('button', { name: /format/i }));

  expect(editor.value).toContain('function greet() {');
  expect(editor.value).toContain('return "hi";');
});
