// 🚀 KRISHI-MITRA – RENDER SAFE MULTIMODAL SERVER

const express = require('express');
const multer = require('multer');

const app = express();

// IMPORTANT: order matters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer (Render safe)
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// ===================== UTIL =====================
function section(title) {
  return `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${title}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
}

// ===================== AI HANDLERS =====================
function textAI(text) {
  return (
    section('💬 TEXT INPUT RECEIVED') +
`"${text}"

AI STATUS
• Text understood
• Ready for analysis
`
  );
}

function imageAI(file) {
  return (
    section('📸 IMAGE INPUT RECEIVED') +
`FILE INFO
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI READY
• Disease detection
• Pest analysis
`
  );
}

function audioAI(file) {
  return (
    section('🎤 AUDIO INPUT RECEIVED') +
`FILE INFO
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI READY
• Speech to text
• Emotion analysis
`
  );
}

function videoAI(file) {
  return (
    section('🎬 VIDEO INPUT RECEIVED') +
`FILE INFO
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI READY
• Motion tracking
• Damage analysis
`
  );
}

function documentAI(file) {
  return (
    section('📄 DOCUMENT INPUT RECEIVED') +
`FILE INFO
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI READY
• OCR
• Data extraction
`
  );
}

// ===================== WEBHOOK =====================
app.post('/webhook', upload.single('file'), (req, res) => {
  try {
    let reply = '';

    if (req.body && req.body.text) {
      reply = textAI(req.body.text);
    }
    else if (req.file) {
      const type = req.file.mimetype || '';

      if (type.startsWith('image/')) reply = imageAI(req.file);
      else if (type.startsWith('audio/')) reply = audioAI(req.file);
      else if (type.startsWith('video/')) reply = videoAI(req.file);
      else reply = documentAI(req.file);
    }
    else {
      reply =
        section('🤖 KRISHI-MITRA AI ONLINE') +
`Send:
• Text
• Image
• Audio
• Video
• PDF
`;
    }

    res.status(200).json({ fulfillmentText: reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ fulfillmentText: 'Internal server error' });
  }
});

// ===================== HEALTH =====================
app.get('/', (req, res) => {
  res.send('✅ Krishi-Mitra AI is running');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// ===================== START =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
