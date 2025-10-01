import { SignIn } from '@clerk/clerk-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to continue to Ai-FB Post Checker 888</p>
        </div>
        
        {/* The Clerk <SignIn> component will automatically render social providers like Facebook 
            if they are enabled in your Clerk Dashboard. No need for a separate button. */}


        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
