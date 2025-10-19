// Job Service - Handle all job-related API calls
import { api } from './api';

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  duration: string;
  deadline: string;
  requirements: string[];
  skills: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  clientId: string;
  clientName: string;
  applicants?: number;
  videoUrl?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userSkills: string[];
  proposedRate: number;
  coverLetter: string;
  matchScore?: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface JobWithMatches extends Job {
  matchedCandidates?: {
    userId: string;
    userName: string;
    matchScore: number;
    skills: string[];
  }[];
}

class JobService {
  // Create a new job
  async create(jobData: Partial<Job>): Promise<Job> {
    return await api.post<Job>('/jobs', jobData);
  }

  // Get all jobs with filters
  async list(filters?: {
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    skills?: string[];
    status?: string;
  }): Promise<Job[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, String(value));
          }
        }
      });
    }
    const queryString = queryParams.toString();
    return await api.get<Job[]>(`/jobs${queryString ? `?${queryString}` : ''}`);
  }

  // Get a single job by ID
  async getById(jobId: string): Promise<Job> {
    return await api.get<Job>(`/jobs/${jobId}`);
  }

  // Get jobs posted by current user
  async getMyJobs(): Promise<Job[]> {
    return await api.get<Job[]>('/jobs/my-jobs');
  }

  // Update job
  async update(jobId: string, updates: Partial<Job>): Promise<Job> {
    return await api.put<Job>(`/jobs/${jobId}`, updates);
  }

  // Delete job
  async delete(jobId: string): Promise<void> {
    await api.delete(`/jobs/${jobId}`);
  }

  // Apply for a job
  async apply(jobId: string, application: Partial<JobApplication>): Promise<JobApplication> {
    return await api.post<JobApplication>(`/jobs/${jobId}/apply`, application);
  }

  // Get applications for a job
  async getApplications(jobId: string): Promise<JobApplication[]> {
    return await api.get<JobApplication[]>(`/jobs/${jobId}/applications`);
  }

  // Get AI-matched candidates for a job
  async getMatchedCandidates(jobId: string): Promise<JobWithMatches> {
    return await api.get<JobWithMatches>(`/jobs/${jobId}/matches`);
  }

  // Accept/Reject application
  async updateApplicationStatus(
    jobId: string,
    applicationId: string,
    status: 'accepted' | 'rejected'
  ): Promise<JobApplication> {
    return await api.patch<JobApplication>(
      `/jobs/${jobId}/applications/${applicationId}`,
      { status }
    );
  }

  // Initiate payment escrow
  async initiateEscrow(jobId: string, walletAddress: string): Promise<{
    transactionHash: string;
    escrowAddress: string;
    status: 'escrowed';
  }> {
    return await api.post(`/jobs/${jobId}/escrow`, { walletAddress });
  }

  // Release payment from escrow
  async releasePayment(jobId: string, recipientWallet: string): Promise<{
    transactionHash: string;
    status: 'released';
  }> {
    return await api.post(`/jobs/${jobId}/release-payment`, { recipientWallet });
  }

  // Mark job as complete
  async complete(jobId: string): Promise<Job> {
    return await api.patch<Job>(`/jobs/${jobId}/complete`);
  }
}

export const jobService = new JobService();
