import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { useAtomValue } from 'jotai';
import { graphAtom } from '~/atoms';

export interface HeroAvatarProps extends Omit<AvatarProps, 'src'> {
  hero: string;
}

export const HeroAvatar = React.forwardRef<HTMLDivElement, HeroAvatarProps>(
  (props, ref) => {
    const { hero, ...other } = props;
    const graph = useAtomValue(graphAtom);
    const src = graph.getNodeAttribute(hero, 'image');

    return <Avatar ref={ref} src={src} {...other} />;
  }
);
