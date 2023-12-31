import { Badge } from '@mui/material';
import { HeroAvatar } from './HeroAvatar';

export interface AwardAvatarProps {
  from: string;
  to: string;
}

export function AwardAvatar(props: AwardAvatarProps) {
  const { from, to } = props;
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <HeroAvatar
          hero={to}
          sx={{
            border: '2px solid',
            borderColor: 'background.paper',
            width: 24,
            height: 24
          }}
        />
      }
    >
      {from ? <HeroAvatar hero={from} /> : null}
    </Badge>
  );
}
