"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOpenIcon } from "@radix-ui/react-icons";

const TMPF_API_BASE = "https://api.tmpf.me";
// const TMPF_API_BASE = "http://localhost:5001";

const axiosInstance = axios.create({
  baseURL: TMPF_API_BASE,
});

export async function downloadFile(fileUrl: string, filename: string) {
  await axiosInstance
    .get(fileUrl, { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      return error;
    });

  return;
}

export async function uploadFile(file: File[]) {
  const formData = new FormData();
  file.forEach((f) => {
    formData.append("file", f);
  });

  return await axiosInstance
    .post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export default function TmpfUI() {
  const [file, setFile] = useState<File[] | null>(null);
  const [uploaded, setUploaded] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const response = await uploadFile(file);
      setUploaded(response);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="uploadfiles">Upload Files</Label>
        <div className="flex w-full max-w-md items-center space-x-2">
          <Input
            id="uploadfiles"
            type="file"
            onChange={handleFileChange}
            multiple={true}
          />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>

      {loading && <p>Uploading...</p>}
      {uploaded && (
        <>
          <div className="flex flex-row items-center space-x-4">
            <p>Message: {uploaded.message}</p>
            <Button
              onClick={() => {
                for (let i = 0; i < uploaded.files.length; i++) {
                  downloadFile(
                    TMPF_API_BASE +
                      "/dl/" +
                      uploaded.folderId +
                      "/" +
                      uploaded.files[i].fileName,
                    uploaded.files[i].fileName
                  );
                }
              }}
            >
              Download ALL
            </Button>
          </div>

          <ul>
            {uploaded.files.map((f: any) => (
              <li key={f.fileName}>
                <a
                  className="flex items-center space-x-2 hover:underline"
                  href={
                    TMPF_API_BASE +
                    "/view/" +
                    uploaded.folderId +
                    "/" +
                    f.fileName
                  }
                  target="_blank"
                >
                  <span>{f.fileName}</span>
                  <EyeOpenIcon className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
