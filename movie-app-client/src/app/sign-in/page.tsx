import SignInForm from "../../components/ui/forms/SignInForm";

export default function SignIn() {
    return (
        <div className="w-full lg:w-[25vw] lg:m-auto px-4 lg:px-0 h-screen w-full flex flex-col items-center justify-center relative overflow-y-auto">
            <div className="w-full max-w-[380px] z-10">
                <h1 className="text-[#fff] text-center text-[48px] font-bold leading-[56px] mb-24">
                    Sign in
                </h1>

                <SignInForm />
            </div>
        </div>
    );
}
