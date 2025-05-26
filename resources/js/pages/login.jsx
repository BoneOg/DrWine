import { Link, useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    usernameOrEmail: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      {/* Background Wine Glass */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-3/5">
        <img
          src="/assets/login-image.png"
          alt="Wine Glass"
          className="h-full w-full object-cover object-right"
        />
      </div>

      {/* Main Content Container */}
      <div className="w-full md:w-2/5 md:ml-auto flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Slogan */}
          <div className="text-center mb-6">
            <img 
              src="/assets/logo1.png" 
              alt="Dr. Wine Logo" 
              className="h-24 md:h-28 mx-auto mb-4"
            />
            <p className="text-xl md:text-2xl font-fraunces text-[#0A121C]">
              where food meets royalty
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-black rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-fraunces font-light text-center text-white mb-8">
              <span className="text-red-600">W</span>elcome back!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <input
                  type="text"
                  name="usernameOrEmail"
                  value={data.usernameOrEmail}
                  onChange={(e) => setData('usernameOrEmail', e.target.value)}
                  placeholder="Email or Username"
                  className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white 
                  placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 
                  focus:ring-red-500 transition-all duration-300"
                  required
                />
                {errors.usernameOrEmail && (
                  <p className="text-red-500 text-sm">{errors.usernameOrEmail}</p>
                )}
              </div>

              <div className="space-y-1">
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white 
                  placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 
                  focus:ring-red-500 transition-all duration-300"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                text-white font-medium rounded-lg transition-all duration-300 py-3 uppercase tracking-wider
                shadow-lg hover:shadow-red-500/20"
              >
                {processing ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-red-500 hover:text-red-400 transition-colors duration-300"
              >
                Register now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

