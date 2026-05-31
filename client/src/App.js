import React, { useState } from 'react';
import CardEditor from './components/CardEditor';
import CardPreview from './components/CardPreview';
import './App.css';

function App() {
  const [cardData, setCardData] = useState({
    message: 'Happy Vesak!',
    senderName: 'Your Name',
    backgroundColor: '#FFE4B5',
    textColor: '#000000',
    fontFamily: 'Arial',
    fontSize: 28,
    templateType: 'lotus'
  });

  const [generatedCard, setGeneratedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCardDataChange = (newData) => {
    setCardData({ ...cardData, ...newData });
  };

  const handleGenerateCard = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedCard(data);
      } else {
        alert('Error generating card: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating card');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCard = () => {
    if (generatedCard) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${generatedCard.cardUrl}`;
      link.download = 'vesak-card.png';
      link.click();
    }
  };

  const handleShareCard = async () => {
    if (generatedCard) {
      try {
        const response = await fetch('http://localhost:5000/api/share-card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cardFileName: generatedCard.fileName,
            message: cardData.message,
            recipientEmail: prompt('Enter recipient email:')
          })
        });

        const data = await response.json();
        if (data.success) {
          alert('Card shared! Share URL: ' + data.shareUrl);
          navigator.clipboard.writeText(data.shareUrl);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error sharing card');
      }
    }
  };

  return (
    <div className="App bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-2">🏮 Vesak Card Generator 🏮</h1>
        <p className="text-center text-gray-600 mb-8">Create beautiful Vesak greeting cards</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CardEditor 
              cardData={cardData} 
              onCardDataChange={handleCardDataChange}
              onGenerateCard={handleGenerateCard}
              loading={loading}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CardPreview 
              cardData={cardData}
              generatedCard={generatedCard}
              onDownload={handleDownloadCard}
              onShare={handleShareCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
