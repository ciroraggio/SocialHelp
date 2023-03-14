export const handleTelegramShare = (postUrl) => {
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(postUrl)}`,
    "_blank"
  );
};

export const handleWhatsAppShare = (postUrl) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(postUrl)}`, "_blank");
};

export const handleFacebookShare = (postUrl) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`,
    "_blank"
  );
};
