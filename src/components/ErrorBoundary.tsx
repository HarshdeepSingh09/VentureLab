import React, { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('VentureLab caught an unhandled error:', error, errorInfo);
  }

  handleRestart = () => {
    try {
      localStorage.removeItem('venturelab_sim_state_v4');
      localStorage.removeItem('venturelab_sim_state_v3');
      localStorage.removeItem('venturelab_sim_state_v2');
      localStorage.removeItem('venturelab_founder_profile_v3');
      localStorage.removeItem('venturelab_founder_profile_v2');
      localStorage.removeItem('venturelab_founder_profile');
    } catch {
      // ignore
    }
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
    window.location.hash = '';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F6F3EA] text-[#22251F] flex items-center justify-center p-6 text-left">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#D9D5C9] p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#D9D5C9] pb-4">
              <div className="p-3 rounded-2xl bg-[#B9684D]/10 border border-[#B9684D]/30 text-[#B9684D]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#22251F]">
                  {this.props.fallbackTitle || 'Simulation Recovery'}
                </h2>
                <p className="text-xs text-[#22251F]/70">
                  VentureLab encountered an unexpected state issue and safely paused.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F3EA] border border-[#D9D5C9] font-mono text-xs text-[#B9684D] overflow-x-auto">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={this.handleRestart}
                className="w-full py-3 rounded-xl bg-[#234B3A] hover:bg-[#1a382b] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Simulation State & Restart</span>
              </button>

              <a
                href="/"
                className="w-full py-3 rounded-xl bg-[#F6F3EA] hover:bg-[#D9D5C9]/50 border border-[#D9D5C9] text-[#22251F] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors block text-center"
              >
                <Home className="w-4 h-4" />
                <span>Return to Landing Page</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
