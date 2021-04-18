import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Button } from 'modules/uiKit/Button';
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

            <Grid item xs="auto">
              <Button variant="outlined" className={classes.moreBtn}>
                View all
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Section>
  );
};
