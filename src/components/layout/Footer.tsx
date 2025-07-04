export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="notion-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
                <span className="text-background font-medium text-xs">D</span>
              </div>
              <span className="text-base font-medium text-foreground font-inter">
                Daksha
              </span>
            </div>
            <p className="notion-text text-sm max-w-md">
              Your journaling, agentic life companion & MindOS
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-medium mb-3 text-foreground font-inter">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/app" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    MVP
                  </a>
                </li>
                <li>
                  <a href="https://tally.so/r/wLN5e2" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Waitlist
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-foreground font-inter">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="https://daksha.live" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground font-inter">
            © 2024 Daksha. Built by Shaswat Raj.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">320+ early adopters</span>
            <span className="text-sm text-muted-foreground">Coming soon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}