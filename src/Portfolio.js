import React, { useState, useEffect } from 'react';
import { Menu, X, User, Briefcase, Brain, Lightbulb, Wrench } from 'lucide-react';

const AnalogClock = ({ timezone, city, country }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = () => {
    return new Date(time.toLocaleString("en-US", { timeZone: timezone }));
  };

  const localTime = getTimeInTimezone();
  const hours = localTime.getHours() % 12;
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-300 shadow-sm p-2 w-full">
      <div className="flex items-center justify-between">
        {/* Clock face */}
        <div className="relative w-12 h-12 bg-white rounded border border-slate-200 flex-shrink-0">
          {/* Clock numbers */}
          {[12, 3, 6, 9].map((num, index) => {
            const angle = index * 90;
            const x = 50 + 32 * Math.sin((angle * Math.PI) / 180);
            const y = 50 - 32 * Math.cos((angle * Math.PI) / 180);
            return (
              <div
                key={num}
                className="absolute text-xs font-bold text-slate-600"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {num}
              </div>
            );
          })}
          
          {/* Hour hand */}
          <div
            className="absolute w-0.5 bg-slate-800 rounded-full origin-bottom"
            style={{
              height: '18%',
              left: '50%',
              top: '32%',
              transform: `translateX(-50%) rotate(${hourAngle}deg)`,
              transformOrigin: 'bottom center'
            }}
          />
          
          {/* Minute hand */}
          <div
            className="absolute w-px bg-slate-700 rounded-full origin-bottom"
            style={{
              height: '26%',
              left: '50%',
              top: '24%',
              transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
              transformOrigin: 'bottom center'
            }}
          />
          
          {/* Second hand */}
          <div
            className="absolute w-px bg-red-500 rounded-full origin-bottom"
            style={{
              height: '28%',
              left: '50%',
              top: '22%',
              transform: `translateX(-50%) rotate(${secondAngle}deg)`,
              transformOrigin: 'bottom center'
            }}
          />
          
          {/* Center dot */}
          <div className="absolute w-1 h-1 bg-slate-800 rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
        
        {/* City and time info */}
        <div className="flex-1 text-right pr-1">
          <div className="text-sm font-semibold text-slate-800">{city}</div>
          <div className="text-xs text-slate-600">{country}</div>
          <div className="text-xs font-mono text-slate-500">
            {localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

const BurgerMenu = ({ isOpen, toggleMenu, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: <User className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'learning', label: 'Learning', icon: <Brain className="w-4 h-4" /> },
    { id: 'ideas', label: 'Ideas', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Wrench className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-lg shadow-xl border border-slate-200 py-2 min-w-48">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                toggleMenu();
              }}
              className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center space-x-3 ${
                currentPage === item.id ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const worldClocks = [
    { timezone: 'America/New_York', city: 'New York', country: 'USA' },
    { timezone: 'Europe/London', city: 'London', country: 'UK' },
    { timezone: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan' },
    { timezone: 'Australia/Sydney', city: 'Sydney', country: 'Australia' },
    { timezone: 'Europe/Berlin', city: 'Berlin', country: 'Germany' },
    { timezone: 'Asia/Shanghai', city: 'Shanghai', country: 'China' },
    { timezone: 'America/Los_Angeles', city: 'Los Angeles', country: 'USA' },
    { timezone: 'Asia/Dubai', city: 'Dubai', country: 'UAE' },
    { timezone: 'Europe/Paris', city: 'Paris', country: 'France' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* World Clocks Grid */}
      <div className="pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-slate-900 mb-2">
            Welcome to My Portfolio
          </h1>
          <p className="text-center text-slate-600 mb-8">
            AI Solutions & Continuous Innovation
          </p>
          
          <div className="grid grid-cols-3 gap-2 mb-6 w-full">
            {worldClocks.map((clock, index) => (
              <AnalogClock
                key={index}
                timezone={clock.timezone}
                city={clock.city}
                country={clock.country}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Professional Portfolio
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            With over 15 years of IT experience in management and strategic planning, 
            I specialize in AI tool solutions and continuous learning methodologies. 
            My focus is on leveraging cutting-edge technologies to drive improvement 
            and innovation across diverse industries.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Brain className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-slate-900">AI & Machine Learning</h3>
              </div>
              <p className="text-slate-700">
                Developing innovative AI solutions and exploring the latest in LLM/MLM technologies 
                for practical business applications.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-semibold text-slate-900">Continuous Learning</h3>
              </div>
              <p className="text-slate-700">
                Committed to lifelong learning and staying ahead of technological trends 
                to deliver cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-600">
            Explore my work, ideas, and tools using the menu in the top-right corner.
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">About Me</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            I am a seasoned IT professional with over 15 years of experience in technology management, 
            strategic planning, and innovation leadership. My career has been driven by a passion for 
            continuous learning and the practical application of cutting-edge technologies.
          </p>
          
          <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Experience & Expertise</h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
            <li>15+ years in IT management and strategic planning</li>
            <li>Specialized in AI tool development and implementation</li>
            <li>Expert in continuous improvement methodologies</li>
            <li>Leadership in cross-functional technology teams</li>
            <li>Strategic planning and digital transformation</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Philosophy</h2>
          <p className="text-slate-700 mb-4">
            I believe in the power of continuous learning and adaptation. In today's rapidly evolving 
            technological landscape, staying current with AI, machine learning, and emerging technologies 
            is not just beneficial—it's essential for driving meaningful innovation and improvement.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Projects</h1>
        <div className="grid gap-6">
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Tool Solutions</h3>
            <p className="text-slate-700 mb-4">
              Development of custom AI tools for business process optimization and automation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AI</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Automation</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Innovation</span>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Strategic Technology Planning</h3>
            <p className="text-slate-700 mb-4">
              Leading digital transformation initiatives and technology roadmap development.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Strategy</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Leadership</span>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">Planning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LearningPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Continuous Learning</h1>
        <div className="space-y-6">
          <p className="text-lg text-slate-700 leading-relaxed">
            My commitment to continuous learning drives everything I do. In the rapidly evolving 
            world of technology, staying current is not just an advantage—it's a necessity.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Current Focus Areas</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li>Large Language Models (LLMs)</li>
                <li>Machine Learning Operations (MLOps)</li>
                <li>AI Ethics and Governance</li>
                <li>Advanced Analytics</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Learning Methodology</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li>Hands-on experimentation</li>
                <li>Industry research and analysis</li>
                <li>Community engagement</li>
                <li>Practical application</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const IdeasPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Ideas & Innovation</h1>
        <div className="space-y-6">
          <p className="text-lg text-slate-700 leading-relaxed">
            Innovation comes from the intersection of technology, creativity, and practical application. 
            Here are some of the concepts and ideas I'm exploring.
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-slate-900">AI-Driven Process Optimization</h3>
              <p className="text-slate-700">
                Leveraging machine learning to identify and automate improvement opportunities 
                in business processes.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-slate-900">Continuous Learning Systems</h3>
              <p className="text-slate-700">
                Building systems that adapt and improve automatically based on new data and feedback.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-slate-900">Human-AI Collaboration</h3>
              <p className="text-slate-700">
                Designing interfaces and workflows that enhance human capabilities through AI augmentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ToolsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Tools & Resources</h1>
        <div className="space-y-6">
          <p className="text-lg text-slate-700 leading-relaxed">
            A collection of tools and resources I've developed or found valuable in my work 
            with AI, machine learning, and technology innovation.
          </p>
          
          <div className="grid gap-4">
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Analysis Tools</h3>
              <p className="text-slate-700 mb-3">
                Custom tools for data analysis and machine learning model evaluation.
              </p>
              <span className="text-sm text-blue-600 font-medium">Coming Soon</span>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Process Optimization Suite</h3>
              <p className="text-slate-700 mb-3">
                A collection of tools for identifying and implementing process improvements.
              </p>
              <span className="text-sm text-blue-600 font-medium">Coming Soon</span>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Learning Resources</h3>
              <p className="text-slate-700 mb-3">
                Curated resources and guides for continuous learning in AI and technology.
              </p>
              <span className="text-sm text-blue-600 font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'learning':
        return <LearningPage />;
      case 'ideas':
        return <IdeasPage />;
      case 'tools':
        return <ToolsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative">
      <BurgerMenu 
        isOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
    </div>
  );
}