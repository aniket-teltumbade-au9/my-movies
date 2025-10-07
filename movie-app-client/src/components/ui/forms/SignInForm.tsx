"use client"
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Checkbox from "../Checkbox";
import { useAuth } from "@/hooks/use-auth";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
    email: string;
    password: string;
}

export default function SignInForm() {
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onBlur',
    })
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        setLoading(true)
        try {
            await loginUser(data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-[21px]">
                <div>
                    <Input id="email" type="email" placeholder="Email" {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                        }
                    })} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <Input id="password" type="password" placeholder="Password" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })} />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <Checkbox id="remember" label="Remember me" />
                <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</Button>
            </div>
        </form>
    );
}
