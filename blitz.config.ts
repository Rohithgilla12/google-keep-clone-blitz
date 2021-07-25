import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
      cookiePrefix: "google-keep-clone-blitz",
    }),
  ],
}

module.exports = config
