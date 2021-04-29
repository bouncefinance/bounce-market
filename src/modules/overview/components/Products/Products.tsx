import { Box, Container, Fade, Grid, Hidden } from '@material-ui/core';
import {
  IProductCardProps,
  ProductCard,
} from 'modules/common/components/ProductCard';
import { t } from 'modules/i18n/utils/intl';
import { useIsMDUp } from 'modules/themes/useTheme';
import { Button } from 'modules/uiKit/Button';
import { FilledTab, FilledTabs } from 'modules/uiKit/FilledTabs';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { Select } from 'modules/uiKit/Select';
import { useMemo } from 'react';
import InView from 'react-intersection-observer';
import { uid } from 'react-uid';
import { useProducts } from './useProducts';
import { useProductsStyles } from './useProductsStyles';

type ProductProps = Omit<IProductCardProps, 'ImgProps'> & {
  img: string;
};

interface IProductsProps extends ISectionProps {
  items: ProductProps[];
}

export const Products = ({ items, ...sectionProps }: IProductsProps) => {
  const classes = useProductsStyles();
  const isMDUp = useIsMDUp();
  const {
    onSortChange,
    onCategoryTabChange,
    onCategorySelectChange,
    sortBy,
    catergory,
    categories,
    sortVariants,
  } = useProducts();

  const renderedProducts = useMemo(
    () =>
      items.map(cardProps => (
        <InView key={uid(cardProps)} rootMargin="-10% 0% -10% 0%">
          {({ inView, ref }) => (
            <Fade in={inView}>
              <Grid item xs={12} sm={6} lg={4} xl={3} ref={ref}>
                <ProductCard
                  key={uid(cardProps)}
                  title={cardProps.title}
                  price={cardProps.price}
                  priceType={cardProps.priceType}
                  endDate={cardProps.endDate}
                  likes={cardProps.likes}
                  href={cardProps.href}
                  ImgProps={{
                    src: cardProps.img,
                    objectFit: 'scale-down',
                    loading: 'lazy',
                  }}
                  ProfileInfoProps={cardProps.ProfileInfoProps}
                />
              </Grid>
            </Fade>
          )}
        </InView>
      )),
    [items],
  );

  return (
    <Section {...sectionProps}>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={6} md>
              <Hidden mdDown>
                <FilledTabs
                  value={catergory}
                  onChange={onCategoryTabChange as any}
                  textColor="secondary"
                  variant="scrollable"
                >
                  {categories.map(({ label, value }) => (
                    <FilledTab
                      className={classes.tab}
                      key={uid(label)}
                      label={label}
                      value={value}
                    />
                  ))}
                </FilledTabs>
              </Hidden>

              <Hidden lgUp>
                <Select
                  className={classes.select}
                  value={catergory}
                  onChange={onCategorySelectChange}
                  options={categories}
                />
              </Hidden>
            </Grid>

            <Grid item xs={6} md="auto">
              <Select
                className={classes.select}
                value={sortBy}
                onChange={onSortChange}
                options={sortVariants}
                renderValue={
                  isMDUp
                    ? (value: any) => {
                        const sortVariant = sortVariants.find(
                          variant => variant.value === value,
                        );
                        const label = sortVariant?.label.toLowerCase();

                        return t('products.sort-label', {
                          value: label,
                        });
                      }
                    : undefined
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          {renderedProducts}
        </Grid>

        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="outlined"
            className={classes.moreBtn}
            fullWidth
            rounded
          >
            {t('common.load-more')}
          </Button>
        </Box>
      </Container>
    </Section>
  );
};
