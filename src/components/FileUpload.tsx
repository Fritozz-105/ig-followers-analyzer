"use client";

import { useState } from "react";
import JSZip from "jszip";
import { InstagramDataItem, InstagramFollowingData, FileUploadProps } from "@/types";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
        dataArray = json as InstagramDataItem[];
      } else {
        const followingData = json as InstagramFollowingData;
        dataArray = followingData.relationships_following;
      }

      if (!Array.isArray(dataArray)) {
        throw new Error("Invalid data format in JSON file");
      }

      const usernames = dataArray
        .map((item) => {
          if (item.title && item.title.length > 0) {
            return item.title;
          }

          if (item.string_list_data && item.string_list_data.length > 0) {
            const firstEntry = item.string_list_data[0];
            if (firstEntry?.value) {
              return firstEntry.value;
            }
            if (firstEntry?.href) {
              const match = firstEntry.href.match(/instagram\.com\/(?:_u\/)?([^/?]+)/);
              return match ? match[1] : null;
            }
          }

          return null;
        })
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

    const followersContent = await followersFile[0].async("text");
    const followingContent = await followingFile[0].async("text");

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
      if (file.type !== "application/zip" && !file.name.endsWith(".zip")) {
        setError("Please select a ZIP file containing your Instagram data");
        return;
      }
      setZipFile(file);
      setError(null);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#111113] rounded-xl border border-white/[0.07] p-8">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-zinc-600 tracking-widest mb-3">
              INSTAGRAM DATA ZIP
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="w-full p-4 border border-dashed border-white/[0.08] rounded-lg bg-white/[0.02] text-zinc-500 text-xs font-mono hover:border-cyan-400/30 hover:bg-white/[0.04] focus:outline-none transition-all cursor-pointer file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:font-semibold file:bg-white/5 file:text-zinc-400 hover:file:bg-cyan-400/10 hover:file:text-cyan-400 file:cursor-pointer"
              />
              {zipFile && (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-cyan-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  {zipFile.name} · {Math.round(zipFile.size / 1024)} KB
                </div>
              )}
            </div>
            <p className="text-xs text-zinc-700 mt-2.5 font-mono leading-relaxed">
              Upload the ZIP exported from Instagram → Account Center → Export your information
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/5 border border-red-500/15 text-red-400 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-xs font-mono leading-relaxed">{error}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !zipFile}
            className="w-full bg-cyan-400 text-black py-3 px-6 rounded-lg font-bold text-xs tracking-widest hover:bg-cyan-300 transition-colors disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                ANALYZING...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                ANALYZE DATA
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
