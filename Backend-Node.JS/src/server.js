import express from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import bodyParser from 'body-parser';
import multer from 'multer';

require('dotenv').config();

const app = express();

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

// Export app for testing
export default app;

// Only listen if this file is run directly
if (require.main === module) {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


