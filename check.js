const token = process.env.NODE_AUTH_TOKEN

if (token?.length > 3) {
  // @#$
  // eslint-disable-next-line no-console
  console.log(`Found NODE_AUTH_TOKEN: ***${token.slice(-3)}`)
} else {
  // @#$
  // eslint-disable-next-line no-console
  console.log('NODE_AUTH_TOKEN was not provided')
}
