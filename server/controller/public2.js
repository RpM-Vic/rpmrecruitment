import {Router} from 'express'
import path from 'path';
import mime from 'mime-types';
import express from 'express';

const __dirname=process.cwd()

export const vanillaThreejs=Router()

vanillaThreejs.use(express.static(path.join(__dirname,
  'public2'), {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.lookup(path) || 'application/octet-stream');
  }
}));

vanillaThreejs.get('/home',
  async(req, res) => {
    const filePath = path.join(__dirname, 'public2', `home.html`);
    res.sendFile(filePath) 
  }
);

vanillaThreejs.get('/home2',
  async(req, res) => {
    const filePath = path.join(__dirname, 'public2', `home2.html`);
    res.sendFile(filePath) 
  }
);

// vanillaThreejs
// .get('*',
//   async(req, res) => {
//     const filePath = path.join(__dirname, 'dist', `index.html`);
//     res.sendFile(filePath) 
//   }
// );