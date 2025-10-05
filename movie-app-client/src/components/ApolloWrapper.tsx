"use client"; // This component must be a Client Component

import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
    NextSSRApolloClient, // Important: use NextSSRApolloClient
} from "@apollo/experimental-nextjs-app-support/ssr";
import React from 'react';

function makeClient() {
    const authLink = setContext((_, { headers }) => {
        // Get the authentication token from local storage if it exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

        // Return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const httpLink = new HttpLink({
        uri: "http://localhost:5000/graphql",
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    // This is required for Next.js SSR with App Router
                    new SSRMultipartLink({ stripDefer: true }),
                    httpLink,
                ])
                : authLink.concat(httpLink),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
