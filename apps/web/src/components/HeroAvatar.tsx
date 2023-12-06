import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { useAtomValue } from 'jotai';
import { graphAtom } from '~/atoms/graphAtom';
import { useGetCommunityColor } from '~/hooks/useGetCommunityColor';

export interface HeroAvatarProps extends Omit<AvatarProps, 'src'> {
  hero: string;
}

export const HeroAvatar = React.forwardRef<HTMLDivElement, HeroAvatarProps>(
  function HeroAvatar(props, ref) {
    const { hero, sx = [], ...other } = props;
    const graph = useAtomValue(graphAtom);
    const getCommunityColor = useGetCommunityColor();
    const { name, image } = graph.getNodeAttributes(hero);
    return (
      <Avatar
        ref={ref}
        src={image}
        alt={name}
        imgProps={{ crossOrigin: 'anonymous' }}
        sx={[
          {
            bgcolor: getCommunityColor(hero)
          },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
        {...other}
      />
    );
  }
);
