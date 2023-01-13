import express from 'express';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());     
  }

  private routes(): void {

  }

  public start(PORT: number): void {
    this.app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  }
}

export { App };

// Instância utilizada para testes

export const { app } = new App();