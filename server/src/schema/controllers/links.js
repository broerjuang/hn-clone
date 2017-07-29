// @flow
type Context = {
  mongo: {
    Links: any;
    Users: any;
  };
  user: User;
};

type User = {
  _id: string;
  email: string;
  name: string;
};

async function allLinks(root: any, data: {}, context: Context) {
  let {Links} = context.mongo;
  return await Links.find({}).toArray();
}

type CrateLinkProps = {
  url: string;
  description: string;
};

async function createLink(root: any, data: CrateLinkProps, context: Context) {
  let {Links} = context.mongo;
  let newLink = {
    postedById: context.user && context.user._id,
    ...data,
  };
  let response = await Links.insert(newLink);
  return {
    id: response.insertedIds[0],
    ...newLink,
  };
}

export {allLinks, createLink};
