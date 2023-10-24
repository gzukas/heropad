import { useEffect } from 'react';
import { useSetSettings } from '@react-sigma/core';
import { useEdgeReducer, useNodeReducer } from '../../hooks';

export function GraphSettings() {
  const setSettings = useSetSettings();
  const nodeReducer = useNodeReducer();
  const edgeReducer = useEdgeReducer();

  useEffect(() => {
    setSettings({
      nodeReducer,
      edgeReducer
    });
  }, [setSettings, nodeReducer, edgeReducer]);

  return null;
}
