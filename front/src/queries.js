import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(input: {username: $username, password: $password, email: $email}) {
      user {
        id
        username
        }
      }
    }
`;

export const GET_TOKEN = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;