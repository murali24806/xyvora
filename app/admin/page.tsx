'use client';

import { useState } from 'react';
import { UploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
// Native HTML tags used instead of components

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert("Please upload an image and enter a title.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create a Server Action or API route to save to the database
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, imageUrl })
      });

      if (res.ok) {
        alert("Portfolio item added successfully!");
        setTitle('');
        setImageUrl('');
        // Refresh the page or data
      } else {
        alert("Failed to add portfolio item.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio items here.</p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Add New Portfolio Item</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Image Upload</label>
              {imageUrl ? (
                <div className="relative aspect-video w-full max-w-md rounded-md overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Uploaded preview" className="object-cover w-full h-full" />
                  <button 
                    type="button" 
                    className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded text-sm"
                    onClick={() => setImageUrl('')}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <UploadDropzone<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    if (res?.[0]) {
                      setImageUrl(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Project Title / Alt Text</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. FinTech Platform Rebrand"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !imageUrl}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {isSubmitting ? 'Saving...' : 'Save Portfolio Item'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
