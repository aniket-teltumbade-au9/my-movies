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
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        await loginUser(data)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-[21px]">
                <Input id="email" type="email" placeholder="Email" {...register("email")} />
                <Input id="password" type="password" placeholder="Password" {...register("password")} />
                <Checkbox id="remember" label="Remember me" />
                <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
            </div>
        </form>
    );
}
