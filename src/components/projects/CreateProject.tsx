import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import projectService from '../../services/projects';
import Alert from '../common/Alert';
import { FaPlus, FaTimes } from 'react-icons/fa';

const CreateProject = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    category: '',
    budget: '',
    deadline: '',
    skills: [] as string[],
    skillInput: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Categories for dropdown
  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphic Design',
    'Content Writing',
    'Digital Marketing',
    'Video Editing',
    'Data Entry',
    'Other',
  ];
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle skill input
  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, skillInput: e.target.value });
  };
  
  // Add skill to form data
  const handleAddSkill = () => {
    if (formData.skillInput.trim() !== '' && !formData.skills.includes(formData.skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skillInput.trim()],
        skillInput: '',
      });
    }
  };
  
  // Remove skill from form data
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };
  
  // Handle skill input key down (Enter)
  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (formData.skills.length === 0) {
      setError('Please add at least one required skill');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Prepare project data
      const projectData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        category: formData.category,
        budget: parseFloat(formData.budget),
        deadline: formData.deadline,
        skills: formData.skills,
      };
      
      // Create project
      const response = await projectService.createProject(projectData);
      
      setSuccess('Project created successfully!');
      setLoading(false);
      
      // Redirect to project details page after a short delay
      setTimeout(() => {
        navigate(`/projects/${response.data._id}`);
      }, 1500);
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.error || 'Failed to create project. Please try again later.');
      setLoading(false);
    }
  };
  
  // If user is not a client, show error
  if (user && user.role !== 'client') {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Access Denied!</strong>
        <span className="block sm:inline"> Only clients can create projects.</span>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New Project</h1>
      
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      
      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter a descriptive title for your project"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input h-32"
            placeholder="Provide a detailed description of your project"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="requirements" className="form-label">
            Project Requirements
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="form-input h-32"
            placeholder="List the specific requirements for your project"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="budget" className="form-label">
              Budget (USD)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your budget"
              min="1"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="skills" className="form-label">
            Required Skills
          </label>
          <div className="flex">
            <input
              type="text"
              id="skillInput"
              value={formData.skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillInputKeyDown}
              className="form-input flex-grow"
              placeholder="Add required skills"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="ml-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center"
            >
              <FaPlus className="mr-1" /> Add
            </button>
          </div>
          {formData.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-semibold flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-primary-600 hover:text-primary-800 focus:outline-none"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
