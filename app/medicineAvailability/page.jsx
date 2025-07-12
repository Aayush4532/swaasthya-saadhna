"use client";

import React, { useState } from "react";

const PrescriptionUploadPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [manualInput, setManualInput] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };

  const extractMedicines = (text) => {
    // Dummy extraction for now; replace with real logic or AI output
    const dummyMeds = text
      .split(/,|\n|\./)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    return dummyMeds;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file && !manualInput.trim()) {
      alert("Please upload an image or type the prescription.");
      return;
    }

    let extracted = extractMedicines(manualInput || "Paracetamol 500mg, Amoxicillin 250mg");
    setMedicineList(extracted);

    if (extracted.length === 1) {
      setSelectedMedicine(extracted[0]);
      // Trigger API search directly here
      console.log("Search medicine:", extracted[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Upload Prescription
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Handwritten Medicine / Prescription (Image)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-lg shadow-md max-h-64 object-contain"
              />
            )}
          </div>

          <div className="text-center text-gray-500 dark:text-gray-400">OR</div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Type Prescription Manually
            </label>
            <textarea
              rows={5}
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="e.g. Paracetamol 500mg"
              className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
          >
            Submit
          </button>
        </form>

        {medicineList.length > 0 && (
          <div className="pt-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Medicines Detected:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {medicineList.map((med, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMedicine(med)}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-white"
                >
                  {med}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedMedicine && (
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
            <p className="text-indigo-800 dark:text-indigo-200">
              You selected: <strong>{selectedMedicine}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUploadPage;