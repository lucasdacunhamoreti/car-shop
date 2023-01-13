import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import routes from './Routes/Routes';

// class App {
//   public app: express.Express;

//   constructor() {
//     this.app = express();
//     this.config();
//     this.routes();
//   }

//   private config(): void {
//     this.app.use(express.json());     
//   }

//   private routes(): void {
//     this.app.use(routes);
//     this.app.use(ErrorHandler.handle);
//   }

//   public start(PORT: number): void {
//     this.app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
//   }
// }

// export default App;

// Instância utilizada para testes
// export const { app } = new App();

const app = express();
app.use(express.json());
app.use(routes);
app.use(ErrorHandler.handle);

export default app;