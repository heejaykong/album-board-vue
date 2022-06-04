const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  // cors 에러 해결을 위한 프록시 서버 설정
  devServer: {
    proxy: "http://localhost:82",
  },
});
