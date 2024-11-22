interface ResumeMetadata {
    id: string;
    fileName: string;
    uploadDate: string;
    fileType: string;
    fileSize: number;
    analysis: any; // The analyzed data from Gemini
  }
  
  export const saveResume = async (file: File, analysis: any): Promise<string> => {
    try {
      // Generate unique ID
      const id = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create metadata
      const metadata: ResumeMetadata = {
        id,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size,
        analysis
      };
  
      // Save metadata to localStorage
      const existingResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      existingResumes.push(metadata);
      localStorage.setItem('resumes', JSON.stringify(existingResumes));
  
      // Save file to IndexedDB (since localStorage has size limitations)
      await saveFileToIndexedDB(id, file);
  
      return id;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  };
  
  export const getResumeList = (): ResumeMetadata[] => {
    try {
      return JSON.parse(localStorage.getItem('resumes') || '[]');
    } catch (error) {
      console.error('Error getting resume list:', error);
      return [];
    }
  };
  
  export const getResumeById = async (id: string): Promise<{ metadata: ResumeMetadata; file: File } | null> => {
    try {
      const resumes = getResumeList();
      const metadata = resumes.find(resume => resume.id === id);
      if (!metadata) return null;
  
      const file = await getFileFromIndexedDB(id);
      return { metadata, file };
    } catch (error) {
      console.error('Error getting resume:', error);
      return null;
    }
  };
  
  // IndexedDB utilities
  const DB_NAME = 'ResumeStorage';
  const STORE_NAME = 'files';
  
  async function saveFileToIndexedDB(id: string, file: File): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put(file, id);
  }
  
  async function getFileFromIndexedDB(id: string): Promise<File> {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    return new Promise<File>((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result as File);
      request.onerror = () => reject(new Error('Failed to retrieve file from IndexedDB'));
    });
  }
  
  function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
  
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(STORE_NAME);
      };
    });
  }