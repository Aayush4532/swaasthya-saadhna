"use client";
import React, { useState } from "react";
const PrescriptionUploadPage = () => {
  // const [imagePreview, setImagePreview] = useState(null);
  // const [file, setFile] = useState(null);
  // const [manualInput, setManualInput] = useState("");
  // const [medicineList, setMedicineList] = useState([]);
  // const [selectedMedicine, setSelectedMedicine] = useState(null);

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile && selectedFile.type.startsWith("image/")) {
  //     setFile(selectedFile);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(selectedFile);
  //   } else {
  //     setFile(null);
  //     setImagePreview(null);
  //   }
  // };

  // const extractMedicines = (text) => {
  //   const dummyMeds = text
  //     .split(/,|\n|\./)
  //     .map((line) => line.trim())
  //     .filter((line) => line.length > 0);
  //   return dummyMeds;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!file && !manualInput.trim()) {
  //     alert("Please upload an image or type the prescription.");
  //     return;
  //   }

  //   let extracted = extractMedicines(manualInput || "Paracetamol 500mg, Amoxicillin 250mg");
  //   setMedicineList(extracted);

  //   if (extracted.length === 1) {
  //     setSelectedMedicine(extracted[0]);
  //     console.log("Search medicine:", extracted[0]);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="max-w-xl w-full rounded-2xl bg-white shadow-2xl p-10 text-center border border-indigo-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-5 drop-shadow">
          Help Us Improve Access to Medicines
        </h1>

        <p className="text-gray-800 leading-relaxed mb-6 text-lg">
          We haven’t yet discovered a reliable way to fetch real‑time government
          medicine data from sources such as <span className="font-semibold text-indigo-700">dispensaries</span>, <span className="font-semibold text-indigo-700">Mohalla Clinics</span>,
          <span className="font-semibold text-indigo-700"> Jan Aushadhi Kendras</span>, or other <span className="font-semibold text-indigo-700">generic‑medicine organizations</span>.
          <br />
          If you have insights on how to obtain or integrate this data, please share
          your knowledge through the form below.
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdWqijCNRsSjdFisSQQe2cxX5QkdyMkgftA4AgojZ_wV1GGlg/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:scale-105 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
        >
          Contribute to Better Healthcare in India
        </a>
      </div>
    </div>
  );
};

export default PrescriptionUploadPage;