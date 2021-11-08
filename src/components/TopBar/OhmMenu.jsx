import { useState, useEffect } from "react";
import { addresses, TOKEN_DECIMALS } from "../../constants";
import { getTokenImage } from "../../helpers";
import { useSelector } from "react-redux";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as sOhmTokenImg } from "../../assets/tokens/token_sPIP.svg";
import { ReactComponent as ohmTokenImg } from "../../assets/tokens/token_PIP.svg";
import { ReactComponent as t33TokenImg } from "../../assets/tokens/token_33T.svg";

import "./ohmmenu.scss";
import { dai, wFTM } from "src/helpers/AllBonds";
import { useWeb3Context } from "../../hooks/web3Context";

import PIPImg from "src/assets/tokens/token_PIP.svg";
import SPIPImg from "src/assets/tokens/token_sPIP.svg";
import token33tImg from "src/assets/tokens/token_33T.svg";

const addTokenToWallet = (tokenSymbol, tokenAddress) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    // NOTE (appleseed): 33T token defaults to sPIP logo since we don't have a 33T logo yet
    let tokenPath;
    // if (tokenSymbol === "PIP") {

    // } ? PIPImg : SPIPImg;
    switch (tokenSymbol) {
      case "PIP":
        tokenPath = PIPImg;
        break;
      case "33T":
        tokenPath = token33tImg;
        break;
      default:
        tokenPath = SPIPImg;
    }
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: TOKEN_DECIMALS,
            image: imageURL,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

function OhmMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID } = useWeb3Context();

  const networkID = chainID;

  const SPIP_ADDRESS = addresses[networkID].SPIP_ADDRESS;
  const PIP_ADDRESS = addresses[networkID].PIP_ADDRESS;
  const PT_TOKEN_ADDRESS = addresses[networkID].PT_TOKEN_ADDRESS;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = "pip-popper";
  const daiAddress = dai.getAddressForReserve(networkID);
  const wFTMAddress = wFTM.getAddressForReserve(networkID);
  return (
    <Box
      component="div"
      onMouseEnter={e => handleClick(e)}
      onMouseLeave={e => handleClick(e)}
      id="pip-menu-button-hover"
    >
      <Button id="pip-menu-button" size="large" variant="contained" color="secondary" title="PIP" aria-describedby={id}>
        <SvgIcon component={InfoIcon} color="primary" />
        <Typography>PIP</Typography>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="pip-menu" elevation={1}>
                <Box component="div" className="buy-tokens">
                  <Link
                    href={`https://app.sushi.com/swap?inputCurrency=${daiAddress}&outputCurrency=${PIP_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        Buy on Sushiswap <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>
                </Box>

                {isEthereumAPIAvailable ? (
                  <Box className="add-tokens">
                    <Divider color="secondary" />
                    <p>ADD TOKEN TO WALLET</p>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Button variant="contained" color="secondary" onClick={addTokenToWallet("PIP", PIP_ADDRESS)}>
                        <SvgIcon
                          component={ohmTokenImg}
                          viewBox="0 0 32 32"
                          style={{ height: "25px", width: "25px" }}
                        />
                        <Typography variant="body1">PIP</Typography>
                      </Button>
                      <Button variant="contained" color="secondary" onClick={addTokenToWallet("sPIP", SPIP_ADDRESS)}>
                        <SvgIcon
                          component={sOhmTokenImg}
                          viewBox="0 0 100 100"
                          style={{ height: "25px", width: "25px" }}
                        />
                        <Typography variant="body1">sPIP</Typography>
                      </Button>
                    </Box>
                  </Box>
                ) : null}

                <Divider color="secondary" />
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default OhmMenu;
