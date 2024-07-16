import { useEffect } from 'react';
import { useRegisterEvents } from '@react-sigma/core';
import { useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { debouncedHoveredAtom } from '~/atoms/hoveredNodeAtom';

export function GraphEvents() {
  const registerEvents = useRegisterEvents();
  const navigate = useNavigate();
  const setDebouncedHoveredNode = useSetAtom(debouncedHoveredAtom);

  useEffect(() => {
    registerEvents({
      enterNode({ node }) {
        setDebouncedHoveredNode(node);
      },
      leaveNode() {
        setDebouncedHoveredNode(null);
      },
      clickNode({ node }) {
        navigate({
          to: '/$hero',
          params: { hero: node }
        });
      },
      clickStage() {
        navigate({ to: '/' });
      }
    });
  }, [registerEvents, navigate, setDebouncedHoveredNode]);

  return null;
}
