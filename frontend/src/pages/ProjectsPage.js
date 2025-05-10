import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaPlus } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = ({ projects, loadBlockchainData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (projects.length === 0) {
      setIsLoading(true);
      loadBlockchainData().finally(() => setIsLoading(false));
    }
  }, [projects, loadBlockchainData]);

  useEffect(() => {
    // Filter projects based on search term
    let filtered = [...projects];

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort projects
    if (sortOrder === 'newest') {
      // Assuming project ID is sequential and higher ID means newer
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => Number(a.id) - Number(b.id));
    } else if (sortOrder === 'mostFunded') {
      filtered.sort((a, b) => Number(b.raised || 0) - Number(a.raised || 0));
    } else if (sortOrder === 'leastFunded') {
      filtered.sort((a, b) => Number(a.raised || 0) - Number(b.raised || 0));
    } else if (sortOrder === 'goalHighest') {
      filtered.sort((a, b) => Number(b.goal || 0) - Number(a.goal || 0));
    } else if (sortOrder === 'goalLowest') {
      filtered.sort((a, b) => Number(a.goal || 0) - Number(b.goal || 0));
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, sortOrder]);

  return (
    <div className="min-h-screen py-8">
      {/* Header section with background */}
      <div className="relative bg-indigo-900 py-12 mb-8 rounded-xl overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 text-emerald-500 text-8xl opacity-5 animate-pulse">
            <FaPlus />
          </div>
          <div className="absolute bottom-10 left-10 text-emerald-500 text-7xl opacity-5 animate-pulse" style={{ animationDelay: '1.2s' }}>
            <FaFilter />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInUp">Community Projects</h1>
          <p className="text-gray-300 max-w-2xl mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Discover and support community initiatives that matter. Browse through projects, filter by your interests, and contribute to make a difference.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full p-3 pl-10 rounded-xl bg-indigo-950 text-white placeholder-gray-400 border border-indigo-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-full md:w-auto">
                <select
                  className="w-full md:w-auto appearance-none p-3 pl-10 pr-10 rounded-xl bg-indigo-950 text-white border border-indigo-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="mostFunded">Most Funded</option>
                  <option value="leastFunded">Least Funded</option>
                  <option value="goalHighest">Highest Goal</option>
                  <option value="goalLowest">Lowest Goal</option>
                </select>
                <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
                {sortOrder.includes('most') || sortOrder.includes('Highest') ? (
                  <FaSortAmountDown className="absolute right-3 top-3.5 text-gray-400" />
                ) : (
                  <FaSortAmountUp className="absolute right-3 top-3.5 text-gray-400" />
                )}
              </div>
            </div>

            <Link
              to="/create"
              className="hidden md:flex items-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: '0.3s' }}
            >
              <FaPlus className="mr-2" /> Create Project
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-indigo-900 rounded-xl shadow-lg border border-indigo-800">
            <div className="text-emerald-500 text-5xl mb-4 opacity-50 mx-auto w-20 h-20 flex items-center justify-center">
              <FaSearch />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We couldn't find any projects matching your search criteria. Try adjusting your filters or create your own project.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105"
            >
              <FaPlus className="mr-2" /> Create a Project
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-300">
                Showing <span className="text-white font-semibold">{filteredProjects.length}</span> projects
              </p>
              <Link
                to="/create"
                className="md:hidden flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <FaPlus className="mr-1" /> Create
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
