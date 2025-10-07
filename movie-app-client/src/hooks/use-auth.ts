import { LOGIN_QUERY, REGISTER_USER, VERIFY_TOKEN_QUERY } from "@/gql/auth";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LocalStorage } from "../utils/localStorage.strategy";
import { toast } from "toaster";

export interface User {
    email: string;
    password: string;
}

interface UserData {
    _id: string;
    email: string;
    name?: string;
}

interface LoginResponse {
    loginUser: {
        accessToken: string;
        user: UserData;
    };
}

interface VerifyResponse {
    verifyToken: UserData;
}

const isPublicPath = (pathname: string) => pathname.includes('sign');

export const useAuth = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking
    const [registerUserMutation, { loading: registerLoading }] = useMutation(REGISTER_USER);
    const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_QUERY);
    const storage = useMemo(() => new LocalStorage("access_token"), []);
    const router = useRouter();
    const pathname = usePathname();
    const hasInitialized = useRef(false);
    const hasNavigated = useRef(false);

    const { data, error, loading: verifyLoading } = useQuery<VerifyResponse>(VERIFY_TOKEN_QUERY, {
        variables: { token },
        skip: !token,
    });

    // Initialize token from localStorage only once
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            const access_token = storage.get();
            if (access_token) {
                setToken(access_token);
            } else {
                // No token found, user is not authenticated
                setIsAuthenticated(false);
            }
        }
    }, [storage]);

    // Handle token verification result
    useEffect(() => {
        if (!token) return;

        if (data?.verifyToken) {
            setUser(data.verifyToken);
            setIsAuthenticated(true);
        } else if (error) {
            // Token is invalid
            setIsAuthenticated(false);
            setToken(null);
            setUser(null);
            storage.remove();
        }
    }, [data, error, token, storage]);

    // Handle navigation based on authentication state
    useEffect(() => {
        // Wait until authentication state is determined
        if (isAuthenticated === null || hasNavigated.current) return;

        const currentPathIsPublic = isPublicPath(pathname);

        // Prevent navigation loops by only navigating once
        if (isAuthenticated && currentPathIsPublic) {
            hasNavigated.current = true;
            router.replace('/movies');
        } else if (!isAuthenticated && !currentPathIsPublic) {
            hasNavigated.current = true;
            router.replace('/sign-in');
        }
    }, [isAuthenticated, pathname, router]);

    // Reset navigation flag when pathname changes (user manually navigates)
    useEffect(() => {
        hasNavigated.current = false;
    }, [pathname]);

    const registerUser = async (user: User) => {
        try {
            const { data, error } = await registerUserMutation({ variables: { input: user } });
            if (error) throw error;
            toast.success('User registered successfully');
            router.push("/sign-in")
            return data;
        } catch (error) {
            toast.error('Failed to register user');
            throw error;
        }
    };

    const loginUser = async (user: User) => {
        try {
            const { data, error } = await loginMutation({ variables: { input: user } });
            if (error) throw error;
            const loginData = data as LoginResponse;
            const accessToken = loginData?.loginUser?.accessToken;
            const userData = loginData?.loginUser?.user;

            // Update all states together
            setToken(accessToken);
            setUser(userData);
            setIsAuthenticated(true);
            storage.set(accessToken);
            toast.success('Logged in successfully');
        } catch (error) {
            toast.error('Failed to login');
            throw error;
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        storage.remove();
        hasNavigated.current = false;
        router.replace('/sign-in');
    };

    return {
        user,
        token,
        isAuthenticated: isAuthenticated === true, // Return boolean for external use
        registerUser,
        loginUser,
        handleLogout,
        isLoading: registerLoading || loginLoading || verifyLoading || isAuthenticated === null,
    };
};