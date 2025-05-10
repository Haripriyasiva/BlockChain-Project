import React, { useState } from 'react';
import { FaCog, FaSun, FaMoon, FaBell, FaShieldAlt, FaExclamationCircle, FaCheck, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

const SettingsPage = ({ account }) => {
  const { theme, setThemeMode } = useTheme();
  const { showSuccess, showError } = useNotification();
  
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    donations: true,
    milestones: true,
    marketing: false
  });
  
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showDonations: true,
    showCreatedProjects: true
  });
  
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handlePrivacyChange = (setting) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const saveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showSuccess('Profile settings saved successfully');
    }, 1000);
  };
  
  const resetSettings = () => {
    setNotifications({
      projectUpdates: true,
      donations: true,
      milestones: true,
      marketing: false
    });
    
    setPrivacy({
      showProfile: true,
      showDonations: true,
      showCreatedProjects: true
    });
    
    setDisplayName('');
    setBio('');
    
    showSuccess('Settings reset to defaults');
  };

  if (!account) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6`}>
        <div className={`max-w-4xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg text-center`}>
          <FaExclamationCircle className={`text-5xl mx-auto mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Please connect your wallet to access settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-4 sm:p-6`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <FaCog className={`mr-3 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
            Settings
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your experience and manage your account
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4`}>
              <nav className="space-y-1">
                <NavItem active={true} icon={<FaCog />} text="General" />
                <NavItem active={false} icon={<FaBell />} text="Notifications" />
                <NavItem active={false} icon={<FaShieldAlt />} text="Privacy" />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Appearance Section */}
            <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Choose between light and dark mode
                    </p>
                  </div>
                  
                  <div className="mt-2 sm:mt-0 flex space-x-2">
                    <button
                      onClick={() => setThemeMode('light')}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        theme === 'light'
                          ? 'bg-blue-100 text-blue-800'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <FaSun className="mr-2" /> Light
                    </button>
                    
                    <button
                      onClick={() => setThemeMode('dark')}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        theme === 'dark'
                          ? 'bg-gray-600 text-white'
                          : theme === 'light'
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <FaMoon className="mr-2" /> Dark
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              
              <div className="space-y-4">
                <ToggleSetting
                  title="Project Updates"
                  description="Receive notifications about projects you've backed"
                  isEnabled={notifications.projectUpdates}
                  onChange={() => handleNotificationChange('projectUpdates')}
                  theme={theme}
                />
                
                <ToggleSetting
                  title="Donation Receipts"
                  description="Get notified when your donations are processed"
                  isEnabled={notifications.donations}
                  onChange={() => handleNotificationChange('donations')}
                  theme={theme}
                />
                
                <ToggleSetting
                  title="Milestone Alerts"
                  description="Be notified when projects reach funding milestones"
                  isEnabled={notifications.milestones}
                  onChange={() => handleNotificationChange('milestones')}
                  theme={theme}
                />
                
                <ToggleSetting
                  title="Marketing Communications"
                  description="Receive updates about new features and promotions"
                  isEnabled={notifications.marketing}
                  onChange={() => handleNotificationChange('marketing')}
                  theme={theme}
                />
              </div>
            </section>

            {/* Privacy Section */}
            <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-4">Privacy</h2>
              
              <div className="space-y-4">
                <ToggleSetting
                  title="Public Profile"
                  description="Allow others to view your profile"
                  isEnabled={privacy.showProfile}
                  onChange={() => handlePrivacyChange('showProfile')}
                  theme={theme}
                />
                
                <ToggleSetting
                  title="Show Donations"
                  description="Display your donations publicly"
                  isEnabled={privacy.showDonations}
                  onChange={() => handlePrivacyChange('showDonations')}
                  theme={theme}
                />
                
                <ToggleSetting
                  title="Show Created Projects"
                  description="Display projects you've created on your profile"
                  isEnabled={privacy.showCreatedProjects}
                  onChange={() => handlePrivacyChange('showCreatedProjects')}
                  theme={theme}
                />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                onClick={resetSettings}
                className={`px-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Reset to Defaults
              </button>
              
              <button
                onClick={saveProfile}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ active, icon, text }) => {
  const { theme } = useTheme();
  
  return (
    <div
      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
        active
          ? theme === 'dark'
            ? 'bg-gray-700 text-emerald-400'
            : 'bg-emerald-100 text-emerald-800'
          : theme === 'dark'
            ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
            : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const ToggleSetting = ({ title, description, isEnabled, onChange, theme }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
      
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
          isEnabled
            ? 'bg-emerald-500 justify-end'
            : theme === 'dark'
              ? 'bg-gray-600 justify-start'
              : 'bg-gray-300 justify-start'
        }`}
      >
        <span className={`h-5 w-5 rounded-full mx-0.5 flex items-center justify-center ${
          isEnabled ? 'bg-white text-emerald-500' : 'bg-white text-gray-400'
        }`}>
          {isEnabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
        </span>
      </button>
    </div>
  );
};

export default SettingsPage;
