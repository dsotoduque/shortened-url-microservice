import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'; // Import the cors package


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Or specific methods
    allowedHeaders: ['Content-Type'], // Or specific headers
    credentials: true, // Important if you need to send cookies or use Authorization headers
  };
  app.use(cors(corsOptions)); // Apply CORS middleware
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
