import React from 'react';
import { COLORS, FONTS } from '../../../constants';

// Hashtags Component
const Hashtags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex gap-2 mb-3">
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="text-sm font-medium"
          style={{ 
            color: COLORS.HighlightText,
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.medium
          }}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

// DateTime Component
const DateTime = ({ dateTime }) => {
  if (!dateTime) return null;
  
  return (
    <div 
      className="text-sm mb-4"
      style={{ 
        color: COLORS.secondaryText,
        fontSize: FONTS.sizes.sm
      }}
    >
      {dateTime}
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  if (!title) return null;
  
  return (
    <h1 
      className="text-2xl font-semibold mb-6"
      style={{ 
        color: COLORS.mainTextColor,
        fontSize: FONTS.sizes['2xl'],
        fontWeight: FONTS.weights.semibold
      }}
    >
      {title}
    </h1>
  );
};

// Images Component
const Images = ({ images, showViewAll = false }) => {
  if (!images || images.length === 0) return null;
  
  const renderPlaceholder = () => (
    <div 
      className="w-full h-48 rounded-lg flex items-center justify-center text-sm"
      style={{ 
        backgroundColor: COLORS.stroke,
        color: COLORS.secondaryText
      }}
    >
      <div className="grid grid-cols-8 gap-1 w-full h-full p-2">
        {Array.from({ length: 64 }, (_, i) => (
          <div 
            key={i}
            className={`w-full h-full ${i % 2 === 0 ? 'bg-white' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="flex gap-4 mb-6">
      {images.map((image, index) => (
        <div key={index} className="flex-1">
          {image ? (
            <img 
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            renderPlaceholder()
          )}
        </div>
      ))}
      {showViewAll && (
        <div className="flex items-center">
          <button 
            className="text-sm underline"
            style={{ 
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.sm
            }}
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

// Content Component
const Content = ({ content }) => {
  if (!content) return null;
  
  return (
    <div 
      className="text-base leading-relaxed mb-8"
      style={{ 
        color: COLORS.mainTextColor,
        fontSize: FONTS.sizes.base,
        lineHeight: '1.6'
      }}
    >
      {content}
    </div>
  );
};

// Single Reply Component
const Reply = ({ reply }) => {
  if (!reply) return null;
  
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 overflow-hidden">
        {reply.avatar ? (
          <img 
            src={reply.avatar}
            alt={`${reply.username} avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor: COLORS.primary }}
          >
            {reply.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="font-medium"
            style={{ 
              color: COLORS.mainTextColor,
              fontSize: FONTS.sizes.sm,
              fontWeight: FONTS.weights.medium
            }}
          >
            {reply.username}
          </span>
          <span 
            className="text-sm"
            style={{ 
              color: COLORS.secondaryText,
              fontSize: FONTS.sizes.sm
            }}
          >
            {reply.timestamp}
          </span>
        </div>
        <div 
          className="text-sm leading-relaxed"
          style={{ 
            color: COLORS.mainTextColor,
            fontSize: FONTS.sizes.sm,
            lineHeight: '1.5'
          }}
        >
          {reply.content}
          {reply.readMore && (
            <span 
              className="underline cursor-pointer ml-1"
              style={{ color: COLORS.primary }}
            >
              Read More
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Replies Component
const Replies = ({ replies, title = "Replies" }) => {
  if (!replies || replies.length === 0) return null;
  
  return (
    <div className="border-t pt-6" style={{ borderColor: COLORS.border }}>
      <h3 
        className="text-lg font-medium mb-4"
        style={{ 
          color: COLORS.mainTextColor,
          fontSize: FONTS.sizes.lg,
          fontWeight: FONTS.weights.medium
        }}
      >
        {title}
      </h3>
      {replies.map((reply, index) => (
        <Reply key={index} reply={reply} />
      ))}
    </div>
  );
};

// Main CommunityPost Component
const CommunityPost = ({ 
  hashtags, 
  dateTime, 
  header, 
  images, 
  content, 
  replies,
  showViewAll = false,
  className = ""
}) => {
  return (
    <div 
      className={`max-w-4xl mx-auto p-6 rounded-lg ${className}`}
      style={{ 
        backgroundColor: COLORS.background,
        fontFamily: FONTS.family.sans,
        borderColor: '#3b82f6'
      }}
    >
      <Hashtags tags={hashtags} />
      <DateTime dateTime={dateTime} />
      <Header title={header} />
      <Images images={images} showViewAll={showViewAll} />
      <Content content={content} />
      <Replies replies={replies} />
    </div>
  );
};

export { CommunityPost, Hashtags, DateTime, Header, Images, Content, Replies, Reply };