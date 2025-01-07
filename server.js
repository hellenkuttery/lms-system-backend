const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Çevresel değişkenler
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Bağlandı!'))
  .catch((err) => console.error(err));

// Basit API Testi
app.get('/', (req, res) => {
  res.send('LMS API çalışıyor!');
});



app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

//swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// MongoDB bağlantısı
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.log("MongoDB bağlantı hatası:", err));

// Swagger UI'yi kullanarak API dökümantasyonu
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes (örnek)
app.get('/api/users', (req, res) => {
  res.json([{ id: '1', name: 'Helen', role: 'admin' }]);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/redoc', (req, res) => {
  res.sendFile(__dirname + '/redoc.html');
});
// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor!`));


