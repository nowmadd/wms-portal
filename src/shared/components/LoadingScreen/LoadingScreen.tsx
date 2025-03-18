import React from 'react';

const LoadingScreen = () => {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ' .loading {  position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%) scale(8);}.loading svg polyline {  fill: none;  stroke-width: 2;  stroke-linecap: round;  stroke-linejoin: round;}.loading svg polyline#back {  stroke: #BDAADC;}.loading svg polyline#front {  stroke: #865CBD;  stroke-dasharray: 12, 36;  stroke-dashoffset: 48;  animation: dash 1s linear infinite;}@-moz-keyframes dash {  62.5% {    opacity: 1;  }  to {    stroke-dashoffset: 0;  }}@-webkit-keyframes dash {  62.5% {    opacity: 1;  }  to {    stroke-dashoffset: 0;  }}@-o-keyframes dash {  62.5% {    opacity: 1;  }  to {    stroke-dashoffset: 0;  }}@keyframes dash {  62.5% {    opacity: 1;  }  to {    stroke-dashoffset: 0;  }}',
        }}
      />
      <div className="loading">
        <svg width="32px" height="14px">
          <polyline id="back" points="2 12 8 12 8 6 12 2 24 2 24 12 30 12" />
          <polyline id="front" points="2 12 8 12 8 6 12 2 24 2 24 12 30 12" />
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
