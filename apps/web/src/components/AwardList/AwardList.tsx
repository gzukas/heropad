import * as React from 'react';
import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import {
  Components,
  GroupedVirtuoso,
  GroupedVirtuosoProps
} from 'react-virtuoso';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { Edge } from 'sociogram';
import { AwardAvatar } from '~/components';
import { groupBy } from '~/utils';
import {
  useAwardScroll,
  UseAwardScrollContext,
  UseAwardScrollOptions
} from './useAwardScroll';

function groupByMonth({ givenAt }: Edge) {
  return +new Date(givenAt.getFullYear(), givenAt.getMonth(), 1);
}

const components: Components<any, UseAwardScrollContext> = {
  List: React.forwardRef<HTMLDivElement>((props, ref) => (
    <List
      component="div"
      ref={ref}
      sx={{ backgroundColor: 'inherit' }}
      {...props}
    />
  )),
  Item: ({ context, ...other }) => {
    return (
      <ListItem
        sx={{
          ...(context?.activeAwardIndex === other['data-item-index'] && {
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText'
          })
        }}
        component="div"
        {...other}
      />
    );
  },
  Group: props => (
    <ListSubheader component="div" sx={{ background: 'inherit' }} {...props} />
  )
};

export interface AwardListProps extends UseAwardScrollOptions {
  awards: Edge[];
  GroupedVirtuosoProps?: Omit<
    GroupedVirtuosoProps<unknown, unknown>,
    'context'
  >;
}

export function AwardList(props: AwardListProps) {
  const {
    awards,
    GroupedVirtuosoProps: GroupedVirtuosoPropsProp,
    ...other
  } = props;

  const { i18n } = useLingui();
  const { ref, GroupedVirtuosoProps } = useAwardScroll({
    awards,
    ...other
  });

  const [groups, groupCounts] = useMemo(() => {
    const grouped = groupBy(awards, groupByMonth);
    const groupCounts = [...grouped.values()].map(x => x.length);
    return [[...grouped.keys()], groupCounts];
  }, [awards]);

  return (
    <GroupedVirtuoso<unknown, UseAwardScrollContext>
      ref={ref}
      {...GroupedVirtuosoProps}
      {...GroupedVirtuosoPropsProp}
      components={components}
      groupCounts={groupCounts}
      groupContent={index =>
        i18n.date(new Date(groups[index]), { year: 'numeric', month: 'long' })
      }
      itemContent={index => {
        const award = awards[index];
        return (
          <>
            <ListItemAvatar>
              <AwardAvatar from={award.from} to={award.to} />
            </ListItemAvatar>
            <ListItemText primary={award.description} />
          </>
        );
      }}
    />
  );
}
