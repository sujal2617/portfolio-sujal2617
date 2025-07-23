import React, { useState } from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';

// This component shows a project modal when "Details" is clicked
const ProjectCardModal = ({ title, description, link }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Tracks whether the modal is open

    return (
        <>
            {/* Button to open the modal */}
            <button
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors duration-200"
                onClick={() => setIsModalOpen(true)}
            >
                <span className="text-sm">Details</span>
                <ArrowRight className="w-4 h-4" />
            </button>

            {/* Modal overlay and content */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
                    onClick={() => setIsModalOpen(false)} // Close modal when background is clicked
                >
                    {/* Modal box */}
                    <div
                        className="relative w-full max-w-md rounded-lg bg-gray-900 p-6 text-white shadow-lg animate-slide-up sm:p-8"
                        onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
                    >
                        {/* Button to close modal (eye icon) */}
                        <button
                            className="absolute top-4 right-4 rounded-md p-2 hover:bg-gray-800 transition-colors duration-200"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <Eye className="h-5 w-5" />
                        </button>

                        {/* Modal title and description */}
                        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
                        <p className="mb-6 text-gray-400">{description}</p>

                        {/* Action buttons */}
                        <div className="flex justify-end space-x-4">
                            {/* Link to live demo */}
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 transition-colors duration-200"
                            >
                                Live Demo <ExternalLink className="ml-2 inline-block h-5 w-5" />
                            </a>

                            {/* Close button */}
                            <button
                                className="rounded-md bg-gray-800 px-4 py-2 font-medium hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectCardModal;
