"use client";

import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import Results from "@/components/Results";
import InstructionsModal from "@/components/InstructionsModal";
import { howItWorksSteps } from "@/data/howItWorks";

export default function Home() {
  const [data, setData] = useState<{ followers: string[]; following: string[] } | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("ig-analyzer-visited");
    if (!hasVisited) {
      setShowModal(true);
    }
  }, []);

  const handleDataParsed = (parsedData: { followers: string[]; following: string[] }) => {
    setData(parsedData);
  };

  const handleReset = () => {
    setData(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    localStorage.setItem("ig-analyzer-visited", "true");
  };

  const handleViewDetailedInstructions = () => {
    setShowModal(true);
  };

  return (
    <>
      <InstructionsModal isOpen={showModal} onClose={handleModalClose} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          {!data ? (
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  Zooch IG Follower
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Analyzer
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover who follows you back, find mutual connections, and get insights into your
                  Instagram network
                </p>
              </div>
              <FileUpload onDataParsed={handleDataParsed} />
              <div className="mt-12 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">How it works</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {howItWorksSteps.map((step) => (
                    <div key={step.id} className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-purple-600 font-bold text-lg">{step.id}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={handleViewDetailedInstructions}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    View Detailed Instructions
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Results followers={data.followers} following={data.following} onReset={handleReset} />
          )}
        </div>
      </div>
    </>
  );
}
