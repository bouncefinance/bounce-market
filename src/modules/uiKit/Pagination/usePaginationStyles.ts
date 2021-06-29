import { makeStyles } from "@material-ui/core";

interface StyleProps {
  firstTitle: string;
  lastTitle: string;
}

export const usePaginationStyles = makeStyles((theme) => ({
  root: (props: StyleProps) => ({
    marginTop: '44px',
    display: 'flex',
    justifyContent: 'flex-end',

    '& .Mui-selected': {
      backgroundColor: "#000000",
      color: "#ffffff",

      "&:hover": {
        backgroundColor: "#000000",
      }
    },

    '& li:last-child > button': {
      '&  > svg': {
        display: 'none',
      },

      '&::after': {
        content: `"${props.lastTitle}"`,
      },
    },

    '& li:first-child > button': {
      padding: "auto 16px",

      '&  > svg': {
        display: 'none'
      },

      '&::after': {
        content: `"${props.firstTitle}"`
      }
    }
  }),

  itemRoot: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    margin: "0 8px"
  },

  ellipsis: {
    lineHeight: "4",
    border: "none",
    minWidth: "14px",
    width: "14px",
    padding: 0,
    margin: "0 12px"
  },
}));
