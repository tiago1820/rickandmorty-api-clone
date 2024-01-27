const server = require("./src/app");
const PORT = 7001;

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

