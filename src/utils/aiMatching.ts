// AI Matching Algorithm (Hardcoded Simulation)
// This simulates AI-based candidate-job matching using simple algorithms

export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: number; // years
  completedJobs: number;
  rating: number; // 0-5
  hourlyRate: number;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  skills: string[];
  budget: number;
  duration: string;
}

export interface MatchResult {
  candidateId: string;
  candidateName: string;
  matchScore: number;
  matchReasons: string[];
  recommendedRate: number;
}

/**
 * Calculate match score between a candidate and a job
 * Score is 0-100, higher is better match
 */
export function calculateMatchScore(candidate: Candidate, job: Job): number {
  let score = 0;
  const factors: { weight: number; value: number; reason: string }[] = [];

  // 1. Skills match (40% weight)
  const skillsMatch = calculateSkillsMatch(candidate.skills, job.skills);
  factors.push({
    weight: 0.4,
    value: skillsMatch,
    reason: `${skillsMatch}% skills match`
  });

  // 2. Experience level (20% weight)
  const experienceScore = Math.min(candidate.experience / 5, 1) * 100; // 5+ years = 100%
  factors.push({
    weight: 0.2,
    value: experienceScore,
    reason: `${candidate.experience} years experience`
  });

  // 3. Past performance (20% weight)
  const performanceScore = (candidate.rating / 5) * 100;
  factors.push({
    weight: 0.2,
    value: performanceScore,
    reason: `${candidate.rating}/5 rating`
  });

  // 4. Completed jobs (10% weight)
  const completionScore = Math.min(candidate.completedJobs / 10, 1) * 100; // 10+ jobs = 100%
  factors.push({
    weight: 0.1,
    value: completionScore,
    reason: `${candidate.completedJobs} completed jobs`
  });

  // 5. Rate compatibility (10% weight)
  const rateScore = calculateRateCompatibility(candidate.hourlyRate, job.budget, job.duration);
  factors.push({
    weight: 0.1,
    value: rateScore,
    reason: `Rate: $${candidate.hourlyRate}/hr`
  });

  // Calculate weighted score
  score = factors.reduce((total, factor) => total + factor.weight * factor.value, 0);

  return Math.round(score);
}

/**
 * Calculate skills match percentage
 */
function calculateSkillsMatch(candidateSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 100;

  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase());
  const normalizedRequiredSkills = requiredSkills.map(s => s.toLowerCase());

  const matchedSkills = normalizedRequiredSkills.filter(skill =>
    normalizedCandidateSkills.some(cs => cs.includes(skill) || skill.includes(cs))
  );

  return (matchedSkills.length / normalizedRequiredSkills.length) * 100;
}

/**
 * Calculate rate compatibility
 */
function calculateRateCompatibility(hourlyRate: number, budget: number, duration: string): number {
  // Estimate hours based on duration
  const estimatedHours = estimateHours(duration);
  const totalCost = hourlyRate * estimatedHours;

  if (totalCost <= budget * 0.7) return 100; // Under budget
  if (totalCost <= budget) return 80; // Within budget
  if (totalCost <= budget * 1.2) return 60; // Slightly over
  if (totalCost <= budget * 1.5) return 40; // Moderately over
  return 20; // Significantly over
}

/**
 * Estimate hours from duration string
 */
function estimateHours(duration: string): number {
  const durationMap: { [key: string]: number } = {
    '1-7': 20,
    '8-14': 40,
    '15-30': 80,
    '30+': 160
  };
  return durationMap[duration] || 40;
}

/**
 * Match candidates to a job and return ranked results
 */
export function matchCandidatesToJob(job: Job, candidates: Candidate[]): MatchResult[] {
  const matches: MatchResult[] = candidates.map(candidate => {
    const matchScore = calculateMatchScore(candidate, job);
    const matchReasons = generateMatchReasons(candidate, job, matchScore);
    const recommendedRate = calculateRecommendedRate(candidate, job);

    return {
      candidateId: candidate.id,
      candidateName: candidate.name,
      matchScore,
      matchReasons,
      recommendedRate
    };
  });

  // Sort by match score (highest first)
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

/**
 * Generate human-readable match reasons
 */
function generateMatchReasons(candidate: Candidate, job: Job, matchScore: number): string[] {
  const reasons: string[] = [];

  const skillsMatch = calculateSkillsMatch(candidate.skills, job.skills);
  if (skillsMatch >= 80) {
    reasons.push('Excellent skills match');
  } else if (skillsMatch >= 50) {
    reasons.push('Good skills alignment');
  }

  if (candidate.experience >= 5) {
    reasons.push('Highly experienced');
  } else if (candidate.experience >= 2) {
    reasons.push('Solid experience');
  }

  if (candidate.rating >= 4.5) {
    reasons.push('Top-rated freelancer');
  } else if (candidate.rating >= 4.0) {
    reasons.push('Highly rated');
  }

  if (candidate.completedJobs >= 10) {
    reasons.push('Proven track record');
  }

  const estimatedHours = estimateHours(job.duration);
  const totalCost = candidate.hourlyRate * estimatedHours;
  if (totalCost <= job.budget) {
    reasons.push('Within budget');
  }

  return reasons;
}

/**
 * Calculate recommended rate for the job
 */
function calculateRecommendedRate(candidate: Candidate, job: Job): number {
  const estimatedHours = estimateHours(job.duration);
  const maxRate = job.budget / estimatedHours;
  return Math.min(candidate.hourlyRate, maxRate);
}

/**
 * Simulate candidate database (for demo purposes)
 */
export function generateMockCandidates(): Candidate[] {
  const mockCandidates: Candidate[] = [
    {
      id: 'candidate-1',
      name: 'John Doe',
      email: 'john@example.com',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      experience: 5,
      completedJobs: 24,
      rating: 4.8,
      hourlyRate: 75
    },
    {
      id: 'candidate-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'User Research'],
      experience: 4,
      completedJobs: 18,
      rating: 4.9,
      hourlyRate: 65
    },
    {
      id: 'candidate-3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      skills: ['Python', 'TensorFlow', 'Data Science', 'ML'],
      experience: 6,
      completedJobs: 31,
      rating: 4.7,
      hourlyRate: 90
    },
    {
      id: 'candidate-4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Copywriting'],
      experience: 3,
      completedJobs: 15,
      rating: 4.6,
      hourlyRate: 50
    },
    {
      id: 'candidate-5',
      name: 'David Brown',
      email: 'david@example.com',
      skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
      experience: 4,
      completedJobs: 12,
      rating: 4.8,
      hourlyRate: 100
    },
    {
      id: 'candidate-6',
      name: 'Emily Davis',
      email: 'emily@example.com',
      skills: ['Video Editing', 'Premiere Pro', 'After Effects', 'Motion Graphics'],
      experience: 3,
      completedJobs: 20,
      rating: 4.5,
      hourlyRate: 55
    },
    {
      id: 'candidate-7',
      name: 'Alex Martinez',
      email: 'alex@example.com',
      skills: ['React', 'Vue', 'Angular', 'JavaScript', 'CSS'],
      experience: 4,
      completedJobs: 28,
      rating: 4.7,
      hourlyRate: 70
    },
    {
      id: 'candidate-8',
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      skills: ['Project Management', 'Agile', 'Scrum', 'JIRA'],
      experience: 7,
      completedJobs: 35,
      rating: 4.9,
      hourlyRate: 80
    }
  ];

  return mockCandidates;
}
