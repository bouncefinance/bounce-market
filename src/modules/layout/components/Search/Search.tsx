import { ClickAwayListener, IconButton, InputBase } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import { SearchIcon } from 'modules/common/components/Icons/SearchIcon';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import React, { useEffect, useRef, useState } from 'react';
import { getByLikeStr } from './getByLikeStr';
import { SearchResult } from './SearchResult';
import { useSearchStyles } from './SearchStyles';
import debounce from 'lodash/debounce';
import { t } from '../../../i18n/utils/intl';

const SEARCH_REQUEST_KEY = 'Search';

const SEARCH_DELAY = 500;
const ANIMATION_TIMEOUT = 200;

interface ISearchProps {
  className?: string;
  focus?: boolean;
}

export const Search = ({ className, focus }: ISearchProps) => {
  const classes = useSearchStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatchRequest();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, ANIMATION_TIMEOUT);
    }
  }, [focus]);

  const handleSearch = useRef(
    debounce((value: string) => {
      if (value.length && value.length >= 2) {
        dispatch(getByLikeStr(value));
        setShowResult(true);
      } else {
        setShowResult(false);
      }
    }, SEARCH_DELAY),
  ).current;

  const handleKeyup = (event: any) => {
    handleSearch(event.target.value);
  };

  const handleClose = () => {
    setShowResult(false);
  };

  return (
    <div className={classes.root}>
      <div className={classNames(classes.root, className)}>
        <InputBase
          required
          inputRef={inputRef}
          className={classNames(
            classes.input,
            showResult && classes.inputFocused,
          )}
          classes={{
            focused: classes.inputFocused,
            input: classes.inputBase,
          }}
          type="search"
          onKeyUp={handleKeyup}
          placeholder={t('header.search.placeholder')}
          startAdornment={
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          }
        />
      </div>
      {showResult && (
        <ClickAwayListener onClickAway={handleClose}>
          <div className={classes.searchResult}>
            <Queries<ResponseData<typeof getByLikeStr>>
              requestActions={[getByLikeStr]}
              requestKeys={['', SEARCH_REQUEST_KEY]}
            >
              {({ loading, data }) => (
                <SearchResult
                  loading={loading}
                  data={data}
                  handleClose={handleClose}
                />
              )}
            </Queries>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};
