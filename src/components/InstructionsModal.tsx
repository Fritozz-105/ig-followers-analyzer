"use client";

import { useState, useEffect } from "react";
import { modalContent } from "@/data/modalContent";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setCountdown(2);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-slate-850/50 backdrop-blur-sm bg-opacity-50 transition-opacity"></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{modalContent.header.title}</h2>
              <p className="text-gray-600">{modalContent.header.subtitle}</p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold text-green-800">
                  {modalContent.privacyNotice.title}
                </span>
              </div>
              <p className="text-green-700 text-sm">{modalContent.privacyNotice.description}</p>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">{modalContent.instructions.title}</h3>

              <div className="space-y-4">
                {modalContent.instructions.steps.map((step) => (
                  <div key={step.id} className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">{step.id}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                        {step.codeSnippets && (
                          <>
                            {" "}
                            {step.codeSnippets.map((snippet, index) => (
                              <span key={snippet}>
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                  {snippet}
                                </code>
                                {index < step.codeSnippets!.length - 1 && " and "}
                              </span>
                            ))}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-amber-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold text-amber-800">{modalContent.warning.title}</span>
              </div>
              <p className="text-amber-700 text-sm">{modalContent.warning.description}</p>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={onClose}
                disabled={!canClose}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center"
              >
                {!canClose ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {modalContent.buttons.waiting} ({countdown}s)
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {modalContent.buttons.ready}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
