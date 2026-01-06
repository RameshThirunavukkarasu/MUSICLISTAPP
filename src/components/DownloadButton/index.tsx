import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Song } from '../../types/song';
import { styles } from './DownloadButton.styles';

interface DownloadButtonProps {
  song: Song;
  size?: 'small' | 'default';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ song, size = 'default' }) => {
  const handlePress = () => {
    console.log(song);
  };

  const iconSize = size === 'small' ? 20 : 24;

  return (
    <TouchableOpacity 
      style={styles.iconButton} 
      onPress={handlePress} 
      activeOpacity={0.7}
    >
      <Svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none">
        <Path
          d="M45.501 32.5V41.1673C45.501 42.3167 45.0444 43.419 44.2317 44.2317C43.419 45.0444 42.3167 45.501 41.1673 45.501H10.8317C9.68235 45.501 8.58006 45.0444 7.76735 44.2317C6.95463 43.419 6.49805 42.3167 6.49805 41.1673V32.5"
          stroke="#5e5c5c"
          strokeWidth="4.33366"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M36.8343 21.6659L26.0002 32.5L15.166 21.6659"
          stroke="#5e5c5c"
          strokeWidth="4.33366"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M26 32.5V6.49805"
          stroke="#5e5c5c"
          strokeWidth="4.33366"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default DownloadButton;
