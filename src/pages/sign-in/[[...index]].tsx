import { SignIn } from "@clerk/nextjs";
import Footer from "components/Footer";

const SignInPage = () => (
  <div className="h-full">
    <div className="grid w-full grid-cols-1 items-center justify-items-center lg:grid-cols-2 lg:gap-20">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative  flex items-center rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            This Application is meant for testing OpenAI API
            <span className="ml-3 h-3 w-3 animate-pulse rounded-full bg-green-400"></span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            ChatGPT Meal Planning Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Introducing ChatGPT Meal Planning Assistant - the ultimate solution
            to help you effortlessly plan and organize your meals, so you can
            focus on living a healthier, happier life!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
    <div className="fixed bottom-0 left-0 right-0">
      <Footer />
    </div>
  </div>
);

export default SignInPage;
