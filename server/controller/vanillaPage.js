import { Router } from "express";
import express from "express";
import mime from 'mime-types';

export const vanillaPage=Router();
import path from 'path';

const __dirname=process.cwd()

vanillaPage.use(express.static(path.join(__dirname,
  'public2'), {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.lookup(path) || 'application/octet-stream');
  }
}));

vanillaPage.get('/', (req, res)=>
  res.sendFile(path.join(__dirname, './public2/home2.html'))
)

