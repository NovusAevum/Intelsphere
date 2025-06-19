import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff, Mail, Lock, Brain, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import TutorialOverlay from '@/components/ui/tutorial-overlay';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const tutorialSteps = [
    {
      title: "NexusIntel 2.0v Login",
      content: `
        <p>Access your elite intelligence operations dashboard:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>Secure Authentication:</strong> Enterprise-grade security protocols</li>
          <li>• <strong>Session Management:</strong> Persistent secure sessions</li>
          <li>• <strong>Access Control:</strong> Role-based permissions system</li>
        </ul>
      `
    },
    {
      title: "Login Process",
      content: `
        <p>Quick and secure access:</p>
        <ul style="margin-top: 10px;">
          <li>• Enter your registered email address</li>
          <li>• Provide your secure password</li>
          <li>• Click "Access Dashboard" to proceed</li>
          <li>• New users can register via the signup link</li>
        </ul>
      `
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const userData = {
        id: '1',
        email: formData.email,
        firstName: formData.email.split('@')[0],
        lastName: 'Agent'
      };

      login(userData);
      setLocation('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Tutorial Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTutorial(true)}
          className="border-purple-600 text-purple-300 hover:bg-purple-900/50"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Help
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              NexusIntel 2.0v
            </CardTitle>
            <CardDescription className="text-gray-400">
              Access Elite Intelligence Operations
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-500"
                    placeholder="agent@nexusintel.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-500"
                    placeholder="Enter secure password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Access Dashboard'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                New to NexusIntel?{' '}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Secure • Enterprise Grade • Professional Intelligence
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        steps={tutorialSteps}
        title="NexusIntel 2.0v Login Guide"
      />
    </div>
  );
}