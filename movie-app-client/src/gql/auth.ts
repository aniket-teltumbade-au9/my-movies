import { gql } from "@apollo/client";

export const REGISTER_USER = gql(`mutation CreateNewUser($input: RegisterUserInput!) {
  registerUser(registerUserInput: $input) {
    _id
    email
    createdAt
  }
}`)

export const LOGIN_QUERY = gql(`mutation LoginUser($input: LoginUserInput!) {
  loginUser(loginUserInput: $input) {
    accessToken
    user{
      email
    }
  }
}`)

export const VERIFY_TOKEN_QUERY = gql(`query VerifyUserSession($token: String!) {
  verifyToken(token: $token) {
    _id
    email
  }
}`)