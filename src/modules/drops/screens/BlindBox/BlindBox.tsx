import { Box, Button, ThemeProvider, Typography } from "@material-ui/core"
import { darkTheme } from "modules/themes/darkTheme"
import { Img } from "modules/uiKit/Img"
import { useBlindBoxStyles } from "./useBlinkBoxStyles"
import topImg from './assets/blindBoxBg.png'

export const BlindBox = () => {
    const classes = useBlindBoxStyles({})
    return <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
            <img alt="" className={classes.headTopImg} src={topImg} />
            <div className={classes.inner}>
                <Box mt={5} mb={4}>
                    <Typography variant="h2" >🔥Live</Typography>
                </Box>
            </div>
            {[1,2].map((id) => {
                return <Box mb={4.7} display="flex" >
                    <Img className={classes.boxLeft} src="" />
                    <div>
                        <Typography>End: 10h 23m 19s</Typography>
                        <Typography variant="h3" >AFT x NFT SELL</Typography>
                        <Box>
                        Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new life of its own.
                        </Box>
                        <Typography>10/1000</Typography>
                        <Box display="flex" justifyContent="space-betweent">
                            <span>20.00 BNB / DRAW</span>
                            <Button>DRAW</Button>
                        </Box>
                    </div>
                </Box>
            })}
        </div>
    </ThemeProvider>
}
