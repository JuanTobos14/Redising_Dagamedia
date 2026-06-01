const STORAGE_KEY = 'dagamedia_contact_submissions';

export function saveContactSubmission(submission) {
  const previousSubmissions = getContactSubmissions();

  const newSubmission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...submission,
  };

  const updatedSubmissions = [newSubmission, ...previousSubmissions];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubmissions));

  return newSubmission;
}

export function getContactSubmissions() {
  try {
    const storedSubmissions = localStorage.getItem(STORAGE_KEY);

    if (!storedSubmissions) return [];

    return JSON.parse(storedSubmissions);
  } catch (error) {
    console.error('Error reading contact submissions:', error);
    return [];
  }
}