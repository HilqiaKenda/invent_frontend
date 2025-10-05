const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: formData.name || "User", email: formData.email });
    onClose();
  };

  const updateFormData = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? "Sign in to your account" : "Join us today"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <FormInput
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={updateFormData("name")}
                    required
                  />
                )}

                <FormInput
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={updateFormData("email")}
                  required
                />

                <FormInput
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={updateFormData("password")}
                  required
                />

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </motion.button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 hover:underline"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
