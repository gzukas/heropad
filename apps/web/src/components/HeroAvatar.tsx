import React, { Suspense } from 'react';
import { Avatar, AvatarProps, Skeleton, styled } from '@mui/material';
import { useAtomValue } from 'jotai';
import { graphAtom } from '~/atoms/graphAtom';
import { useGetCommunityColor } from '~/hooks/useGetCommunityColor';

const HeroAvatarImage = styled(Avatar, {
  name: 'HeroAvatar',
  shouldForwardProp: prop => prop !== 'hero'
})({
  background: 'var(--HeroAvatar-background)'
});

export type HeroAvatarProps<C extends React.ElementType> = Omit<
  AvatarProps<C, { component?: C }>,
  'src'
> & {
  hero: string;
};

export function HeroAvatarInner<C extends React.ElementType>(
  props: HeroAvatarProps<C>
) {
  const { hero, ...other } = props;
  const graph = useAtomValue(graphAtom);
  const getCommunityColor = useGetCommunityColor();
  const { name, image } = graph.getNodeAttributes(hero);

  return (
    <HeroAvatarImage
      src={image}
      alt={name}
      style={{
        '--HeroAvatar-background': getCommunityColor(hero)
      }}
      {...other}
    />
  );
}

export function HeroAvatar<C extends React.ElementType>(
  props: HeroAvatarProps<C>
) {
  return (
    <Suspense
      fallback={
        <Skeleton variant="circular">
          <HeroAvatarImage {...props} />
        </Skeleton>
      }
    >
      <HeroAvatarInner {...props} />
    </Suspense>
  );
}
