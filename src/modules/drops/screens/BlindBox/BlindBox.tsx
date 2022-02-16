import { Box, Button, ThemeProvider, Typography, useMediaQuery } from "@material-ui/core"
import { useTheme } from '@material-ui/core/styles';
import { darkTheme } from "modules/themes/darkTheme"
import { Img } from "modules/uiKit/Img"
import { useBlindBoxStyles } from "./useBlinkBoxStyles"
import topImg from './assets/blindBoxBg.png'
import { LayersIcon } from "modules/common/components/Icons/LayersIcon";

export const BlindBox = () => {
    const classes = useBlindBoxStyles({})
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const Detail = () => {
        return <>
        <Box mt={2} mb={2.4}>
            <Typography className={classes.desc}>
                Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new life of its own.
            </Typography>
        </Box>
        <Box mb={ isMobile ? 2 : 4} display="flex">
            <LayersIcon
            className={classes.icon}
            />
            <Typography className={classes.soldNumber}>&nbsp;&nbsp; 10 / 1000</Typography>
        </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography className={classes.price}>20.00 BNB / DRAW</Typography>
                <Button style={{flex: 1, maxWidth: 350, marginLeft: 15}}>DRAW</Button>
            </Box>
        </>
    }
    return <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
            <img alt="" className={classes.headTopImg} src={topImg} />
            <div className={classes.inner}>
                <Box mt={5} mb={4}>
                    <Typography variant="h2" >🔥Live</Typography>
                </Box>
                {[1, 2].map((id) => {
                    return <Box className={classes.itemBox} mb={4.7}>
                        <Box display="flex">
                            <Img className={classes.boxLeft} src="" />
                            <Box ml={6} className={classes.rightBox}>
                                <Typography className={classes.time}>End: 10h 23m 19s</Typography>
                                <Box mt={2.5}>
                                    <Typography variant={isMobile ? 'h2' : "h1"} >AFT x NFT SELL</Typography>
                                </Box>
                                {!isMobile && <Detail />}
                            </Box>
                        </Box>
                        {isMobile && <Detail />}
                    </Box>
                })}
            </div>
        </div>
    </ThemeProvider>
}
