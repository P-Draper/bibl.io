import React from 'react';

const ContainerHead = ({ videoTitle, newRender }) => {
  if (newRender) {
    return <h5 className='video-title'></h5>;
  }
  
  return videoTitle ? <h5 className='video-title'>{videoTitle}</h5> : null;
}

export default ContainerHead;
