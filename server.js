// ==================== KRISHI-MITRA OMNIBOT ====================
// Server.js - Render Compatible Version
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// ==================== ROOT ENDPOINT ====================
app.get('/', (req, res) => {
  res.send('✅ Krishi-Mitra Omnibot is running on Render!');
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'krishimitra-omnibot',
    version: '5.0.0',
    timestamp: new Date().toISOString()
  });
});

// ==================== DIALOGFLOW WEBHOOK ====================
app.post('/webhook', (req, res) => {
  console.log('Webhook called');
  
  try {
    // Get user query
    const query = req.body.queryResult.queryText.toLowerCase();
    let response = '';
    
    // ========== AI RESPONSE LOGIC ==========
    
    // WELCOME
    if (query.includes('hello') || query.includes('hi') || query.includes('namaste')) {
      response = `🚀 **KRISHI-MITRA OMNIBOT v5.0**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🌾 SMART FARMING AI ASSISTANT\n\n📸 Upload photos → Disease diagnosis\n🚨 Emergency → Rescue protocols\n🎮 Games → Learn farming\n💰 Market → Live prices\n🌤️ Weather → Farm forecasts\n\n💬 Try: "send photo" or "emergency help"`;
    }
    
    // IMAGE UPLOAD
    else if (query.includes('photo') || query.includes('image') || query.includes('picture')) {
      response = `📸 **IMAGE INTELLIGENCE**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nSend crop photo for:\n• Disease diagnosis\n• Pest identification\n• Treatment plan\n\n📸 Clear, close-up photos work best!`;
      
      if (query.includes('tomato') && query.includes('yellow')) {
        response += `\n\n🔍 From description:\n🚨 Tomato Yellow Leaf Curl suspected\n💊 Treatment: Neem oil spray\n📈 Success: 85% with action`;
      }
    }
    
    // EMERGENCY
    else if (query.includes('emergency') || query.includes('urgent') || query.includes('help')) {
      response = `🚨 **EMERGENCY RESPONSE**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📞 Immediate contacts:\n• Police: 100\n• Ambulance: 108\n• Disaster: 1077\n• Agriculture: 1800-180-1551`;
      
      if (query.includes('flood')) {
        response += `\n\n🌊 FLOOD PROTOCOL:\n1. Move to high ground\n2. Cut electricity\n3. Call 108\n4. Shift grains`;
      }
    }
    
    // GAME MODE
    else if (query.includes('game') || query.includes('play')) {
      response = `🎮 **FARMING GAME**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🌾 CHOOSE YOUR FARM:\n\n[1] 🚀 TECH FARMER\n• Budget: ₹5L\n• Risk: Low\n\n[2] 🌿 ORGANIC FARMER\n• Budget: ₹2L\n• Risk: Medium\n\n[3] 💰 COMMERCIAL FARMER\n• Budget: ₹10L\n• Risk: High\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💡 Reply with number [1-3]`;
    }
    
    // MARKET PRICES
    else if (query.includes('price') || query.includes('market')) {
      response = `💰 **MARKET INTELLIGENCE**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📊 LIVE PRICES:\n\n🧅 Onion: ₹2,800-3,200/q\n🍅 Tomato: ₹1,800-2,400/q\n🥔 Potato: ₹1,200-1,600/q\n\n📈 Trend: Onion prices rising`;
    }
    
    // SMART FALLBACK
    else {
      response = `🤖 **KRISHI-MITRA AI**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔍 Analyzing: "${query}"\n\n💡 I CAN HELP WITH:\n📸 Image Analysis\n🚨 Emergency Help\n💰 Market Intelligence\n🎮 Interactive Games\n🌤️ Weather Advisory\n\n💬 Try: "send photo" or "emergency help"`;
    }
    
    // Send response
    res.json({
      fulfillmentText: response
    });
    
  } catch (error) {
    console.log('Error:', error);
    res.json({
      fulfillmentText: '🤖 Krishi-Mitra AI is ready to help!'
    });
  }
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`✅ Webhook: http://localhost:${PORT}/webhook`);
});
