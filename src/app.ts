import express, { Application, Request, Response } from "express";

import cors from 'cors';
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
import { handleWebhook, paymentWebhook } from "./app/modules/payment/payment.webhook";

const app: Application = express();

// app.post("/payment/webhook", paymentWebhook, handleWebhook);
app.post("/payment/webhook", express.raw({ type: "application/json" }), handleWebhook);


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://next-portfolio-frontend-pi.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



app.use("/api", router)


// app.post("/payment/webhook", express.raw({ type: "application/json" }), paymentWebhook, handleWebhook);



app.use(globalErrorHandler);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
