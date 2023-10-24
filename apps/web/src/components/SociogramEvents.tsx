import { useEffect } from 'react';
import { useRegisterEvents } from '@react-sigma/core';
import { useNavigate } from '@tanstack/react-router';

export function SociogramEvents() {
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
      },
      clickStage() {
        navigate({ to: '/' });
      }
    });
  }, [registerEvents]);

  return null;
}
