// @flow

type Context = {
  mongo: {
    Links: any;
    Users: any;
  };
};

async function allLinks(root: any, data: {}, context: Context) {
  let {Links} = context.mongo;
  return await Links.find({}).toArray();
}

type CrateLinkProps = {
  url: string;
  description: string;
};

async function crateateLink(root: any, data: CrateLinkProps, context: Context) {
  let {Links} = context.mongo;
  let response = await Links.insert(data);
  return {
    id: response.insertedIds[0],
    ...data,
  };
}

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

// Resolvers for users

async function createUser(root: any, data: CreateUserProps, context: Context) {
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

async function allUsers(root: any, data: {}, context: Context) {
  let {Users} = context.mongo;
  let users = await Users.find({}).toArray();
  return users;
}

async function signinUser(root: any, data: AuthProvider, context: Context) {
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

let resolvers = {
  Query: {
    allLinks,
    allUsers,
  },
  Mutation: {
    crateateLink,
    createUser,
    signinUser,
  },
  Link: {
    id: (root: any) => root._id || root.id,
  },
  User: {
    id: (root: any) => root._id || root.id,
  },
};

export default resolvers;
