import {Router} from 'express'
import path from 'path';
import mime from 'mime-types';
import express from 'express';

const __dirname=process.cwd()

export const pages=Router()

pages.use(express.static(path.join(__dirname,
  'dist'), {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.lookup(path) || 'application/octet-stream');
  }
}));

// pages.get('*',
//   async(req, res) => {
//     const filePath = path.join(__dirname, 'dist', `index.html`);
//     res.sendFile(filePath) 
//   }
// );