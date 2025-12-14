// 🚀 KRISHI-MITRA OMNIBOT - NEXT LEVEL MULTIMODAL EDITION

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

// ===================== FILE STORAGE =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// ===================== UTIL =====================
function section(title) {
  return `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${title}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
}

// ===================== AI HANDLERS =====================
function textAI(text) {
  return (
    section('💬 TEXT INTELLIGENCE') +
    `You said:
"${text}"

AI ACTIONS
• Context analysis
• Knowledge lookup
• Decision support
`
  );
}

function imageAI(file) {
  return (
    section('📸 IMAGE INTELLIGENCE') +
    `Image received successfully.

FILE DETAILS
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI CAPABILITIES
• Crop disease detection
• Pest identification
• Leaf color analysis
• Growth stage prediction

NEXT STEP
• AI vision model processing ready
`
  );
}

function audioAI(file) {
  return (
    section('🎤 AUDIO INTELLIGENCE') +
    `Audio received successfully.

FILE DETAILS
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI CAPABILITIES
• Speech-to-text
• Emotion detection
• Stress analysis
• Language detection

NEXT STEP
• Voice AI pipeline ready
`
  );
}

function videoAI(file) {
  return (
    section('🎬 VIDEO INTELLIGENCE') +
    `Video received successfully.

FILE DETAILS
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI CAPABILITIES
• Pest movement tracking
• Crop growth timelapse
• Irrigation efficiency
• Damage assessment

NEXT STEP
• Frame-by-frame AI analysis ready
`
  );
}

function documentAI(file) {
  return (
    section('📄 DOCUMENT INTELLIGENCE') +
    `Document received successfully.

FILE DETAILS
• Name: ${file.originalname}
• Type: ${file.mimetype}

AI CAPABILITIES
• OCR (text extraction)
• Form auto-fill
• Govt scheme linking
• Error detection

NEXT STEP
• Document AI processing ready
`
  );
}

// ===================== MULTIMODAL WEBHOOK =====================
app.post(
  '/webhook',
  upload.single('file'), // accepts optional file
  (req, res) => {
    try {
      let reply = '';

      // 1️⃣ TEXT INPUT
      if (req.body.text) {
        reply = textAI(req.body.text.toLowerCase());
      }

      // 2️⃣ FILE INPUT
      else if (req.file) {
        const type = req.file.mimetype;

        if (type.startsWith('image/')) {
          reply = imageAI(req.file);
        } 
        else if (type.startsWith('audio/')) {
          reply = audioAI(req.file);
        } 
        else if (type.startsWith('video/')) {
          reply = videoAI(req.file);
        } 
        else {
          reply = documentAI(req.file);
        }
      }

      // 3️⃣ FALLBACK
      else {
        reply =
          section('🤖 KRISHI-MITRA NEXT LEVEL AI') +
          `Send:
• Text message
• Crop image
• Voice problem
• Field video
• PDF / document
`;
      }

      res.json({ fulfillmentText: reply });

    } catch (err) {
      res.json({ fulfillmentText: 'System error. Try again.' });
    }
  }
);

// ===================== HEALTH =====================
app.get('/health', (req, res) => {
  res.json({
    status: 'NEXT_LEVEL_OPERATIONAL',
    uptime: process.uptime()
  });
});

// ===================== START =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Krishi-Mitra NEXT LEVEL AI running on ${PORT}`);
});
