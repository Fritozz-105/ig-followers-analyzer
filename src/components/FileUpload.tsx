"use client";

import { useState } from "react";
import JSZip from "jszip";
import { InstagramDataItem, InstagramFollowingData, FileUploadProps } from "@/types";

export default function FileUpload({ onDataParsed }: FileUploadProps) {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseInstagramJSON = async (
    jsonContent: string,
    isFollowersFile: boolean = false
  ): Promise<string[]> => {
    try {
      const json = JSON.parse(jsonContent);

      let dataArray: InstagramDataItem[];

      if (isFollowersFile) {
        // Followers file is an array directly
        dataArray = json as InstagramDataItem[];
      } else {
        // Following file has relationships_following wrapper
        const followingData = json as InstagramFollowingData;
        dataArray = followingData.relationships_following;
      }

      // Check if dataArray exists and is an array
      if (!Array.isArray(dataArray)) {
        throw new Error("Invalid data format in JSON file");
      }

      const usernames = dataArray
        .flatMap((item) => item.string_list_data || [])
        .map((user) => user?.value)
        .filter((value): value is string => typeof value === "string" && value.length > 0);
      return usernames;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Invalid JSON format");
    }
  };

  const extractDataFromZip = async (
    file: File
  ): Promise<{ followers: string[]; following: string[] }> => {
    const zip = new JSZip();
    const zipData = await zip.loadAsync(file);

    // Look for the connections/followers_and_following folder structure
    const followersFile = zipData.file(/connections\/followers_and_following\/followers_1\.json$/i);
    const followingFile = zipData.file(/connections\/followers_and_following\/following\.json$/i);

    if (!followersFile || followersFile.length === 0) {
      throw new Error(
        "Could not find followers_1.json in connections/followers_and_following/ folder"
      );
    }

    if (!followingFile || followingFile.length === 0) {
      throw new Error(
        "Could not find following.json in connections/followers_and_following/ folder"
      );
    }

    // Extract the content from the files
    const followersContent = await followersFile[0].async("text");
    const followingContent = await followingFile[0].async("text");

    // Parse both files
    const followers = await parseInstagramJSON(followersContent, true);
    const following = await parseInstagramJSON(followingContent, false);

    return { followers, following };
  };

  const handleSubmit = async () => {
    if (!zipFile) {
      setError("Please select your Instagram data ZIP file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await extractDataFromZip(zipFile);
      onDataParsed(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred processing the ZIP file");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's a ZIP file
      if (file.type !== "application/zip" && !file.name.endsWith(".zip")) {
        setError("Please select a ZIP file containing your Instagram data");
        return;
      }
      setZipFile(file);
      setError(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Instagram Follower Analyzer</h2>
          <p className="text-gray-600 text-sm">
            Upload your Instagram data ZIP file to analyze your connections
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Instagram Data ZIP File
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {zipFile && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {zipFile.name} ({Math.round(zipFile.size / 1024)} KB)
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Upload the ZIP file you downloaded from Instagram containing your data export
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !zipFile}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center"
          >
            {loading ? (
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
                Extracting & Analyzing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analyze ZIP File
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
