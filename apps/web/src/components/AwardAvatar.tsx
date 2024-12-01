import { Badge, Tooltip } from '@mui/material';
import { HeroAvatar } from './HeroAvatar';
import { useHero } from '~/hooks/useHero';

export interface AwardAvatarProps {
  from: string;
  to: string;
}

export function AwardAvatar(props: AwardAvatarProps) {
  const { from, to } = props;
  const toHero = useHero(to);
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Tooltip title={toHero.name}>
          <HeroAvatar
            hero={to}
            sx={{
              border: '2px solid',
              borderColor: 'background.paper',
              width: 24,
              height: 24
            }}
          />
        </Tooltip>
      }
    >
      {from ? <HeroAvatar hero={from} /> : null}
    </Badge>
  );
}
