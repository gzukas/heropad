import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Listener, SigmaEvents } from 'sigma/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { debouncedHoveredAtom } from '~/atoms/hoveredNodeAtom';
import { sigmaAtom } from '~/atoms/sigmaAtom';

export function GraphEvents() {
  const navigate = useNavigate();
  const setDebouncedHoveredNode = useSetAtom(debouncedHoveredAtom);
  const sigma = useAtomValue(sigmaAtom);

  useEffect(() => {
    const subscribe = (events: Partial<SigmaEvents>) => {
      const entries = Object.entries(events) as Array<
        [keyof typeof events, Listener]
      >;
      for (const [event, listener] of entries) {
        sigma?.on(event, listener);
      }
      return () => {
        for (const [event, listener] of entries) {
          sigma?.off(event, listener);
        }
      };
    };
    return subscribe({
      enterNode({ node }) {
        setDebouncedHoveredNode(node);
      },
      leaveNode() {
        setDebouncedHoveredNode(null);
      },
      clickNode({ node }) {
        navigate({ to: '/$hero', params: { hero: node } });
      },
      clickStage() {
        navigate({ to: '/' });
      }
    });
  }, [sigma, navigate, setDebouncedHoveredNode]);

  return null;
}
