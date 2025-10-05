import { LOGIN_QUERY, REGISTER_USER, VERIFY_TOKEN_QUERY } from "@/gql/auth";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LocalStorage } from "../utils/localStorage.strategy";

export interface User {
    email: string;
    password: string;
}

const isPublicPath = (pathname: string) => pathname.includes('sign');

export const useAuth = () => {
    const [user, setUser] = useState<any>();
    const [token, setToken] = useState<string | null>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking
    const [registerUserMutation, { loading: registerLoading }] = useMutation(REGISTER_USER);
    const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_QUERY);
    const storage = new LocalStorage("access_token");
    const router = useRouter();
    const pathname = usePathname();
    const hasInitialized = useRef(false);
    const hasNavigated = useRef(false);

    const { data, error, refetch, loading: verifyLoading } = useQuery(VERIFY_TOKEN_QUERY, {
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
    }, []);

    // Handle token verification result
    useEffect(() => {
        if (!token) return;

        const queryData = data as any;

        if (queryData?.verifyToken) {
            setUser(queryData.verifyToken);
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
            console.log('Redirecting authenticated user from public page to /movies');
            hasNavigated.current = true;
            router.replace('/movies');
        } else if (!isAuthenticated && !currentPathIsPublic) {
            console.log('Redirecting unauthenticated user from protected page to /sign-in');
            hasNavigated.current = true;
            router.replace('/sign-in');
        }
    }, [isAuthenticated, pathname, router]);

    // Reset navigation flag when pathname changes (user manually navigates)
    useEffect(() => {
        hasNavigated.current = false;
    }, [pathname]);

    const registerUser = async (user: User) => {
        const { data, error } = await registerUserMutation({ variables: { input: user } });
        if (error) throw error;
        router.push("/sign-in")
        return data;
    };

    const loginUser = async (user: User) => {
        const { data, error } = await loginMutation({ variables: { input: user } });
        if (error) throw error;
        const loginData = data as any;
        const accessToken = loginData?.loginUser?.accessToken;
        const userData = loginData?.loginUser?.user;

        // Update all states together
        setToken(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
        storage.set(accessToken);
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