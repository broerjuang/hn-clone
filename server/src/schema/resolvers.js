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

function allLinks() {
  return links;
}

type CrateLinkProps = {
  url: string;
  description: string;
};

function crateateLink(_: any, data: CrateLinkProps) {
  let newId = links.length + 1;
  let newLink = {
    id: newId,
    ...data,
  };
  links.push(newLink);
  return newLink;
}

let resolvers = {
  Query: {
    allLinks,
  },
  Mutation: {
    crateateLink,
  },
};

export default resolvers;
