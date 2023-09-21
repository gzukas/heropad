import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import { useAtom } from 'jotai';
import {
  usePopupState,
  bindTrigger,
  bindMenu
} from 'material-ui-popup-state/hooks';
import { localeAtom } from '~/atoms';
import { locales } from '~/locales';

export function ChangeLocale() {
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
      <IconButton {...bindTrigger(menuState)}>
        <TranslateIcon />
      </IconButton>
      <Menu {...bindMenu(menuState)}>
        {Object.entries(locales).map((renderLocaleMenuItem))}
      </Menu>
    </>
  );
}
