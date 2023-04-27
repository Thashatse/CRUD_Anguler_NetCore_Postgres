const PROXY_CONFIG = [
  {
    context: [
      "/Contacts",
    ],
    target: "https://localhost:7119",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
