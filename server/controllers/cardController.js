const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Register custom fonts (optional)
try {
  registerFont(path.join(__dirname, '../../fonts/Arial.ttf'), { family: 'Arial' });
} catch (e) {
  console.log('Font not found, using default fonts');
}

const generateCard = async (req, res) => {
  try {
    const { 
      message, 
      senderName, 
      backgroundColor, 
      textColor, 
      fontFamily, 
      fontSize,
      backgroundImage,
      templateType
    } = req.body;

    // Canvas dimensions
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = backgroundColor || '#FFE4B5';
    ctx.fillRect(0, 0, width, height);

    // Draw decorative border
    ctx.strokeStyle = textColor || '#000';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Draw template-specific elements
    if (templateType === 'lantern') {
      drawLantern(ctx, width, height, textColor);
    } else if (templateType === 'lotus') {
      drawLotus(ctx, width, height, textColor);
    } else if (templateType === 'buddha') {
      drawBuddha(ctx, width, height, textColor);
    }

    // Draw text
    ctx.fillStyle = textColor || '#000';
    ctx.font = `${fontSize || 28}px ${fontFamily || 'Arial'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw main message
    const maxWidth = width - 100;
    const lines = wrapText(message || 'Happy Vesak!', maxWidth, ctx);
    const lineHeight = (fontSize || 28) * 1.5;
    const totalHeight = lines.length * lineHeight;
    let y = height / 2 - totalHeight / 2;

    lines.forEach((line) => {
      ctx.fillText(line, width / 2, y);
      y += lineHeight;
    });

    // Draw sender name
    if (senderName) {
      ctx.font = `16px ${fontFamily || 'Arial'}`;
      ctx.fillText(`From: ${senderName}`, width / 2, height - 40);
    }

    // Save the card
    const fileName = `card_${crypto.randomBytes(8).toString('hex')}.png`;
    const filePath = path.join(uploadsDir, fileName);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, buffer);

    res.json({
      success: true,
      message: 'Card generated successfully',
      cardUrl: `/uploads/${fileName}`,
      fileName
    });
  } catch (error) {
    console.error('Error generating card:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const shareCard = async (req, res) => {
  try {
    const { cardFileName, message, recipientEmail } = req.body;

    // Generate share link
    const shareToken = crypto.randomBytes(16).toString('hex');
    const shareUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/card/${shareToken}`;

    // In a real app, you would:
    // 1. Store the share token in a database with card info
    // 2. Send an email to recipientEmail with the shareUrl
    // 3. Implement a route to display the card from the share token

    res.json({
      success: true,
      message: 'Card shared successfully',
      shareUrl,
      shareToken
    });
  } catch (error) {
    console.error('Error sharing card:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Helper function to wrap text
function wrapText(text, maxWidth, ctx) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// Decorative drawing functions
function drawLantern(ctx, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const lanternX = width / 2;
  const lanternY = height / 4;
  const lanternSize = 60;

  // Draw lantern shape
  ctx.beginPath();
  ctx.arc(lanternX, lanternY, lanternSize, 0, Math.PI * 2);
  ctx.stroke();

  // Draw vertical lines
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x1 = lanternX + Math.cos(angle) * lanternSize;
    const y1 = lanternY + Math.sin(angle) * lanternSize;
    ctx.beginPath();
    ctx.moveTo(lanternX, lanternY);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }
}

function drawLotus(ctx, width, height, color) {
  ctx.fillStyle = color;
  const lotusX = width / 2;
  const lotusY = height / 4;
  const petalSize = 25;

  // Draw lotus petals
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = lotusX + Math.cos(angle) * 40;
    const y = lotusY + Math.sin(angle) * 40;

    ctx.beginPath();
    ctx.ellipse(x, y, petalSize, petalSize * 1.5, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw center
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(lotusX, lotusY, 15, 0, Math.PI * 2);
  ctx.fill();
}

function drawBuddha(ctx, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const buddhaX = width / 2;
  const buddhaY = height / 4;

  // Draw head
  ctx.beginPath();
  ctx.arc(buddhaX, buddhaY - 20, 30, 0, Math.PI * 2);
  ctx.stroke();

  // Draw body
  ctx.beginPath();
  ctx.ellipse(buddhaX, buddhaY + 30, 25, 35, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Draw halo
  ctx.beginPath();
  ctx.arc(buddhaX, buddhaY - 20, 50, 0, Math.PI * 2);
  ctx.stroke();
}

module.exports = {
  generateCard,
  shareCard
};
