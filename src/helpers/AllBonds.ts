import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as OhmDaiImg } from "src/assets/tokens/OHM-DAI.svg";

import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";
import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";
import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { getBondCalculator } from "src/helpers/BondCalculator";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "dai",
  displayName: "DAI",
  bondToken: "DAI",
  isAvailable: {
    [NetworkID.Mainnet]: true,
    [NetworkID.Testnet]: true,
    [NetworkID.FantomTestnet]: true,
    [NetworkID.Fantom]: true,
    [NetworkID.Local]: true,
  },
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x575409F8d77c12B05feD8B455815f0e54797381c",
      reserveAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
    },
    [NetworkID.FantomTestnet]: {
      bondAddress: "0x1808ada8424ae2818acA2BbF64fBA023ebA853C6",
      reserveAddress: "0xBd8659fCE5A08f3178F40299Ab009F0F5aB3DDe6",
    },
    [NetworkID.Fantom]: {
      bondAddress: "0xDAf72012710c687900baA2e9ACdd78389bfA3be4",
      reserveAddress: "0xF284057240eB07117133130e6f8801cCd5Cb95C4",
    },
    [NetworkID.Local]: {
      bondAddress: "0x3C4bcEC0104038f59CDDe68E4EcC7DCaA6F15af1",
      reserveAddress: "0x7b418ffeB822B6caa791C087e40d6624c39B4Fa8",
    },
  },
});

export const ohm_dai = new LPBond({
  name: "ohm_dai_lp",
  displayName: "OHM-DAI LP",
  bondToken: "DAI",
  isAvailable: {
    [NetworkID.Mainnet]: true,
    [NetworkID.Testnet]: true,
    [NetworkID.FantomTestnet]: true,
    [NetworkID.Fantom]: true,
    [NetworkID.Local]: true,
  },
  bondIconSvg: OhmDaiImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x575409F8d77c12B05feD8B455815f0e54797381c",
      reserveAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
    },
    [NetworkID.FantomTestnet]: {
      bondAddress: "0x1808ada8424ae2818acA2BbF64fBA023ebA853C6",
      reserveAddress: "0xBd8659fCE5A08f3178F40299Ab009F0F5aB3DDe6",
    },
    [NetworkID.Fantom]: {
      bondAddress: "0xDAf72012710c687900baA2e9ACdd78389bfA3be4",
      reserveAddress: "0xF284057240eB07117133130e6f8801cCd5Cb95C4",
    },
    [NetworkID.Local]: {
      bondAddress: "0x11aaAb8AfdbAE798a8e76E3bD006e3b2aea1aEBe",
      reserveAddress: "0xf2F47d88A26592E8ccdB2144D34bA9CBf98Be0aD",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0x383518188c0c6d7730d91b2c03a03c837814a899/0x6b175474e89094c44da98b954eedeac495271d0f",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai, ohm_dai]; //, eth, ohm_dai, ohm_frax, lusd, ohm_lusd, ohm_weth
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
