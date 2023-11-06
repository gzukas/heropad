import { useEffect } from 'react';
import { useRegisterEvents } from '@react-sigma/core';
import { useSetAtom } from 'jotai';
import { debouncedHoveredAtom } from '~/atoms';
import { useNavigate } from '@tanstack/react-router';

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
