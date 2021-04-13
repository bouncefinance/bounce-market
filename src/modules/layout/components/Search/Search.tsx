import { IconButton, InputBase } from '@material-ui/core';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { SearchIcon } from './assets/SearchIcon';
import { useSearchStyles } from './SearchStyles';

const ANIMATION_TIMEOUT = 200;

interface ISearchProps {
  className?: string;
  focus?: boolean;
}

export const Search = ({ className, focus }: ISearchProps) => {
  const classes = useSearchStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, ANIMATION_TIMEOUT);
    }
  }, [focus]);

  return (
    <form className={classNames(classes.root, className)}>
      <InputBase
        required
        inputRef={inputRef}
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
