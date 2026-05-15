module.exports = {
  apps: [
    {
      name: "kasa-site",
      script: "npm",
      args: "run start",
      cwd: "/opt/kasa/kasa-site",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      max_memory_restart: "512M",
    },
  ],
};
