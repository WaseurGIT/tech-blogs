import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace with your API endpoint
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {

  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-5 py-10">
      <div className="w-full max-w-md bg-white px-8 py-10 rounded-lg shadow-sm">
        <h2 className="text-center mb-8 text-3xl font-semibold text-gray-800">Login</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md mb-6 text-sm border-l-4 border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-normal transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 mt-2 bg-blue-500 text-white rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="flex items-center my-8 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button 
          type="button" 
          className="w-full py-3 bg-white border border-gray-300 rounded-md text-base font-semibold cursor-pointer flex items-center justify-center gap-2.5 transition-all hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-95"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500 font-semibold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
