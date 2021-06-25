import { makeStyles } from "@material-ui/core";

interface StyleProps {
  firstTitle: string;
  lastTitle: string;
}

export const useProductsStyles = makeStyles((theme) => ({
  root: (props: StyleProps) => ({
    marginTop: '44px',
    display: 'flex',
    justifyContent: 'flex-end',

    '& .MuiPaginationItem-root': {
      width: "50px",
      height: "50px",
      borderRadius: "12px",
      border: "1px solid rgba(0, 0, 0, 0.1)"
    },

    '& .MuiPaginationItem-ellipsis': {
      lineHeight: "4"
    },

    '& .Mui-selected': {
      background: "#000000",
      color: "#ffffff"
    },

    '& li:last-child > button': {
      '&  > svg': {
        display: 'none'
      },

      '&::after': {
        content: `"${props.lastTitle}"`
      }
    },

    '& li:first-child > button': {
      '&  > svg': {
        display: 'none'
      },

      '&::after': {
        content: `"${props.firstTitle}"`
      }
    }
  })
}));
