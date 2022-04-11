module.exports = {
  extends: ["standard", "prettier"],
  rules: {
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
  },
};
