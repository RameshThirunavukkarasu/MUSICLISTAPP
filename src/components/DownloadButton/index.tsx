import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Song } from '../../types/song';
import { downloadSong, isSongDownloaded } from '../../utils/downloadManager';
import { styles } from './DownloadButton.styles';

interface DownloadButtonProps {
  song: Song;
  size?: 'small' | 'default';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ song, size = 'default' }) => {
  const [downloading, setDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    checkDownloadStatus();
  }, [song]);

  const checkDownloadStatus = async () => {
    try {
      const downloaded = await isSongDownloaded(song);
      setIsDownloaded(downloaded);
    } catch (error) {
      console.error('Error checking download status:', error);
      setIsDownloaded(false);
    }
  };

  const handlePress = async () => {
    if (downloading || isDownloaded) return;

    if (!song.previewUrl) {
      Alert.alert('Error', 'No song available');
      return;
    }

    try {
      setDownloading(true);
      const filePath = await downloadSong(song);
      setIsDownloaded(true);
      
      const friendlyPath = filePath.includes('Download') 
        ? 'Downloads/MusicListApp folder'
        : filePath.includes('Documents')
        ? 'Files app > MusicListApp folder'
        : 'Downloaded successfully';
      
      Alert.alert(
        'Success',
        `Song downloaded!\n\nLocation: ${friendlyPath}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Download Failed',
        error instanceof Error ? error.message : 'Failed to download',
        [{ text: 'OK' }]
      );
    } finally {
      setDownloading(false);
    }
  };

  const iconSize = size === 'small' ? 20 : 24;
  const iconColor = isDownloaded ? '#b0b0b0' : '#5e5c5c';
  const isDisabled = downloading || isDownloaded;

  return (
    <TouchableOpacity 
      style={[styles.iconButton, isDownloaded && styles.iconButtonDisabled]} 
      onPress={handlePress} 
      activeOpacity={isDownloaded ? 1 : 0.7}
      disabled={isDisabled}
    >
      {downloading ? (
        <ActivityIndicator size="small" color="#5e5c5c" />
      ) : (
        <Svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none" opacity={isDownloaded ? 0.5 : 1}>
        <Path
          d="M45.501 32.5V41.1673C45.501 42.3167 45.0444 43.419 44.2317 44.2317C43.419 45.0444 42.3167 45.501 41.1673 45.501H10.8317C9.68235 45.501 8.58006 45.0444 7.76735 44.2317C6.95463 43.419 6.49805 42.3167 6.49805 41.1673V32.5"
          stroke={iconColor}
          strokeWidth="4.33366"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M36.8343 21.6659L26.0002 32.5L15.166 21.6659"
          stroke={iconColor}
          strokeWidth="4.33366"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M26 32.5V6.49805"
          stroke={iconColor}
          strokeWidth="4.33366"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      )}
    </TouchableOpacity>
  );
};

export default DownloadButton;
