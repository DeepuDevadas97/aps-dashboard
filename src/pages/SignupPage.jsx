import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import ThemeToggle from "../component/ui/ThemeToggle";
import Button from "../component/ui/Button";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";

export default function SignupPage({ onNotify }) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            terms: false,
        },
    });

    const onSubmit = () => {
        onNotify("Account created. Welcome to APS.");
        navigate("/dashboard");
    };

    return (
        <div className="login-shell grid grid-cols-2">
            <section className="login-left">
                <a href="/" className="absolute top-[28px]">
                  <Logo />
                </a>
                <div className="login-copy">
                    <h1 className="text-white">
                        Expert level Cybersecurity <br /> in <span>hours</span>{" "}
                        not weeks.
                    </h1>
                    <p className="subhead text-white">What's included</p>
                    <ul>
                        <li>
                            Effortlessly spider and map targets to uncover
                            hidden security flaws
                        </li>
                        <li>
                            Deliver high-quality, validated findings in hours,
                            not weeks.
                        </li>
                        <li>
                            Generate professional, enterprise-grade security
                            reports automatically.
                        </li>
                    </ul>
                    <div className="trust text-white flex items-center gap-1">
                        <MdOutlineStarPurple500 size={18} color="teal" />{" "}
                        <span className="text-white text-[14px]">
                            Trustpilot
                        </span>
                    </div>
                    <h3 className="text-[18px] flex items-center gap-2 text-white">
                        Rated 4.5/5.0{" "}
                        <span className="text-white/50 text-[12px] font-normal pt-0.5">
                            (100k+ view)
                        </span>
                    </h3>
                </div>
            </section>

            <section className="login-right">
                {/* <div className="login-header-actions">
                    <ThemeToggle />
                </div> */}
                <form
                    className="signup-card"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <h2 className="font-medium">Sign up</h2>
                    <p>
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="text-[14px] !font-normal underline cursor-pointer"
                        >
                            Log in
                        </button>
                    </p>

                    <div>
                        <input
                            placeholder="First name*"
                            {...register("firstName", {
                                required: "First name is required.",
                            })}
                        />
                        {errors.firstName && (
                            <span className="form-error">
                                {errors.firstName.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            placeholder="Last name*"
                            {...register("lastName", {
                                required: "Last name is required.",
                            })}
                        />
                        {errors.lastName && (
                            <span className="form-error">
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email address*"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address.",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="form-error">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password (8+ characters)*"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters.",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="form-error">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <label className="terms mt-2">
                        <input
                            type="checkbox"
                            {...register("terms", {
                                required: "You must accept terms to continue.",
                            })}
                            className="cursor-pointer"
                        />
                        <span className="text-[12px] text-black font-normal">
                            I agree to Aps's{" "}
                            <a href="#" className="text-blue-500 underline">
                                Terms & Conditions
                            </a>{" "}
                            and acknowledge the
                            <a
                                href="#"
                                className="text-blue-500 underline ml-1"
                            >
                                Privacy Policy.
                            </a>
                        </span>
                    </label>
                    {errors.terms && (
                        <span className="form-error">
                            {errors.terms.message}
                        </span>
                    )}

                    <Button
                        variant="primary"
                        className="wide mt-5"
                        type="submit"
                    >
                        Create account
                    </Button>

                    <div className="social-row">
                        <button
                            type="button"
                            className="social apple flex justify-center"
                            onClick={() => onNotify("Apple sign in clicked.")}
                        >
                            <FaApple size={20} />
                        </button>
                        <button
                            type="button"
                            className="social google flex justify-center"
                            onClick={() => onNotify("Google sign in clicked.")}
                        >
                            <FcGoogle size={20} />
                        </button>
                        <button
                            type="button"
                            className="social meta flex justify-center"
                            onClick={() => onNotify("Meta sign in clicked.")}
                        >
                            <FaMeta size={20} />
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
