import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';
import {
  usePopupState,
  bindTrigger,
  bindMenu
} from 'material-ui-popup-state/hooks';
import { localeAtom } from '~/atoms/localeAtom';
import { locales } from '~/locales';

export function ChangeLocale() {
  const { _ } = useLingui();
  const [currentLocale, setCurrentLocale] = useAtom(localeAtom);
  const menuState = usePopupState({
    variant: 'popover',
    popupId: 'change-locale'
  });

  const handleMenuItemClick = (locale: string) => () => {
    setCurrentLocale(locale);
  };

  const renderLocaleMenuItem = ([locale, text]: [string, string]) => {
    const checked = currentLocale === locale;
    return (
      <MenuItem key={locale} onClick={handleMenuItemClick(locale)}>
        {checked && (
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
        )}
        <ListItemText inset={!checked}>{text}</ListItemText>
      </MenuItem>
    );
  };

  return (
    <>
      <Tooltip title={_(msg`Change language`)}>
        <IconButton {...bindTrigger(menuState)}>
          <TranslateIcon />
        </IconButton>
      </Tooltip>
      <Menu {...bindMenu(menuState)}>
        {Object.entries(locales).map(renderLocaleMenuItem)}
      </Menu>
    </>
  );
}
