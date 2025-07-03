export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🧠</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Daksha
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your sacred agentic AI companion. More than mental health. More than journaling. 
              Welcome to the future of emotionally intelligent agents.
            </p>
            <div className="flex space-x-4">
              <a href="https://tally.so/r/wLN5e2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Waitlist
              </a>
              <a href="https://mvp.daksha.live" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                MVP
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="https://mvp.daksha.live" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Try MVP
                </a>
              </li>
              <li>
                <a href="https://tally.so/r/wLN5e2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="https://daksha.live" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Daksha. Built with 💜 by Shaswat Raj.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">🌟 320+ early adopters</span>
            <span className="text-gray-400 text-sm">🚀 Coming soon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}