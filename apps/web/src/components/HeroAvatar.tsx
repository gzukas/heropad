import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { useAtomValue } from 'jotai';
import { graphAtom } from '~/atoms';
import { useGetCommunityColor } from '~/hooks';

export interface HeroAvatarProps extends Omit<AvatarProps, 'src'> {
  hero: string;
}

export const HeroAvatar = React.forwardRef<HTMLDivElement, HeroAvatarProps>(
  (props, ref) => {
    const { hero, sx = [], ...other } = props;
    const graph = useAtomValue(graphAtom);
    const getCommunityColor = useGetCommunityColor();
    const src = graph.getNodeAttribute(hero, 'image');
    return (
      <Avatar
        ref={ref}
        src={src}
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
