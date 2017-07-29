// @flow

const links = [
  {
    id: 1,
    url: 'http://graphql.org/',
    description: 'The Best Query Language',
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'Awesome GraphQL Client',
  },
];

type Context = {
  mongo: {
    Links: any;
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

let resolvers = {
  Query: {
    allLinks,
  },
  Mutation: {
    crateateLink,
  },
  Link: {
    id: (root: any) => root._id || root.id,
  },
};

export default resolvers;
