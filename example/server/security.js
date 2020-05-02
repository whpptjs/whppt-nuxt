module.exports = {
  security: {
    provider: 'jwt',
    jwt: {
      secret: 'example-secret',
      issuer: 'example-site',
      audience: 'example-site',
    },
  },
};
