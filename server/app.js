const express =require('express');
const app=express();
const PORT=5000;
const cors=require('cors')
const router=require("./Routes/Route");
const adminrouter=require("./Routes/Admin-Route")
const errorMiddleware=require('./middlewares/error-middleware')
const connectDB=require('./utils/db')
connectDB();

var corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json())

app.use('/api/auth',router);
app.use('/api/admin',adminrouter);

app.use(errorMiddleware);
app.listen(PORT,() => {
    console.log(`Example app listening on http://localhost:${PORT}`)
  })