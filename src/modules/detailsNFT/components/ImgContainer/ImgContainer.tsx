import { Container, MenuItem, MenuList, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { TwitterIcon } from 'modules/layout/components/Social/assets/TwitterIcon';
import { Button } from 'modules/uiKit/Button';
import { FacebookIcon } from './assets/FacebookIcon';
import { ShareIcon } from './assets/ShareIcon';
import { useImgContainerStyles } from './useImgContainerStyles';

interface INFTContentProps {
  className?: string;
  src: string;
}

export const ImgContainer = ({ className, src }: INFTContentProps) => {
  const classes = useImgContainerStyles();

  const renderedTooltipContent = (
    <MenuList>
      <MenuItem
        className={classes.tooltipLink}
        component="a"
        href="//twitter.com"
        target="_blank"
      >
        <TwitterIcon className={classes.tooltipIcon} />
        Twitter
      </MenuItem>

      <MenuItem
        className={classes.tooltipLink}
        component="a"
        href="//fb.com"
        target="_blank"
      >
        <FacebookIcon className={classes.tooltipIcon} />
        Facebook
      </MenuItem>
    </MenuList>
  );

  return (
    <Container className={classNames(classes.root, className)}>
      <div className={classes.content}>
        <img className={classes.img} src={src} loading="lazy" alt="" />

        <div className={classes.actions}>
          <Button variant="outlined" className={classes.btn} rounded>
            <HeartIcon className={classes.btnIcon} /> 150
          </Button>

          <Tooltip
            classes={{
              tooltip: classes.tooltip,
            }}
            title={renderedTooltipContent}
            placement="bottom-end"
            enterTouchDelay={0}
            leaveDelay={100}
            leaveTouchDelay={1000 * 60}
            interactive
          >
            <Button variant="outlined" className={classes.btn} rounded>
              <ShareIcon className={classes.btnIcon} /> share
            </Button>
          </Tooltip>
        </div>
      </div>
    </Container>
  );
};
