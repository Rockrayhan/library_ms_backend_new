import express, { Application, Request, Response } from "express";

import cors from 'cors';
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
import { handleWebhook, paymentWebhook } from "./app/modules/payment/payment.webhook";

const app: Application = express();

// app.post("/payment/webhook", paymentWebhook, handleWebhook);
app.post("/payment/webhook", express.raw({ type: "application/json" }), handleWebhook);



app.use(cookieParser());
app.use(express.json());


// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://lms-nextjs-frontend.vercel.app"],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//     exposedHeaders: ['Set-Cookie'],
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin: ["http://localhost:3000", "https://lms-nextjs-frontend.vercel.app"],
    credentials: true,
  })
);








app.use("/api", router)



app.use(globalErrorHandler);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
