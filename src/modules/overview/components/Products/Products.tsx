import {
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Hidden,
  Tab,
  Tabs,
} from '@material-ui/core';
import { IProductCardProps, ProductCard } from 'modules/components/ProductCard';
import { useIsMDUp } from 'modules/themes/useTheme';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { Select } from 'modules/uiKit/Select';
import { useMemo } from 'react';
import InView from 'react-intersection-observer';
import { uid } from 'react-uid';
import { useProductsStyles } from './ProductsStyles';
import { useProducts } from './useProducts';

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
        <InView rootMargin="-10% 0% -10% 0%">
          {({ inView, ref, entry }) => (
            <Fade in={inView}>
              <Grid item xs={12} sm={6} md={4} lg={3} ref={ref}>
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
                <Tabs
                  value={catergory}
                  onChange={onCategoryTabChange}
                  textColor="secondary"
                  variant="scrollable"
                >
                  {categories.map(({ label, value }) => (
                    <Tab key={uid(label)} label={label} value={value} />
                  ))}
                </Tabs>
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

                        return <>Sort by: {label}</>;
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
          <Button variant="outlined" className={classes.moreBtn} fullWidth>
            Load More
          </Button>
        </Box>
      </Container>
    </Section>
  );
};
