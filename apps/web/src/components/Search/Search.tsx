import { Suspense } from 'react';
import {
  Dialog,
  ListItem,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useLingui } from '@lingui/react';
import { msg, Trans } from '@lingui/macro';
import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { debouncedSearchTermAtom } from '~/atoms/searchTermAtom';
import { isSearchOpenAtom } from '~/atoms/isSearchOpenAtom';
import { AwardAvatar } from '~/components/AwardAvatar';
import { HeroAvatar } from '~/components/HeroAvatar';
import { SearchInput } from './SearchInput';
import { SearchEmpty } from './SearchEmpty';
import { SearchButton } from './SearchButton';
import { SearchList } from './SearchList';
import { SearchGroup } from './SearchGroup';
import { SearchText } from './SearchText';
import { UseAtomValue } from '../UseAtomValue';
import { searchSuggestionsByKindAtom } from '~/atoms/searchSuggestionsByKindAtom';

export function Search() {
  const { _ } = useLingui();
  const resetDebouncedSearchTerm = useResetAtom(debouncedSearchTermAtom);
  const isSearchOpen = useAtomValue(isSearchOpenAtom);
  const toggleSearch = useSetAtom(isSearchOpenAtom);

  const handleCloseClick = () => toggleSearch(false);

  return (
    <>
      <SearchButton />
      <Dialog
        open={isSearchOpen}
        onClose={handleCloseClick}
        TransitionProps={{ onExited: resetDebouncedSearchTerm }}
        PaperProps={{ elevation: 3, sx: { overflow: 'hidden' } }}
        maxWidth="sm"
        disableRestoreFocus
        fullWidth
        sx={{
          zIndex: 'drawer',
          '.MuiDialog-container': {
            alignItems: 'flex-start',
            pt: 7.5
          }
        }}
      >
        <SearchInput
          placeholder={_(msg`Search for heroes and awards...`)}
          autoFocus
        />
        <SearchList
          sx={{
            '.MuiInputBase-root + &:not(:empty)': {
              borderTop: 'thin solid',
              borderColor: 'divider'
            }
          }}
        >
          <Suspense>
            <SearchEmpty>
              <Trans>No results found</Trans>
            </SearchEmpty>
            <UseAtomValue
              atom={searchSuggestionsByKindAtom}
              render={suggestionsByKind => (
                <>
                  {suggestionsByKind.has('award') && (
                    <SearchGroup heading={<Trans>Awards</Trans>}>
                      {suggestionsByKind
                        .get('award')
                        ?.map(({ id, text, nodes: [[from], [to]] }) => (
                          <ListItem disablePadding>
                            <ListItemButton
                              key={id}
                              onClick={handleCloseClick}
                              component={Link}
                              to="/$hero/$awardId"
                              params={{ hero: from, awardId: id }}
                              search={{ direction: 'given' }}
                            >
                              <ListItemAvatar>
                                <AwardAvatar from={from} to={to} />
                              </ListItemAvatar>
                              <SearchText>{text}</SearchText>
                            </ListItemButton>
                          </ListItem>
                        ))}
                    </SearchGroup>
                  )}
                  {suggestionsByKind.has('hero') && (
                    <SearchGroup heading={<Trans>Heroes</Trans>}>
                      {suggestionsByKind
                        .get('hero')
                        ?.map(({ id, text, nodes: [[hero]] }) => (
                          <ListItem disablePadding>
                            <ListItemButton
                              key={id}
                              onClick={handleCloseClick}
                              component={Link}
                              to="/$hero"
                              params={{ hero }}
                            >
                              <ListItemAvatar>
                                <HeroAvatar hero={hero} />
                              </ListItemAvatar>
                              <SearchText>{text}</SearchText>
                            </ListItemButton>
                          </ListItem>
                        ))}
                    </SearchGroup>
                  )}
                </>
              )}
            />
          </Suspense>
        </SearchList>
      </Dialog>
    </>
  );
}
