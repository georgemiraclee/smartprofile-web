import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(6),
  },
  footerSection: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    fontSize: 'var(--headline-font-size)',
    fontWeight: 'var(--headline-font-weight)',
    marginBottom: theme.spacing(2),
  },
  sectionContent: {
    fontSize: 'var(--body-font-size)',
  },
  socialIcons: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  sectionList: {
    listStyle: 'none',
    padding: 0,
    '& a': {
      textDecoration: 'none',
      color: '#fff',
      fontSize: 'var(--body-font-size)',
      transition: 'color 0.3s',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  contactIcon: {
    fontSize: 'var(--title-font-size)',
    marginRight: theme.spacing(2),
  },
  contactText: {
    fontSize: 'var(--body-font-size)',
  },
  contactLink: {
    fontSize: 'var(--body-font-size)',
    textDecoration: 'none',
    color: '#fff',
    transition: 'color 0.3s',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

export default useStyles;
