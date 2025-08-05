import 'dotenv/config';
import express from "express";
import { pages } from "./server/controller/pages.js";
import cors from "cors";
import { sendToDiscord } from './server/sendToDiscord.js';
import { vanillaPage } from './server/controller/vanillaPage.js';
import { forms } from './server/controller/forms.js';

const PORT = process.env.port || 4000;

const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: true }));
app.use('/api',forms);
app.use(vanillaPage)
app.use(pages);

app.post('/submit', (req, res) => {
  const data = req.body;
  sendToDiscord(data);
  res.json({
    ok: false,
    message: "You are too noob"
  });
});

async function startServer() {
  try {
    // Try to connect to MongoDB, but don't fail the server startup if it fails
    try {
      await dbConnection();
      console.log('Connected to database');
    } catch (dbError) {
      console.error('Database connection failed, but continuing to serve pages:', dbError);
    }
    
    // Start the Express server regardless of database connection
    const server = app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server started on http://localhost:${PORT}`);
      }
    });

    // Handle graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(async () => {
        try {
          await closeDBConnection();
        } catch (e) {
          console.error('Error while closing DB connection:', e);
        }
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received. Shutting down gracefully...');
      server.close(async () => {
        try {
          await closeDBConnection();
        } catch (e) {
          console.error('Error while closing DB connection:', e);
        }
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();