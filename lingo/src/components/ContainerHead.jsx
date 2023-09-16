import React from 'react';

const ContainerHead = ({ videoTitle }) => {
  return videoTitle ? <h5 className='video-title'>{videoTitle}</h5> : null;
}

export default ContainerHead;