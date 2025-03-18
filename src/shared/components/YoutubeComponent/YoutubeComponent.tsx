import React from 'react';

interface Props {
  url: string;
}

const YoutubeComponent: React.FC<Props> = ({ url }) => {
  return (
    <iframe
      allowFullScreen
      src={`https://youtube.com/embed/${url}?autoplay=0`}
      style={{ height: 'calc(20vw)', borderRadius: 18 }}
    />
  );
};

export default YoutubeComponent;
