import toast from '../services/toastService';

const MAX_FILES = 5;
const ALLOWED_EXTENSION = '.js';

export const validateSelectedFiles = (files, currentOpenCount = 0) => {
  if (!files?.length) {
    toast.error('Please select at least one file.');
    throw new Error('Please select at least one file.');
  }

  if (files.length + currentOpenCount > MAX_FILES) {
    toast.error('Please select up to 5 .js files.');
    throw new Error(`Please select up to ${MAX_FILES} .js files total.`);
  }

  const invalidFiles = files.filter((file) => {
    const fileName = file?.name ?? '';
    return !fileName.toLowerCase().endsWith(ALLOWED_EXTENSION);
  });

  if (invalidFiles.length) {
    toast.error('Only .js files are allowed.');
    throw new Error('Only .js files are allowed.');
  }

  return files;
};

export const readFilesAsText = async (files) => {
  const validatedFiles = validateSelectedFiles(files);

  const contents = await Promise.all(validatedFiles.map((file) => file.text()));

  return contents;
};
