// @flow

//:TODO Use JWT Instad of this following logic

const HEADER_REGEX = /bearer token-(.*)$/;

type AuthorizationProps = {
  headers: {
    Authorization: string;
  };
};


async function authenticate(auth: AuthorizationProps, Users: any) {
  let {Authorization} = auth.headers;
  let email = Authorization && HEADER_REGEX.exec(Authorization)[1];
  let user = await Users.findOne({email: email});
  return email && user;
}

export default authenticate;
