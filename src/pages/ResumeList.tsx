import React from 'react';
import { Link } from 'react-router-dom';
import { getResumeList } from '../utils/fileStorage';

export default function ResumeList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [resumes, setResumes] = React.useState(getResumeList());

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-6">
                <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
            </div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Resume Library</h1>
                <Link
                    to="/"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Upload New Resume
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="min-w-full divide-y divide-gray-200">
                    {resumes.length > 0 ? (
                        <div className="divide-y divide-gray-200 bg-white">
                            {resumes.map((resume) => (
                                <Link
                                    key={resume.id}
                                    to={`/resume/${resume.id}`}
                                    className="block hover:bg-gray-50"
                                >
                                    <div className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            className="h-8 w-8 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h2 className="text-lg font-medium text-gray-900">
                                                            {resume.fileName}
                                                        </h2>
                                                        <div className="mt-1 flex items-center text-sm text-gray-500">
                                                            <span>{formatDate(resume.uploadDate)}</span>
                                                            <span className="mx-2">•</span>
                                                            <span>{formatFileSize(resume.fileSize)}</span>
                                                            <span className="mx-2">•</span>
                                                            <span className="uppercase">{resume.fileType.split('/')[1]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by uploading a resume
                            </p>
                            <div className="mt-6">
                                <Link
                                    to="/"
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                                >
                                    Upload Resume
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}