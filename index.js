import { server } from './src/app.js';
import { conn } from './src/db.js';
import './config.js';

const PORT = 3001;

server.listen(PORT, async () => {
    await conn.sync({ force: false });
    console.log(`Listening on port ${PORT}`)
});