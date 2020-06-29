import React, { useState, useEffect, useRef } from 'react';

import waveSVG from '../../../img/wave.svg';
import pauseSVG from '../../../img/pause.svg';
import playSVG from '../../../img/play.svg';
import { convertToTime } from '../../../utils/helpers';

const AudioElem = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const audioElem = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioElem.current.pause();
    } else {
      audioElem.current.play();
    }
  };

  useEffect(() => {
    audioElem.current.addEventListener(
      'playing',
      () => {
        setIsPlaying(true);
      },
      false
    );
    audioElem.current.addEventListener(
      'ended',
      () => {
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);
      },
      false
    );
    audioElem.current.addEventListener(
      'pause',
      () => {
        setIsPlaying(false);
      },
      false
    );
    audioElem.current.addEventListener(
      'timeupdate',
      () => {
        const duration = audioElem.current.duration || 0;
        const currentTime = audioElem.current.currentTime;
        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100);
      },
      false
    );
  }, []);
  return (
    <div className='message__audio'>
      <audio ref={audioElem} src={audioSrc} preload='auto' />
      <div
        className='message__audio-progress'
        style={{ width: `${progress}%` }}
      />
      <div className='message__audio-info'>
        <div className='message__audio-btn'>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <img src={pauseSVG} alt='pause' />
            ) : (
              <img src={playSVG} alt='play' />
            )}
          </button>
        </div>
        <div className='message__audio-wave'>
          <img src={waveSVG} alt='wave' />
        </div>
        <span className='message__audio-duration'>
          {convertToTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

export default AudioElem;
