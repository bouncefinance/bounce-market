import { Container } from '@material-ui/core';
import classNames from 'classnames';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { ShareIcon } from 'modules/common/components/Icons/ShareIcon';
import { Button } from 'modules/uiKit/Button';
import { useImgContainerStyles } from './useImgContainerStyles';
import { t } from 'modules/i18n/utils/intl';
import { SocialShare } from 'modules/common/components/SocialShare';

interface INFTContentProps {
  className?: string;
  src: string;
  title: string;
  description: string;
}

export const ImgContainer = ({
  className,
  src,
  title,
  description,
}: INFTContentProps) => {
  const classes = useImgContainerStyles();

  return (
    <Container className={classNames(classes.root, className)}>
      <div className={classes.content}>
        <img className={classes.img} src={src} loading="lazy" alt="" />

        <div className={classes.actions}>
          <Button variant="outlined" className={classes.btn} rounded>
            <HeartIcon className={classes.btnIcon} /> 150
          </Button>

          <SocialShare
            titleString={title}
            description={description}
            buttonContent={
              <Button variant="outlined" className={classes.btn} rounded>
                <ShareIcon className={classes.btnIcon} /> {t('social.share')}
              </Button>
            }
          />
        </div>
      </div>
    </Container>
  );
};
