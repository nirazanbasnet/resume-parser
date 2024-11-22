import React from 'react';
import ResumeAnalysis from '../components/ResumeAnalysis';

interface CareerPosition {
  title: string;
  designation: string;
  company: string;
  duration: string;
  level: string;
  responsibilities: string[];
}

interface CurrentPosition {
  title: string;
  designation: string;
  company: string;
  duration: string;
}

interface ProgressionSkill {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  currentLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  actionItems: string[];
}

interface Certification {
  name: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
}

interface ExperienceGap {
  area: string;
  suggestion: string;
}

interface Milestone {
  title: string;
  timeframe: string;
  actions: string[];
}

interface ProgressionRoadmap {
  targetRole: string;
  estimatedTimeframe: string;
  requiredSkills: ProgressionSkill[];
  certifications: Certification[];
  experienceGaps: ExperienceGap[];
  milestones: Milestone[];
}

interface CareerAnalysis {
  currentLevel: string;
  totalYearsOfExperience: number;
  positionHistory: CareerPosition[];
  suggestedNextRole: string;
  careerProgression: string;
  progressionRoadmap: ProgressionRoadmap;
}

interface DetailsProps {
  data: {
    name: string;
    email: string;
    skills: string[];
    experience: string;
    currentPosition?: CurrentPosition;
    careerAnalysis?: CareerAnalysis;
    analysis?: any;
  };
}

const CareerRoadmap: React.FC<{ roadmap: ProgressionRoadmap }> = ({ roadmap }) => {

  // Ensure we have default values
  const {
    targetRole = '',
    estimatedTimeframe = '',
    requiredSkills = [],
    certifications = [],
    milestones = []
  } = roadmap || {};

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Career Growth Plan</h2>
      
      {/* Target Role & Timeline */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-1 text-lg font-semibold text-blue-800">Target Role</h3>
          <p className="text-gray-600">{targetRole}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-1 text-lg font-semibold text-blue-800">Timeline</h3>
          <p className="text-gray-600">{estimatedTimeframe}</p>
        </div>
      </div>

      {/* Key Focus Areas */}
      {(requiredSkills.length > 0 || certifications.length > 0) && (
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Key Focus Areas</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Priority Skills */}
            {requiredSkills
              .filter(skill => skill?.priority === 'high')
              .map((skill, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{skill.skill}</h4>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                      Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Current: {skill.currentLevel}</p>
                </div>
              ))}
            
            {/* Essential Certifications */}
            {certifications
              .filter(cert => cert?.priority === 'high')
              .map((cert, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    <span className="text-sm text-gray-600">{cert.timeframe}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {milestones.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Immediate Actions</h3>
          <div className="rounded-lg border p-4">
            <ul className="list-inside list-disc space-y-2 text-gray-600">
              {milestones
                .slice(0, 3) // Show only first 3 milestones
                .map((milestone, index) => (
                  <li key={index}>
                    <span className="font-medium">{milestone.title}</span>
                    {milestone.timeframe && (
                      <span className="text-sm text-gray-500"> - {milestone.timeframe}</span>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Details({ data }: DetailsProps) {
   // Helper function to determine score color
   const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Scores Section */}
      <div className="mb-8 grid grid-cols-2 gap-6">
        {/* Market Score */}
        <div className="rounded-lg bg-white p-6 text-center shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Market Readiness Score</h3>
          <div className={`w-24 h-24 rounded-full ${getScoreColor(data.analysis.marketScore)} text-white flex items-center justify-center text-2xl font-bold mx-auto`}>
            {data.analysis.marketScore}%
          </div>
          <p className="mt-4 text-gray-600">
            {data.analysis.marketScore >= 80 ? 'Excellent market alignment' :
             data.analysis.marketScore >= 60 ? 'Good potential with room for improvement' :
             'Needs significant improvement'}
          </p>
        </div>

        {/* CV Score */}
        <div className="rounded-lg bg-white p-6 text-center shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">CV Quality Score</h3>
          <div className={`w-24 h-24 rounded-full ${getScoreColor(data.analysis.cvScore)} text-white flex items-center justify-center text-2xl font-bold mx-auto`}>
            {data.analysis.cvScore}%
          </div>
          <p className="mt-4 text-gray-600">
            {data.analysis.cvScore >= 80 ? 'Well-structured and detailed CV' :
             data.analysis.cvScore >= 60 ? 'Good CV with some areas to enhance' :
             'CV needs significant improvements'}
          </p>
        </div>
      </div>
      
      {/* Basic Information Section */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">{data.name}</h1>
        
        {/* Current Position Section */}
        {data.currentPosition && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <h2 className="mb-2 text-xl font-semibold text-blue-800">Current Position</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-medium text-gray-800">{data.currentPosition.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Designation</p>
                <p className="font-medium text-gray-800">{data.currentPosition.designation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Company</p>
                <p className="font-medium text-gray-800">{data.currentPosition.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium text-gray-800">{data.currentPosition.duration}</p>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Next Role */}
        {data.careerAnalysis && data.careerAnalysis.suggestedNextRole && (
          <div className="mb-6 rounded-lg bg-green-50 p-4">
            <h2 className="mb-2 text-xl font-semibold text-green-800">Suggested Next Role</h2>
            <p className="text-gray-600">{data.careerAnalysis.suggestedNextRole}</p>
          </div>
        )}


        {/* Rest of the basic information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Contact Information</h2>
            <p className="text-gray-600">{data.email}</p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Career Analysis Section */}
        {data.careerAnalysis && (
          <div className="mt-8 border-t pt-6">
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Career Overview</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-lg font-medium text-gray-800">{data.careerAnalysis.currentLevel}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Total Experience</p>
                  <p className="text-lg font-medium text-gray-800">
                    {data.careerAnalysis.totalYearsOfExperience} years
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Position History */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-700">Position History</h3>
              <div className="space-y-4">
                {data.careerAnalysis.positionHistory.map((position, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{position.title}</p>
                        <p className="text-sm text-gray-600">{position.designation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{position.company}</p>
                        <p className="text-sm text-gray-600">{position.duration}</p>
                      </div>
                    </div>
                    <p className="mb-2 text-sm text-gray-600">Level: {position.level}</p>
                    {position.responsibilities && position.responsibilities.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Key Responsibilities:</p>
                        <ul className="mt-1 list-inside list-disc text-sm text-gray-600">
                          {position.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Section */}
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Experience</h2>
          <p className="text-gray-600">{data.experience}</p>
        </div>
      </div>

      {/* Resume Analysis Section */}
      {data.analysis && (
        <ResumeAnalysis analysis={data.analysis} />
      )}

      {/* Career Roadmap Section with null check */}
      {data.careerAnalysis?.progressionRoadmap && Object.keys(data.careerAnalysis.progressionRoadmap).length > 0 && (
        <CareerRoadmap roadmap={data.careerAnalysis.progressionRoadmap} />
      )}
    </div>
  );
}
  