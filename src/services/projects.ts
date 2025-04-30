import api from './api';

// Interface for project data
interface ProjectData {
  title: string;
  description: string;
  requirements: string;
  skills: string[];
  category: string;
  budget: number;
  deadline: Date | string;
}

// Interface for milestone data
interface MilestoneData {
  title: string;
  description: string;
  dueDate: Date | string;
  amount: number;
}

// Project service with methods for project operations
const projectService = {
  // Get all projects with optional filters
  getProjects: async (filters = {}) => {
    const response = await api.get('/projects', { params: filters });
    return response.data;
  },

  // Get a single project by ID
  getProject: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData: ProjectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update a project
  updateProject: async (id: string, projectData: Partial<ProjectData>) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete a project
  deleteProject: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Update project status
  updateProjectStatus: async (id: string, status: string) => {
    const response = await api.put(`/projects/${id}/status`, { status });
    return response.data;
  },

  // Add milestone to project
  addMilestone: async (projectId: string, milestoneData: MilestoneData) => {
    const response = await api.post(`/projects/${projectId}/milestones`, milestoneData);
    return response.data;
  },

  // Update milestone status
  updateMilestoneStatus: async (projectId: string, milestoneId: string, status: string) => {
    const response = await api.put(`/projects/${projectId}/milestones/${milestoneId}`, { status });
    return response.data;
  },

  // Get projects for current user
  getMyProjects: async () => {
    const response = await api.get('/projects/me');
    return response.data;
  },

  // Get bids for a project
  getProjectBids: async (projectId: string) => {
    const response = await api.get(`/projects/${projectId}/bids`);
    return response.data;
  },

  // Submit a bid for a project
  submitBid: async (projectId: string, bidData: { amount: number, deliveryTime: number, proposal: string }) => {
    const response = await api.post(`/projects/${projectId}/bids`, bidData);
    return response.data;
  },
};

export default projectService;
