
'use client';

import { backupDatabase } from '@/actions/databasebackup';
// import { backupDatabase } from '@/actions/backup';
import { useState } from 'react';

export default function BackupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackup = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await backupDatabase();
      
      // Create a blob with the JSON data
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `school-database-backup-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Database Backup</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          Click the button below to create a complete backup of the database. 
          This will download all data as a JSON file.
        </p>
        
        <button
          onClick={handleBackup}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Creating Backup...' : 'Backup Database'}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}
        
        {!error && isLoading && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
            Preparing your backup file...
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';

// import { backupDatabase, restoreDatabase } from '@/actions/backup';
// import { useState, useRef } from 'react';

// export default function BackupPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRestoring, setIsRestoring] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleBackup = async () => {
//     setIsLoading(true);
//     setError(null);
//     setSuccess(null);
    
//     try {
//       const data = await backupDatabase();
      
//       const blob = new Blob([data], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
      
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `school-database-backup-${new Date().toISOString()}.json`;
//       document.body.appendChild(a);
//       a.click();
      
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);

//       setSuccess('Backup created and downloaded successfully');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRestoreClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsRestoring(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const fileContent = await file.text();
//       const result = await restoreDatabase(fileContent);
      
//       if (result.success) {
//         setSuccess('Database restored successfully!');
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to restore database');
//     } finally {
//       setIsRestoring(false);
//       // Reset file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Database Backup & Restore</h1>
      
//       <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
//         <section>
//           <h2 className="text-xl font-semibold mb-4">Backup Database</h2>
//           <p className="mb-4">
//             Create a complete backup of the database. This will download all data as a JSON file.
//           </p>
//           <button
//             onClick={handleBackup}
//             disabled={isLoading || isRestoring}
//             className={`px-4 py-2 rounded-md text-white ${isLoading || isRestoring ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//           >
//             {isLoading ? 'Creating Backup...' : 'Backup Database'}
//           </button>
//         </section>

//         <section>
//           <h2 className="text-xl font-semibold mb-4">Restore Database</h2>
//           <p className="mb-4">
//             Restore the database from a previously created backup file. This will overwrite all existing data.
//           </p>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept=".json"
//             className="hidden"
//           />
//           <button
//             onClick={handleRestoreClick}
//             disabled={isLoading || isRestoring}
//             className={`px-4 py-2 rounded-md text-white ${isLoading || isRestoring ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} ml-2`}
//           >
//             {isRestoring ? 'Restoring...' : 'Restore Database'}
//           </button>
//           <p className="mt-2 text-sm text-gray-600">
//             Note: Restoring will completely replace all current data with the backup data.
//           </p>
//         </section>

//         {error && (
//           <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
//             Error: {error}
//           </div>
//         )}
        
//         {success && (
//           <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
//             {success}
//           </div>
//         )}

//         {(isLoading || isRestoring) && (
//           <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
//             {isLoading ? 'Preparing your backup file...' : 'Restoring database...'}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
