import express from 'express';
import Bot from './Bot/bot';

class App {
  constructor() {
    this.server = express();
    this.bot = new Bot();
  }
}

export default new App();