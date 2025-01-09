import React, { Suspense } from 'react';
import { Avatar, AvatarProps, styled } from '@mui/material';
import { useAtomValue } from 'jotai';
import { graphAtom } from '~/atoms/graphAtom';
import { useGetCommunityColor } from '~/hooks/useGetCommunityColor';

const HeroAvatarImage = styled(Avatar, { name: 'HeroAvatar' })({
  background: 'var(--HeroAvatar-background)'
});

export type HeroAvatarProps<C extends React.ElementType> = Omit<
  AvatarProps<C, { component?: C }>,
  'src'
> &
  React.RefAttributes<HTMLDivElement> & {
    hero: string;
  };

export function HeroAvatarInner<C extends React.ElementType>({
  ref,
  ...props
}: HeroAvatarProps<C>) {
  const { hero, ...other } = props;
  const graph = useAtomValue(graphAtom);
  const getCommunityColor = useGetCommunityColor();
  const { name, image } = graph.getNodeAttributes(hero);

  return (
    <HeroAvatarImage
      ref={ref}
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
    <Suspense fallback={<HeroAvatarImage {...props} />}>
      <HeroAvatarInner {...props} />
    </Suspense>
  );
}
