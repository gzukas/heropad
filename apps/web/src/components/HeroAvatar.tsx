import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { useAtomValue } from 'jotai';
import { graphAtom } from '~/atoms';
import { useAppStore } from '~/context';

export interface HeroAvatarProps extends Omit<AvatarProps, 'src'> {
  hero: string;
}

export const HeroAvatar = React.forwardRef<HTMLDivElement, HeroAvatarProps>(
  (props, ref) => {
    const { hero, ...other } = props;
    const store = useAppStore();
    const graph = useAtomValue(graphAtom, { store });
    const src = graph.getNodeAttribute(hero, 'image');

    return (
      <Avatar
        ref={ref}
        src={src}
        imgProps={{ crossOrigin: 'anonymous' }}
        {...other}
      />
    );
  }
);
