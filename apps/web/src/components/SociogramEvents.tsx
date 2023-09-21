import { useEffect } from 'react';
import { useSigma, useRegisterEvents } from '@react-sigma/core';
import { useNavigate } from '@tanstack/react-router';

export function SociogramEvents() {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const navigate = useNavigate();

  useEffect(() => {
    registerEvents({
      clickNode({ node }) {
        navigate({
          to: '/$hero',
          params: { hero: node },
          search: { direction: 'received' }
        });
      }
    });
  }, [sigma, registerEvents]);

  return null;
}
