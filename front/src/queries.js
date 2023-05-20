import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(input: { username: $username, password: $password, email: $email }) {
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

export const GET_ALL_LECTURE = gql`
  query {
    allLectures {
      edges {
        node {
          id
          title
          lectureImageUrl
          lectureVideoElement
          description
          author
        }
      }
    }
  }
`;

export const GET_LECTURE = gql`
  query ($id: ID!) {
    lecture(id: $id) {
      id
      title
      lectureImageUrl
      lectureVideoElement
      description
      author
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`;

export const CREATE_REGISTER = gql`
  mutation createRegister($user: ID!, $lecture: ID!) {
    createRegister(input: { userId: $user, lectureId: $lecture }) {
      registration {
        id
      }
    }
  }
`;

export const GET_REGISTER = gql`
  query getRegister($user: ID!, $lecture: ID!) {
    allRegistrations(user: $user, lecture: $lecture) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const GET_MY_LECTURE = gql`
  query getMyLecture($user: ID!) {
    allRegistrations(user: $user) {
      edges {
        node {
          id
          isCompleted
          lecture {
            id
            title
            lectureImageUrl
            lectureVideoElement
            description
            author
          }
        }
      }
    }
  }
`;

export const GET_TESTS = gql`
  query getTests($lecture: ID!) {
    allTests(lecture: $lecture) {
      edges {
        node {
          id
          question
          answer
          option1
          option2
          option3
          option4
        }
      }
    }
  }
`;

export const CREATE_SCORE = gql`
  mutation createScore($user: ID!, $lecture: ID!, $score: Int!) {
    createScore(input: { userId: $user, lectureId: $lecture, score: $score }) {
      score {
        id
      }
    }
  }
`;

export const GET_SCORE = gql`
  query getScore($user: ID!, $lecture: ID!) {
    allScores(user: $user, lecture: $lecture) {
      edges {
        node {
          id
          score
          createdAt
          lecture {
            title
            author
          }
          user {
            username
          }
        }
      }
    }
  }
`;

export const UPDATE_REGISTER = gql`
  mutation updateRegister($id: ID!, $user: ID!, $lecture: ID!) {
    updateRegister(input: { id: $id, userId: $user, lectureId: $lecture }) {
      registration {
        id
      }
    }
  }
`;