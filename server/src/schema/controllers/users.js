// @flow

// Resolvers for users

type Root = mixed;

type CreateUserProps = {
  name: string;
  authProvider: AuthProvider;
};

type AuthProvider = {
  email: {
    email: string;
    password: string;
  };
};

type Context = {
  mongo: {
    Links: mixed;
    Users: any;
  };
  user: User;
};

type User = {
  _id: string;
  email: string;
  name: string;
};

async function createUser(root: Root, data: CreateUserProps, context: Context) {
  let newUser = {
    name: data.name,
    email: data.authProvider.email.email,
    password: data.authProvider.email.password,
  };
  let {Users} = context.mongo;
  let response = await Users.insert(newUser);
  return {
    id: response.insertedIds[0],
    ...newUser,
  };
}

async function allUsers(root: Root, data: {}, context: Context) {
  let {Users} = context.mongo;
  let users = await Users.find({}).toArray();
  return users;
}

async function signinUser(root: Root, data: AuthProvider, context: Context) {
  let {Users} = context.mongo;
  let {email, password} = data.email;
  let user = await Users.findOne({email: email});
  if (password === user.password) {
    return {
      token: `token-${user.email}`,
      user,
    };
  }
}

export {createUser, allUsers, signinUser};
