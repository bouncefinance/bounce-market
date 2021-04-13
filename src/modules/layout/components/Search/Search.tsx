import { IconButton, InputBase } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { SearchIcon } from './assets/SearchIcon';
import { useSearchStyles } from './SearchStyles';

interface ISearchProps {
  className?: string;
}

export const Search = ({ className }: ISearchProps) => {
  const classes = useSearchStyles();
  return (
    <form className={classNames(classes.root, className)}>
      <InputBase
        required
        className={classes.input}
        classes={{
          focused: classes.inputFocused,
          input: classes.inputBase,
        }}
        placeholder="Search by name, creator, brand..."
        startAdornment={
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        }
      />
    </form>
  );
};
