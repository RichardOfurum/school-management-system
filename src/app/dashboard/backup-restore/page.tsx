'use client';

import { backupDatabase, fullRestoreDatabase, partialRestoreDatabase } from '@/actions/database';
import { useState, useRef } from 'react';

export default function BackupRestorePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isPartialRestoring, setIsPartialRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoreMode, setRestoreMode] = useState<'full' | 'partial' | null>(null);

  const handleBackup = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const data = await backupDatabase();
      
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `school-database-backup-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccess('Backup created and downloaded successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestoreClick = (mode: 'full' | 'partial') => {
    setRestoreMode(mode);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !restoreMode) return;

    if (restoreMode === 'full') {
      setIsRestoring(true);
    } else {
      setIsPartialRestoring(true);
    }
    
    setError(null);
    setSuccess(null);

    try {
      const fileContent = await file.text();
      let result;
      
      if (restoreMode === 'full') {
        result = await fullRestoreDatabase(fileContent);
      } else {
        result = await partialRestoreDatabase(fileContent);
      }
      
      if (result.success) {
        setSuccess(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${restoreMode}ly restore database`);
    } finally {
      setIsRestoring(false);
      setIsPartialRestoring(false);
      setRestoreMode(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Database Backup & Restore</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Backup Database</h2>
          <p className="mb-4">
            Create a complete backup of the database. This will download all data as a JSON file.
          </p>
          <button
            onClick={handleBackup}
            disabled={isLoading || isRestoring || isPartialRestoring}
            className={`px-4 py-2 rounded-md text-white ${
              isLoading || isRestoring || isPartialRestoring 
                ? 'bg-gray-400' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Creating Backup...' : 'Backup Database'}
          </button>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Restore Database</h2>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Full Restore</h3>
              <p className="mb-2 text-sm text-gray-600">
                This will delete ALL existing data and replace it with the backup data.
              </p>
              <button
                onClick={() => handleRestoreClick('full')}
                disabled={isLoading || isRestoring || isPartialRestoring}
                className={`px-4 py-2 rounded-md text-white ${
                  isLoading || isRestoring || isPartialRestoring 
                    ? 'bg-gray-400' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isRestoring ? 'Restoring...' : 'Full Restore (Overwrite All)'}
              </button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Partial Restore</h3>
              <p className="mb-2 text-sm text-gray-600">
                This will add new data from the backup but keep existing records.
              </p>
              <button
                onClick={() => handleRestoreClick('partial')}
                disabled={isLoading || isRestoring || isPartialRestoring}
                className={`px-4 py-2 rounded-md text-white ${
                  isLoading || isRestoring || isPartialRestoring 
                    ? 'bg-gray-400' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isPartialRestoring ? 'Restoring...' : 'Partial Restore (Keep Existing)'}
              </button>
            </div>
          </div>
        </section>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        {(isLoading || isRestoring || isPartialRestoring) && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
            {isLoading 
              ? 'Preparing your backup file...' 
              : isRestoring 
                ? 'Performing full restore...' 
                : 'Performing partial restore...'}
          </div>
        )}
      </div>
    </div>
  );
}