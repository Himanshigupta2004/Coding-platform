const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors=require('cors');
const mysql=require('mysql2');
const questionRoutes = require('./routes/fetchquestions');
const code=Routes = require('./routes/codeRoutes');
require('dotenv').config();
const app = express();
app.use(cors());

app.use(express.json());


//mongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Mongo Error:', err));

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/code', code);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
