# 🏮 Vesak Card Generator

A full-stack web application to create and share beautiful Vesak greeting cards.

## Features

✅ **Customizable Messages** - Add your own text and greetings
✅ **Multiple Templates** - Choose from Lantern, Lotus, or Buddha designs
✅ **Color Customization** - Pick background and text colors
✅ **Font Selection** - Choose from 6 different fonts
✅ **Adjustable Font Size** - Scale text from 16px to 48px
✅ **Download Cards** - Save cards as PNG images
✅ **Share Cards** - Generate shareable links for your cards
✅ **Responsive Design** - Works on desktop and tablet

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Color Picker

### Backend
- Node.js & Express
- Canvas (for image generation)
- Multer (for file uploads)
- CORS enabled

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nirmalpubuduofficial-design/vesak-card-generator.git
   cd vesak-card-generator
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Create .env file**
   ```bash
   cp .env.example .env
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (http://localhost:3000) and Node.js backend (http://localhost:5000)

## Project Structure

```
vestak-card-generator/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CardEditor.js     # Card customization form
│   │   │   └── CardPreview.js    # Card preview & download
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                    # Node.js backend
│   ├── controllers/
│   │   └── cardController.js  # Card generation logic
│   ├── routes/
│   │   └── cardRoutes.js      # API routes
│   └── index.js              # Server entry point
├── uploads/                   # Generated card images
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### POST /api/generate-card
Generate a Vesak card image

**Request body:**
```json
{
  "message": "Happy Vesak!",
  "senderName": "Your Name",
  "backgroundColor": "#FFE4B5",
  "textColor": "#000000",
  "fontFamily": "Arial",
  "fontSize": 28,
  "templateType": "lotus"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Card generated successfully",
  "cardUrl": "/uploads/card_xyz.png",
  "fileName": "card_xyz.png"
}
```

### POST /api/share-card
Create a shareable link for a card

**Request body:**
```json
{
  "cardFileName": "card_xyz.png",
  "message": "Happy Vesak!",
  "recipientEmail": "recipient@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Card shared successfully",
  "shareUrl": "http://localhost:3000/card/token123",
  "shareToken": "token123"
}
```

## Usage

1. **Customize Your Card**
   - Enter your message
   - Add your name
   - Select a template
   - Choose colors and fonts
   - Adjust font size

2. **Generate Card**
   - Click "✨ Generate Card" button
   - Wait for the card to be generated
   - Preview will update with the generated image

3. **Download or Share**
   - Click "📥 Download" to save as PNG
   - Click "🔗 Share" to create a shareable link

## Future Enhancements

- [ ] Email integration for sharing cards
- [ ] User accounts and saved cards
- [ ] More template designs
- [ ] Image upload support
- [ ] Animation effects
- [ ] Social media sharing
- [ ] Print optimization
- [ ] Database integration

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

**Celebrate Vesak with beautiful cards!** 🏮🪷🙏
