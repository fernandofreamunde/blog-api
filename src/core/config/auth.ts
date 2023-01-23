export default {
  secret: process.env.JWT_SECRET ?? 'default',
  refrehSecret: process.env.JWT_SECRET ?? 'default',
  accessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '1d',
  refreshExpiresInDays: process.env.JWT_REFRESH_DURATION_IN_DAYS ? Number(process.env.JWT_REFRESH_DURATION_IN_DAYS) : 30,
  entropy: process.env.PASSWORD_ENTROPY ? Number(process.env.PASSWORD_ENTROPY) : 8,
}
