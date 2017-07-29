// @flow

//:TODO Use JWT Instad of this following logic

const HEADER_REGEX = /bearer token-(.*)$/;

type Authorization = {
  headers: {
    authorization: string;
  };
};

async function authenticate(auth: Authorization, Users: any) {
  let {authorization} = auth.headers;
  let email = authorization && HEADER_REGEX.exec(authorization);
  return email && (await Users.findOne({email}));
}

export default authenticate;
