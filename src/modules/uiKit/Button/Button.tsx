import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { forwardRef, useCallback } from 'react';
import { useButtonStyles } from './useButtonStyles';

interface IButtonProps extends ButtonProps {
  rounded?: boolean;
  loading?: boolean;
  [x: string]: any;
}

/**
 * The main api is here - [Button API](https://material-ui.com/api/button/)
 */
// TODO: fix typings
export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { rounded = false, className, loading, children, onClick, ...props },
    ref,
  ) => {
    const classes = useButtonStyles();

    const onLoadingClick = useCallback((e: any) => {
      e.preventDefault();
    }, []);

    return (
      <ButtonComponent
        ref={ref}
        className={classNames(
          className,
          classes.root,
          rounded && classes.rounded,
          loading && classes.loading,
        )}
        {...props}
        onClick={loading ? onLoadingClick : onClick}
      >
        {children && (
          <span
            className={classNames(
              classes.content,
              loading && classes.contentHidden,
            )}
          >
            {children}
          </span>
        )}

        {loading && (
          <i className={classes.loadingIcon}>
            <QueryLoading />
          </i>
        )}
      </ButtonComponent>
    );
  },
);
