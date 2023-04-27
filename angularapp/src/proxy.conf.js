const PROXY_CONFIG = [
  {
    context: [
      "/Contacts",
      "/Token"
    ],
    target: "https://localhost:7119",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
