import React from 'react';

const CardPreview = ({ cardData, generatedCard, onDownload, onShare }) => {
  const renderPreviewCard = () => {
    const styles = {
      background: cardData.backgroundColor,
      color: cardData.textColor,
      fontFamily: cardData.fontFamily,
      fontSize: `${cardData.fontSize}px`,
      border: '3px solid #333',
      borderRadius: '8px',
      padding: '40px',
      minHeight: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    };

    return (
      <div style={styles}>
        <div className="mb-4 text-4xl">
          {cardData.templateType === 'lantern' && '🏮'}
          {cardData.templateType === 'lotus' && '🪷'}
          {cardData.templateType === 'buddha' && '🙏'}
        </div>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
          Vesak Blessings
        </h2>
        <p style={{ fontSize: cardData.fontSize, whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
          {cardData.message}
        </p>
        {cardData.senderName && (
          <p style={{ fontSize: '18px', marginTop: '30px', fontStyle: 'italic' }}>
            — {cardData.senderName}
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview</h2>
      
      {generatedCard ? (
        <div className="card-preview generated">
          <img
            src={`http://localhost:5000${generatedCard.cardUrl}`}
            alt="Generated Vesak Card"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
          <div className="button-group mt-6">
            <button
              onClick={onDownload}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              📥 Download
            </button>
            <button
              onClick={onShare}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              🔗 Share
            </button>
          </div>
        </div>
      ) : (
        <div className="card-preview">
          {renderPreviewCard()}
          <p className="text-gray-400 mt-4">Click "Generate Card" to create your card</p>
        </div>
      )}
    </div>
  );
};

export default CardPreview;
