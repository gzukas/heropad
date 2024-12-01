import { Typography, TypographyProps } from '@mui/material';
import { useGetCommunityColor } from '~/hooks/useGetCommunityColor';
import { useHero } from '~/hooks/useHero';

export type HeroProps<C extends React.ElementType> = TypographyProps<
  C,
  { component?: C }
> & {
  hero: string;
};

export function Hero<C extends React.ElementType>(props: HeroProps<C>) {
  const { hero: heroProp, ...other } = props;
  const getCommunityColor = useGetCommunityColor();
  const hero = useHero(heroProp);

  return (
    <Typography
      color="var(--Hero-color)"
      style={{ '--Hero-color': getCommunityColor(heroProp) }}
      {...other}
    >
      {hero.name}
    </Typography>
  );
}
