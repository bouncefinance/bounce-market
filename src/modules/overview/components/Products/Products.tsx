import { Box, Container, Grid, Typography } from '@material-ui/core';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useProductsStyles } from './ProductsStyles';

interface IProductsProps extends ISectionProps {}

export const Products = ({ ...sectionProps }: IProductsProps) => {
  const classes = useProductsStyles();

  return (
    <Section {...sectionProps} className={classes.root}>
      <Container>
        <Box mb={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <Typography variant="h2">Hot Brands</Typography>
            </Grid>

            <Grid item xs="auto"></Grid>
          </Grid>
        </Box>
      </Container>
    </Section>
  );
};
