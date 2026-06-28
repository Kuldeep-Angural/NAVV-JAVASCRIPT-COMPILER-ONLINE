import { validateSelectedFiles } from './fileUtils';

describe('validateSelectedFiles', () => {
  it('accepts up to five JavaScript files', () => {
    const files = Array.from({ length: 5 }, (_, index) => ({
      name: `file${index + 1}.js`,
    }));

    expect(() => validateSelectedFiles(files)).not.toThrow();
  });

  it('rejects more than five files', () => {
    const files = Array.from({ length: 6 }, (_, index) => ({
      name: `file${index + 1}.js`,
    }));

    expect(() => validateSelectedFiles(files)).toThrow('Please select up to 5 .js files.');
  });

  it('rejects non-JavaScript files', () => {
    const files = [{ name: 'script.txt' }];

    expect(() => validateSelectedFiles(files)).toThrow('Only .js files are allowed.');
  });
});
