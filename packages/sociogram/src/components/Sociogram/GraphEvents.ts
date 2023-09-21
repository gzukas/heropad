import { useEffect } from 'react';
import { useRegisterEvents } from '@react-sigma/core';
import { useSetAtom } from 'jotai';
import { debouncedHoveredAtom } from '../../atoms';

export function GraphEvents() {
  const registerEvents = useRegisterEvents();
  const setDebouncedHoveredNode = useSetAtom(debouncedHoveredAtom);

  useEffect(() => {
    registerEvents({
      enterNode({ node }) {
        setDebouncedHoveredNode(node);
      },
      leaveNode() {
        setDebouncedHoveredNode(null);
      }
    });
  }, [registerEvents]);

  return null;
}
