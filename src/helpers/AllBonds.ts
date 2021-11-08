import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";

import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as FraxBondContract } from "src/abi/bonds/FraxContract.json";
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
      bondAddress: "0x3AA84212Eb8F0773bb54A72015E55fCE57F8497c",
      reserveAddress: "0x0a349a25da556d168c52c0a4d664d61e295fb7fa",
    },
    [NetworkID.Local]: {
      bondAddress: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
      reserveAddress: "0xC45A075F87e630c063ED28DB68C5CCEE9055c6E1",
    },
  },
});

export const wFTM = new StableBond({
  name: "WFTM",
  displayName: "WFTM",
  bondToken: "WFTM",
  isAvailable: {
    [NetworkID.Mainnet]: true,
    [NetworkID.Testnet]: true,
    [NetworkID.FantomTestnet]: true,
    [NetworkID.Fantom]: true,
    [NetworkID.Local]: true,
  },
  bondIconSvg: FraxImg,
  bondContractABI: FraxBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x8510c8c2B6891E04864fa196693D44E6B6ec2514",
      reserveAddress: "0x853d955acef822db058eb8505911ed77f175b99e",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xF651283543fB9D61A91f318b78385d187D300738",
      reserveAddress: "0x2F7249cb599139e560f0c81c269Ab9b04799E453",
    },
    [NetworkID.FantomTestnet]: {
      bondAddress: "0x567068C23f497A94AE78afEddB04D2Fc64f86004",
      reserveAddress: "0xBd8659fCE5A08f3178F40299Ab009F0F5aB3DDe6",
    },
    [NetworkID.Fantom]: {
      bondAddress: "0xe28FC91166158FE433696C85f47d63a0B8615600",
      reserveAddress: "0xbe70f479db6f6be2481c938dfc7a5fa5361371bd",
    },
    [NetworkID.Local]: {
      bondAddress: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
      reserveAddress: "0x284218E7f4D65c6bDc166923ed505A5838067b17",
    },
  },
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai, wFTM]; //, eth, ohm_dai, ohm_frax, lusd, ohm_lusd, ohm_weth
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
