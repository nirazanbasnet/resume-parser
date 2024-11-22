import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Details from "./pages/Details";
import { extractData } from "./utils/extractData";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setLoading(true);

    extractData(uploadedFile).then((extractedData) => {
      console.log(extractedData);
      setData(extractedData);
      setLoading(false);
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-center text-3xl font-bold">Resume Parser</h1>
      {!file && <FileUpload onFileUpload={handleFileUpload} />}
      {loading && <p className="text-center text-gray-500">Extracting data...</p>}
      {data && <Details data={data} />}
    </div>
  );
}

export default App;
