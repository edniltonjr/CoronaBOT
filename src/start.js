import  venomService from './services/venom';
import express from 'express';
import path from 'path'
import { http } from './http';

export const init = async () => {
  venomService();
  http.use('/qrcode', express.static(path.resolve(__dirname, '..')))
};
