import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaCompass, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';

const CATEGORIES = [
  'All',
  'Technology',
  'Art',
  'Music',
  'Film',
  'Games',
  'Publishing',
  'Food',
  'Fashion',
  'Community',
  'Education',
  'Environment'
];

const DiscoverPage = ({ projects }) => {
  const { theme } = useTheme();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Process projects to add categories and ensure title/description are set
  const processProjects = (projectList) => {
    console.log("Processing projects for Discover page:", projectList);

    return projectList.map(project => {
      // Use existing title or default to "Untitled Project"
      const title = project.title || "Untitled Project";

      // Use existing description or default to empty string
      const description = project.description || "";

      // Assign a random category for demo purposes
      const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const category = randomCategory !== 'All' ? randomCategory : CATEGORIES[1];

      console.log(`Processed project ${project.id}: Title=${title}, Category=${category}`);

      return {
        ...project,
        title,
        description,
        category
      };
    });
  };

  useEffect(() => {
    const processedProjects = processProjects(projects);

    // Apply filters and sorting
    let result = [...processedProjects];

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(project => project.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortOption) {
        case 'newest':
          // For demo, use project ID as a proxy for creation time
          comparison = parseInt(a.id) - parseInt(b.id);
          break;
        case 'funding':
          // Handle both amountRaised and raised property names
          const aRaised = parseFloat(ethers.formatEther(a.amountRaised || a.raised || '0'));
          const bRaised = parseFloat(ethers.formatEther(b.amountRaised || b.raised || '0'));
          comparison = aRaised - bRaised;
          break;
        case 'progress':
          // Handle both property naming conventions
          const aRaisedAmount = parseFloat(ethers.formatEther(a.amountRaised || a.raised || '0'));
          const aGoalAmount = parseFloat(ethers.formatEther(a.fundingGoal || a.goal || '1'));
          const bRaisedAmount = parseFloat(ethers.formatEther(b.amountRaised || b.raised || '0'));
          const bGoalAmount = parseFloat(ethers.formatEther(b.fundingGoal || b.goal || '1'));

          const aProgress = aRaisedAmount / aGoalAmount;
          const bProgress = bRaisedAmount / bGoalAmount;
          comparison = aProgress - bProgress;
          break;
        default:
          break;
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });

    setFilteredProjects(result);
  }, [projects, searchTerm, selectedCategory, sortOption, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortOption('newest');
    setSortDirection('desc');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-4 sm:p-6`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <FaCompass className={`mr-3 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
            Discover Projects
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore and find innovative crowdfunding projects
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              <FaSearch className={`absolute left-3 top-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-3 top-3 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`md:hidden flex items-center justify-center px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={`px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-100 text-gray-900 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                <option value="newest">Newest</option>
                <option value="funding">Most Funded</option>
                <option value="progress">Progress</option>
              </select>

              {/* Sort Direction Button */}
              <button
                onClick={toggleSortDirection}
                className={`p-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {sortDirection === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
              </button>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className={`px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Mobile Filters (Expandable) */}
          {isFilterOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-700 space-y-4">
              <div>
                <label className={`block mb-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-gray-100 text-gray-900 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block mb-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sort By
                </label>
                <div className="flex space-x-2">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={`flex-grow px-4 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-gray-100 text-gray-900 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  >
                    <option value="newest">Newest</option>
                    <option value="funding">Most Funded</option>
                    <option value="progress">Progress</option>
                  </select>

                  <button
                    onClick={toggleSortDirection}
                    className={`p-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {sortDirection === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                  </button>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className={`w-full px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="animate-fadeIn">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <FaSearch className="text-5xl mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
