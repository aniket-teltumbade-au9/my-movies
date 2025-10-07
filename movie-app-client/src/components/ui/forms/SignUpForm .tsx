"use client"
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useAuth } from "@/hooks/use-auth";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
    email: string;
    password: string;
}

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const { registerUser } = useAuth()
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        setLoading(true)
        await registerUser(data)
        setLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-[21px]">
                <Input id="email" type="email" placeholder="Email" {...register('email')} />
                <Input id="password" type="password" placeholder="Password" {...register("password")} />
                <Button type="submit">{loading ? "Loading..." : "Register"}</Button>
            </div>
        </form>
    );
}
