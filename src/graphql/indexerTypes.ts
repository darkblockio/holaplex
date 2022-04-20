import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime */
  DateTimeUtc: any;
  /** Lamports */
  Lamports: any;
  /** PublicKey */
  PublicKey: any;
  /** Volume */
  Volume: any;
};

/** Filter on NFT attributes */
export type AttributeFilter = {
  traitType: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type AttributeGroup = {
  __typename?: 'AttributeGroup';
  name: Scalars['String'];
  variants: Array<AttributeVariant>;
};

export type AttributeVariant = {
  __typename?: 'AttributeVariant';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type AuctionHouse = {
  __typename?: 'AuctionHouse';
  address: Scalars['String'];
  auctionHouseFeeAccount: Scalars['String'];
  auctionHouseTreasury: Scalars['String'];
  authority: Scalars['String'];
  bump: Scalars['Int'];
  canChangeSalePrice: Scalars['Boolean'];
  creator: Scalars['String'];
  feePayerBump: Scalars['Int'];
  feeWithdrawalDestination: Scalars['String'];
  requiresSignOff: Scalars['Boolean'];
  sellerFeeBasisPoints: Scalars['Int'];
  stats?: Maybe<MintStats>;
  treasuryBump: Scalars['Int'];
  treasuryMint: Scalars['String'];
  treasuryWithdrawalDestination: Scalars['String'];
};

export type Bid = {
  __typename?: 'Bid';
  bidderAddress: Scalars['String'];
  cancelled: Scalars['Boolean'];
  lastBidAmount: Scalars['Lamports'];
  lastBidTime: Scalars['String'];
  listing?: Maybe<Listing>;
  listingAddress: Scalars['String'];
};

/** auction house bid receipt */
export type BidReceipt = {
  __typename?: 'BidReceipt';
  address: Scalars['String'];
  auctionHouse: Scalars['String'];
  buyer: Scalars['String'];
  canceledAt?: Maybe<Scalars['DateTimeUtc']>;
  createdAt: Scalars['DateTimeUtc'];
  metadata: Scalars['String'];
  price: Scalars['Lamports'];
  tokenAccount?: Maybe<Scalars['String']>;
  tradeState: Scalars['String'];
  tradeStateBump: Scalars['Int'];
};

export type ConnectionCounts = {
  __typename?: 'ConnectionCounts';
  fromCount: Scalars['Int'];
  toCount: Scalars['Int'];
};

export type Creator = {
  __typename?: 'Creator';
  address: Scalars['String'];
  attributeGroups: Array<AttributeGroup>;
  counts: CreatorCounts;
  profile?: Maybe<TwitterProfile>;
  stats: Array<MintStats>;
};


export type CreatorStatsArgs = {
  auctionHouses: Array<Scalars['PublicKey']>;
};

export type CreatorCounts = {
  __typename?: 'CreatorCounts';
  creations: Scalars['Int'];
};

export type Denylist = {
  __typename?: 'Denylist';
  listings: Array<Scalars['PublicKey']>;
  storefronts: Array<Scalars['PublicKey']>;
};

export type GraphConnection = {
  __typename?: 'GraphConnection';
  address: Scalars['String'];
  from: Wallet;
  to: Wallet;
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  bids: Array<Bid>;
  cacheAddress: Scalars['String'];
  ended: Scalars['Boolean'];
  endsAt?: Maybe<Scalars['DateTimeUtc']>;
  extAddress: Scalars['String'];
  nfts: Array<Nft>;
  storeAddress: Scalars['String'];
  storefront?: Maybe<Storefront>;
};

/** An NFT listing receipt */
export type ListingReceipt = {
  __typename?: 'ListingReceipt';
  address: Scalars['String'];
  auctionHouse: Scalars['String'];
  bookkeeper: Scalars['String'];
  bump: Scalars['Int'];
  canceledAt?: Maybe<Scalars['DateTimeUtc']>;
  createdAt: Scalars['DateTimeUtc'];
  metadata: Scalars['String'];
  price: Scalars['Lamports'];
  purchaseReceipt?: Maybe<Scalars['String']>;
  seller: Scalars['String'];
  tokenSize: Scalars['Int'];
  tradeState: Scalars['String'];
  tradeStateBump: Scalars['Int'];
};

export type MarketStats = {
  __typename?: 'MarketStats';
  nfts?: Maybe<Scalars['Volume']>;
};

export type Marketplace = {
  __typename?: 'Marketplace';
  auctionHouse?: Maybe<AuctionHouse>;
  auctionHouseAddress: Scalars['String'];
  bannerUrl: Scalars['String'];
  configAddress: Scalars['String'];
  creators: Array<StoreCreator>;
  description: Scalars['String'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  ownerAddress: Scalars['String'];
  stats?: Maybe<MarketStats>;
  storeAddress?: Maybe<Scalars['String']>;
  subdomain: Scalars['String'];
};

export type MintStats = {
  __typename?: 'MintStats';
  auctionHouse: Scalars['String'];
  average?: Maybe<Scalars['Volume']>;
  floor?: Maybe<Scalars['Volume']>;
  mint: Scalars['String'];
  volume24hr?: Maybe<Scalars['Volume']>;
};

export type Nft = {
  __typename?: 'Nft';
  activities: Array<NftActivity>;
  address: Scalars['String'];
  attributes: Array<NftAttribute>;
  creators: Array<NftCreator>;
  description: Scalars['String'];
  image: Scalars['String'];
  listings: Array<ListingReceipt>;
  mintAddress: Scalars['String'];
  name: Scalars['String'];
  offers: Array<BidReceipt>;
  owner?: Maybe<NftOwner>;
  primarySaleHappened: Scalars['Boolean'];
  purchases: Array<PurchaseReceipt>;
  sellerFeeBasisPoints: Scalars['Int'];
};


export type NftImageArgs = {
  width?: InputMaybe<Scalars['Int']>;
};

export type NftActivity = {
  __typename?: 'NftActivity';
  activityType: Scalars['String'];
  address: Scalars['String'];
  auctionHouse: Scalars['String'];
  createdAt: Scalars['DateTimeUtc'];
  metadata: Scalars['String'];
  price: Scalars['Lamports'];
  wallets: Array<Scalars['String']>;
};

export type NftAttribute = {
  __typename?: 'NftAttribute';
  metadataAddress: Scalars['String'];
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export type NftCount = {
  __typename?: 'NftCount';
  listed: Scalars['Int'];
  total: Scalars['Int'];
};


export type NftCountListedArgs = {
  auctionHouses?: InputMaybe<Array<Scalars['PublicKey']>>;
};

export type NftCreator = {
  __typename?: 'NftCreator';
  address: Scalars['String'];
  metadataAddress: Scalars['String'];
  position?: Maybe<Scalars['Int']>;
  profile?: Maybe<TwitterProfile>;
  share: Scalars['Int'];
  twitterHandle?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

export type NftOwner = {
  __typename?: 'NftOwner';
  address: Scalars['String'];
  associatedTokenAccountAddress: Scalars['String'];
  profile?: Maybe<TwitterProfile>;
  twitterHandle?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  bannerImageUrl: Scalars['String'];
  handle: Scalars['String'];
  profileImageUrlHighres: Scalars['String'];
  profileImageUrlLowres: Scalars['String'];
  walletAddress?: Maybe<Scalars['String']>;
};

/** auction house bid receipt */
export type PurchaseReceipt = {
  __typename?: 'PurchaseReceipt';
  address: Scalars['String'];
  auctionHouse: Scalars['String'];
  buyer: Scalars['String'];
  createdAt: Scalars['DateTimeUtc'];
  price: Scalars['Lamports'];
  seller: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  connections: Array<GraphConnection>;
  creator: Creator;
  denylist: Denylist;
  listings: Array<Listing>;
  /** A marketplace */
  marketplace?: Maybe<Marketplace>;
  nft?: Maybe<Nft>;
  nftCounts: NftCount;
  nfts: Array<Nft>;
  profile?: Maybe<Profile>;
  /** A storefront */
  storefront?: Maybe<Storefront>;
  storefronts: Array<Storefront>;
  wallet: Wallet;
};


export type QueryRootConnectionsArgs = {
  from?: InputMaybe<Array<Scalars['PublicKey']>>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  to?: InputMaybe<Array<Scalars['PublicKey']>>;
};


export type QueryRootCreatorArgs = {
  address: Scalars['String'];
};


export type QueryRootMarketplaceArgs = {
  subdomain: Scalars['String'];
};


export type QueryRootNftArgs = {
  address: Scalars['String'];
};


export type QueryRootNftCountsArgs = {
  creators: Array<Scalars['PublicKey']>;
};


export type QueryRootNftsArgs = {
  attributes?: InputMaybe<Array<AttributeFilter>>;
  creators?: InputMaybe<Array<Scalars['PublicKey']>>;
  limit: Scalars['Int'];
  listed?: InputMaybe<Array<Scalars['PublicKey']>>;
  offerers?: InputMaybe<Array<Scalars['PublicKey']>>;
  offset: Scalars['Int'];
  owners?: InputMaybe<Array<Scalars['PublicKey']>>;
};


export type QueryRootProfileArgs = {
  handle: Scalars['String'];
};


export type QueryRootStorefrontArgs = {
  subdomain: Scalars['String'];
};


export type QueryRootWalletArgs = {
  address: Scalars['PublicKey'];
};

export type StoreCreator = {
  __typename?: 'StoreCreator';
  creatorAddress: Scalars['String'];
  preview: Array<Nft>;
  storeConfigAddress: Scalars['String'];
};

/** A Metaplex storefront */
export type Storefront = {
  __typename?: 'Storefront';
  address: Scalars['String'];
  bannerUrl: Scalars['String'];
  description: Scalars['String'];
  faviconUrl: Scalars['String'];
  logoUrl: Scalars['String'];
  ownerAddress: Scalars['String'];
  subdomain: Scalars['String'];
  title: Scalars['String'];
};

export type TwitterProfile = {
  __typename?: 'TwitterProfile';
  bannerImageUrl: Scalars['String'];
  description: Scalars['String'];
  handle: Scalars['String'];
  profileImageUrl: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['PublicKey'];
  bids: Array<Bid>;
  connectionCounts: ConnectionCounts;
  nftCounts: WalletNftCount;
  profile?: Maybe<TwitterProfile>;
};


export type WalletNftCountsArgs = {
  creators?: InputMaybe<Array<Scalars['PublicKey']>>;
};

export type WalletNftCount = {
  __typename?: 'WalletNftCount';
  listed: Scalars['Int'];
  offered: Scalars['Int'];
  owned: Scalars['Int'];
};


export type WalletNftCountListedArgs = {
  auctionHouses?: InputMaybe<Array<Scalars['PublicKey']>>;
};


export type WalletNftCountOfferedArgs = {
  auctionHouses?: InputMaybe<Array<Scalars['PublicKey']>>;
};

export type ActivityPageQueryVariables = Exact<{
  address: Scalars['PublicKey'];
}>;


export type ActivityPageQuery = { __typename?: 'QueryRoot', wallet: { __typename: 'Wallet', address: any, bids: Array<{ __typename: 'Bid', listingAddress: string, bidderAddress: string, lastBidTime: string, lastBidAmount: any, cancelled: boolean, listing?: { __typename?: 'Listing', address: string, ended: boolean, storefront?: { __typename: 'Storefront', ownerAddress: string, subdomain: string, title: string, description: string, faviconUrl: string, logoUrl: string, bannerUrl: string } | null, nfts: Array<{ __typename: 'Nft', address: string, name: string, description: string, image: string }>, bids: Array<{ __typename?: 'Bid', bidderAddress: string, lastBidTime: string, lastBidAmount: any, cancelled: boolean, listingAddress: string }> } | null }> } };

export type CreatedNfTsQueryVariables = Exact<{
  creator: Scalars['PublicKey'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  subdomain: Scalars['String'];
}>;


export type CreatedNfTsQuery = { __typename?: 'QueryRoot', marketplace?: { __typename?: 'Marketplace', subdomain: string, name: string, description: string, logoUrl: string, bannerUrl: string, ownerAddress: string, creators: Array<{ __typename?: 'StoreCreator', creatorAddress: string, storeConfigAddress: string }>, auctionHouse?: { __typename?: 'AuctionHouse', address: string, treasuryMint: string, auctionHouseTreasury: string, treasuryWithdrawalDestination: string, feeWithdrawalDestination: string, authority: string, creator: string, auctionHouseFeeAccount: string, bump: number, treasuryBump: number, feePayerBump: number, sellerFeeBasisPoints: number, requiresSignOff: boolean, canChangeSalePrice: boolean } | null } | null, nfts: Array<{ __typename?: 'Nft', address: string, name: string, sellerFeeBasisPoints: number, mintAddress: string, description: string, image: string, primarySaleHappened: boolean, creators: Array<{ __typename?: 'NftCreator', address: string, share: number, verified: boolean }>, owner?: { __typename?: 'NftOwner', address: string, associatedTokenAccountAddress: string } | null, purchases: Array<{ __typename?: 'PurchaseReceipt', address: string, buyer: string, auctionHouse: string, price: any, createdAt: any }>, listings: Array<{ __typename?: 'ListingReceipt', address: string, tradeState: string, seller: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, createdAt: any, canceledAt?: any | null }>, offers: Array<{ __typename?: 'BidReceipt', address: string, tradeState: string, buyer: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, tokenAccount?: string | null, createdAt: any, canceledAt?: any | null }> }> };

export type OwnedNfTsQueryVariables = Exact<{
  address: Scalars['PublicKey'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  subdomain: Scalars['String'];
}>;


export type OwnedNfTsQuery = { __typename?: 'QueryRoot', marketplace?: { __typename?: 'Marketplace', subdomain: string, name: string, description: string, logoUrl: string, bannerUrl: string, ownerAddress: string, creators: Array<{ __typename?: 'StoreCreator', creatorAddress: string, storeConfigAddress: string }>, auctionHouse?: { __typename?: 'AuctionHouse', address: string, treasuryMint: string, auctionHouseTreasury: string, treasuryWithdrawalDestination: string, feeWithdrawalDestination: string, authority: string, creator: string, auctionHouseFeeAccount: string, bump: number, treasuryBump: number, feePayerBump: number, sellerFeeBasisPoints: number, requiresSignOff: boolean, canChangeSalePrice: boolean, stats?: { __typename?: 'MintStats', floor?: any | null, average?: any | null, volume24hr?: any | null } | null } | null } | null, nfts: Array<{ __typename?: 'Nft', address: string, name: string, sellerFeeBasisPoints: number, mintAddress: string, description: string, image: string, primarySaleHappened: boolean, creators: Array<{ __typename?: 'NftCreator', address: string, share: number, verified: boolean }>, owner?: { __typename?: 'NftOwner', address: string, associatedTokenAccountAddress: string } | null, purchases: Array<{ __typename?: 'PurchaseReceipt', address: string, buyer: string, auctionHouse: string, price: any, createdAt: any }>, listings: Array<{ __typename?: 'ListingReceipt', address: string, tradeState: string, seller: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, createdAt: any, canceledAt?: any | null }>, offers: Array<{ __typename?: 'BidReceipt', address: string, tradeState: string, buyer: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, tokenAccount?: string | null, createdAt: any, canceledAt?: any | null }> }> };

export type WalletProfileQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type WalletProfileQuery = { __typename?: 'QueryRoot', profile?: { __typename?: 'Profile', handle: string, profileImageUrlLowres: string, profileImageUrlHighres: string, bannerImageUrl: string } | null };

export type MarketplacePreviewQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type MarketplacePreviewQuery = { __typename?: 'QueryRoot', marketplace?: { __typename?: 'Marketplace', bannerUrl: string, name: string, stats?: { __typename?: 'MarketStats', nfts?: any | null } | null, auctionHouse?: { __typename?: 'AuctionHouse', stats?: { __typename?: 'MintStats', floor?: any | null } | null } | null, creators: Array<{ __typename?: 'StoreCreator', creatorAddress: string }> } | null };

export type NftMarketplaceQueryVariables = Exact<{
  subdomain: Scalars['String'];
  address: Scalars['String'];
}>;


export type NftMarketplaceQuery = { __typename?: 'QueryRoot', marketplace?: { __typename?: 'Marketplace', subdomain: string, name: string, description: string, logoUrl: string, bannerUrl: string, ownerAddress: string, creators: Array<{ __typename?: 'StoreCreator', creatorAddress: string, storeConfigAddress: string }>, auctionHouse?: { __typename?: 'AuctionHouse', address: string, treasuryMint: string, auctionHouseTreasury: string, treasuryWithdrawalDestination: string, feeWithdrawalDestination: string, authority: string, creator: string, auctionHouseFeeAccount: string, bump: number, treasuryBump: number, feePayerBump: number, sellerFeeBasisPoints: number, requiresSignOff: boolean, canChangeSalePrice: boolean, stats?: { __typename?: 'MintStats', floor?: any | null, average?: any | null, volume24hr?: any | null } | null } | null } | null, nft?: { __typename?: 'Nft', address: string, name: string, sellerFeeBasisPoints: number, mintAddress: string, description: string, image: string, primarySaleHappened: boolean, attributes: Array<{ __typename?: 'NftAttribute', metadataAddress: string, value: string, traitType: string }>, creators: Array<{ __typename?: 'NftCreator', address: string, verified: boolean }>, owner?: { __typename?: 'NftOwner', address: string, associatedTokenAccountAddress: string } | null, purchases: Array<{ __typename?: 'PurchaseReceipt', address: string, buyer: string, auctionHouse: string, price: any, createdAt: any }>, listings: Array<{ __typename?: 'ListingReceipt', address: string, tradeState: string, seller: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, createdAt: any, canceledAt?: any | null }>, offers: Array<{ __typename?: 'BidReceipt', address: string, tradeState: string, buyer: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, tokenAccount?: string | null, createdAt: any, canceledAt?: any | null }> } | null };

export type OffersPageQueryVariables = Exact<{
  subdomain: Scalars['String'];
  address: Scalars['PublicKey'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type OffersPageQuery = { __typename?: 'QueryRoot', marketplace?: { __typename?: 'Marketplace', subdomain: string, name: string, description: string, logoUrl: string, bannerUrl: string, ownerAddress: string, creators: Array<{ __typename?: 'StoreCreator', creatorAddress: string, storeConfigAddress: string }>, auctionHouse?: { __typename?: 'AuctionHouse', address: string, treasuryMint: string, auctionHouseTreasury: string, treasuryWithdrawalDestination: string, feeWithdrawalDestination: string, authority: string, creator: string, auctionHouseFeeAccount: string, bump: number, treasuryBump: number, feePayerBump: number, sellerFeeBasisPoints: number, requiresSignOff: boolean, canChangeSalePrice: boolean, stats?: { __typename?: 'MintStats', floor?: any | null, average?: any | null, volume24hr?: any | null } | null } | null } | null, sentOffers: Array<{ __typename?: 'Nft', address: string, name: string, sellerFeeBasisPoints: number, mintAddress: string, description: string, image: string, primarySaleHappened: boolean, attributes: Array<{ __typename?: 'NftAttribute', metadataAddress: string, value: string, traitType: string }>, creators: Array<{ __typename?: 'NftCreator', address: string, verified: boolean }>, owner?: { __typename?: 'NftOwner', address: string, associatedTokenAccountAddress: string } | null, purchases: Array<{ __typename?: 'PurchaseReceipt', address: string, buyer: string, auctionHouse: string, price: any, createdAt: any }>, listings: Array<{ __typename?: 'ListingReceipt', address: string, tradeState: string, seller: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, createdAt: any, canceledAt?: any | null }>, offers: Array<{ __typename?: 'BidReceipt', address: string, tradeState: string, buyer: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, tokenAccount?: string | null, createdAt: any, canceledAt?: any | null }> }>, receivedOffers: Array<{ __typename?: 'Nft', address: string, name: string, sellerFeeBasisPoints: number, mintAddress: string, description: string, image: string, primarySaleHappened: boolean, attributes: Array<{ __typename?: 'NftAttribute', metadataAddress: string, value: string, traitType: string }>, creators: Array<{ __typename?: 'NftCreator', address: string, verified: boolean }>, owner?: { __typename?: 'NftOwner', address: string, associatedTokenAccountAddress: string } | null, purchases: Array<{ __typename?: 'PurchaseReceipt', address: string, buyer: string, auctionHouse: string, price: any, createdAt: any }>, listings: Array<{ __typename?: 'ListingReceipt', address: string, tradeState: string, seller: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, createdAt: any, canceledAt?: any | null }>, offers: Array<{ __typename?: 'BidReceipt', address: string, tradeState: string, buyer: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, tokenAccount?: string | null, createdAt: any, canceledAt?: any | null }> }> };

export type NftPageQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type NftPageQuery = { __typename?: 'QueryRoot', nft?: { __typename?: 'Nft', address: string, name: string, sellerFeeBasisPoints: number, mintAddress: string, description: string, image: string, primarySaleHappened: boolean, attributes: Array<{ __typename?: 'NftAttribute', metadataAddress: string, value: string, traitType: string }>, creators: Array<{ __typename?: 'NftCreator', address: string, verified: boolean }>, owner?: { __typename?: 'NftOwner', address: string } | null, purchases: Array<{ __typename?: 'PurchaseReceipt', address: string, buyer: string, auctionHouse: string, price: any, createdAt: any }>, listings: Array<{ __typename?: 'ListingReceipt', address: string, tradeState: string, seller: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, createdAt: any, canceledAt?: any | null }>, offers: Array<{ __typename?: 'BidReceipt', address: string, tradeState: string, buyer: string, metadata: string, auctionHouse: string, price: any, tradeStateBump: number, tokenAccount?: string | null, createdAt: any, canceledAt?: any | null }> } | null };


export const ActivityPageDocument = gql`
    query activityPage($address: PublicKey!) {
  wallet(address: $address) {
    __typename
    address
    bids {
      __typename
      listingAddress
      bidderAddress
      lastBidTime
      lastBidAmount
      cancelled
      listing {
        address
        ended
        storefront {
          __typename
          ownerAddress
          subdomain
          title
          description
          faviconUrl
          logoUrl
          bannerUrl
        }
        nfts {
          __typename
          address
          name
          description
          image
        }
        bids {
          bidderAddress
          lastBidTime
          lastBidAmount
          cancelled
          listingAddress
        }
      }
    }
  }
}
    `;

/**
 * __useActivityPageQuery__
 *
 * To run a query within a React component, call `useActivityPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityPageQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useActivityPageQuery(baseOptions: Apollo.QueryHookOptions<ActivityPageQuery, ActivityPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityPageQuery, ActivityPageQueryVariables>(ActivityPageDocument, options);
      }
export function useActivityPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityPageQuery, ActivityPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityPageQuery, ActivityPageQueryVariables>(ActivityPageDocument, options);
        }
export type ActivityPageQueryHookResult = ReturnType<typeof useActivityPageQuery>;
export type ActivityPageLazyQueryHookResult = ReturnType<typeof useActivityPageLazyQuery>;
export type ActivityPageQueryResult = Apollo.QueryResult<ActivityPageQuery, ActivityPageQueryVariables>;
export const CreatedNfTsDocument = gql`
    query createdNFTs($creator: PublicKey!, $limit: Int!, $offset: Int!, $subdomain: String!) {
  marketplace(subdomain: $subdomain) {
    subdomain
    name
    description
    logoUrl
    bannerUrl
    ownerAddress
    creators {
      creatorAddress
      storeConfigAddress
    }
    auctionHouse {
      address
      treasuryMint
      auctionHouseTreasury
      treasuryWithdrawalDestination
      feeWithdrawalDestination
      authority
      creator
      auctionHouseFeeAccount
      bump
      treasuryBump
      feePayerBump
      sellerFeeBasisPoints
      requiresSignOff
      canChangeSalePrice
    }
  }
  nfts(creators: [$creator], limit: $limit, offset: $offset) {
    address
    name
    sellerFeeBasisPoints
    mintAddress
    description
    image
    primarySaleHappened
    creators {
      address
      share
      verified
    }
    owner {
      address
      associatedTokenAccountAddress
    }
    purchases {
      address
      buyer
      auctionHouse
      price
      createdAt
    }
    listings {
      address
      tradeState
      seller
      metadata
      auctionHouse
      price
      tradeStateBump
      createdAt
      canceledAt
    }
    offers {
      address
      tradeState
      buyer
      metadata
      auctionHouse
      price
      tradeStateBump
      tokenAccount
      createdAt
      canceledAt
    }
  }
}
    `;

/**
 * __useCreatedNfTsQuery__
 *
 * To run a query within a React component, call `useCreatedNfTsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreatedNfTsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreatedNfTsQuery({
 *   variables: {
 *      creator: // value for 'creator'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useCreatedNfTsQuery(baseOptions: Apollo.QueryHookOptions<CreatedNfTsQuery, CreatedNfTsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreatedNfTsQuery, CreatedNfTsQueryVariables>(CreatedNfTsDocument, options);
      }
export function useCreatedNfTsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreatedNfTsQuery, CreatedNfTsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreatedNfTsQuery, CreatedNfTsQueryVariables>(CreatedNfTsDocument, options);
        }
export type CreatedNfTsQueryHookResult = ReturnType<typeof useCreatedNfTsQuery>;
export type CreatedNfTsLazyQueryHookResult = ReturnType<typeof useCreatedNfTsLazyQuery>;
export type CreatedNfTsQueryResult = Apollo.QueryResult<CreatedNfTsQuery, CreatedNfTsQueryVariables>;
export const OwnedNfTsDocument = gql`
    query ownedNFTs($address: PublicKey!, $limit: Int!, $offset: Int!, $subdomain: String!) {
  marketplace(subdomain: $subdomain) {
    subdomain
    name
    description
    logoUrl
    bannerUrl
    ownerAddress
    creators {
      creatorAddress
      storeConfigAddress
    }
    auctionHouse {
      address
      treasuryMint
      auctionHouseTreasury
      treasuryWithdrawalDestination
      feeWithdrawalDestination
      authority
      creator
      auctionHouseFeeAccount
      bump
      treasuryBump
      feePayerBump
      sellerFeeBasisPoints
      requiresSignOff
      canChangeSalePrice
      stats {
        floor
        average
        volume24hr
      }
    }
  }
  nfts(owners: [$address], limit: $limit, offset: $offset) {
    address
    name
    sellerFeeBasisPoints
    mintAddress
    description
    image
    primarySaleHappened
    creators {
      address
      share
      verified
    }
    owner {
      address
      associatedTokenAccountAddress
    }
    purchases {
      address
      buyer
      auctionHouse
      price
      createdAt
    }
    listings {
      address
      tradeState
      seller
      metadata
      auctionHouse
      price
      tradeStateBump
      createdAt
      canceledAt
    }
    offers {
      address
      tradeState
      buyer
      metadata
      auctionHouse
      price
      tradeStateBump
      tokenAccount
      createdAt
      canceledAt
    }
  }
}
    `;

/**
 * __useOwnedNfTsQuery__
 *
 * To run a query within a React component, call `useOwnedNfTsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnedNfTsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnedNfTsQuery({
 *   variables: {
 *      address: // value for 'address'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useOwnedNfTsQuery(baseOptions: Apollo.QueryHookOptions<OwnedNfTsQuery, OwnedNfTsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OwnedNfTsQuery, OwnedNfTsQueryVariables>(OwnedNfTsDocument, options);
      }
export function useOwnedNfTsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnedNfTsQuery, OwnedNfTsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OwnedNfTsQuery, OwnedNfTsQueryVariables>(OwnedNfTsDocument, options);
        }
export type OwnedNfTsQueryHookResult = ReturnType<typeof useOwnedNfTsQuery>;
export type OwnedNfTsLazyQueryHookResult = ReturnType<typeof useOwnedNfTsLazyQuery>;
export type OwnedNfTsQueryResult = Apollo.QueryResult<OwnedNfTsQuery, OwnedNfTsQueryVariables>;
export const WalletProfileDocument = gql`
    query walletProfile($handle: String!) {
  profile(handle: $handle) {
    handle
    profileImageUrlLowres
    profileImageUrlHighres
    bannerImageUrl
  }
}
    `;

/**
 * __useWalletProfileQuery__
 *
 * To run a query within a React component, call `useWalletProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletProfileQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useWalletProfileQuery(baseOptions: Apollo.QueryHookOptions<WalletProfileQuery, WalletProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletProfileQuery, WalletProfileQueryVariables>(WalletProfileDocument, options);
      }
export function useWalletProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletProfileQuery, WalletProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletProfileQuery, WalletProfileQueryVariables>(WalletProfileDocument, options);
        }
export type WalletProfileQueryHookResult = ReturnType<typeof useWalletProfileQuery>;
export type WalletProfileLazyQueryHookResult = ReturnType<typeof useWalletProfileLazyQuery>;
export type WalletProfileQueryResult = Apollo.QueryResult<WalletProfileQuery, WalletProfileQueryVariables>;
export const MarketplacePreviewDocument = gql`
    query marketplacePreview($subdomain: String!) {
  marketplace(subdomain: $subdomain) {
    bannerUrl
    stats {
      nfts
    }
    name
    auctionHouse {
      stats {
        floor
      }
    }
    creators {
      creatorAddress
    }
  }
}
    `;

/**
 * __useMarketplacePreviewQuery__
 *
 * To run a query within a React component, call `useMarketplacePreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketplacePreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketplacePreviewQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useMarketplacePreviewQuery(baseOptions: Apollo.QueryHookOptions<MarketplacePreviewQuery, MarketplacePreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketplacePreviewQuery, MarketplacePreviewQueryVariables>(MarketplacePreviewDocument, options);
      }
export function useMarketplacePreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketplacePreviewQuery, MarketplacePreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketplacePreviewQuery, MarketplacePreviewQueryVariables>(MarketplacePreviewDocument, options);
        }
export type MarketplacePreviewQueryHookResult = ReturnType<typeof useMarketplacePreviewQuery>;
export type MarketplacePreviewLazyQueryHookResult = ReturnType<typeof useMarketplacePreviewLazyQuery>;
export type MarketplacePreviewQueryResult = Apollo.QueryResult<MarketplacePreviewQuery, MarketplacePreviewQueryVariables>;
export const NftMarketplaceDocument = gql`
    query nftMarketplace($subdomain: String!, $address: String!) {
  marketplace(subdomain: $subdomain) {
    subdomain
    name
    description
    logoUrl
    bannerUrl
    ownerAddress
    creators {
      creatorAddress
      storeConfigAddress
    }
    auctionHouse {
      address
      treasuryMint
      auctionHouseTreasury
      treasuryWithdrawalDestination
      feeWithdrawalDestination
      authority
      creator
      auctionHouseFeeAccount
      bump
      treasuryBump
      feePayerBump
      sellerFeeBasisPoints
      requiresSignOff
      canChangeSalePrice
      stats {
        floor
        average
        volume24hr
      }
    }
  }
  nft(address: $address) {
    address
    name
    sellerFeeBasisPoints
    mintAddress
    description
    image
    primarySaleHappened
    attributes {
      metadataAddress
      value
      traitType
    }
    creators {
      address
      verified
    }
    owner {
      address
      associatedTokenAccountAddress
    }
    purchases {
      address
      buyer
      auctionHouse
      price
      createdAt
    }
    listings {
      address
      tradeState
      seller
      metadata
      auctionHouse
      price
      tradeStateBump
      createdAt
      canceledAt
    }
    offers {
      address
      tradeState
      buyer
      metadata
      auctionHouse
      price
      tradeStateBump
      tokenAccount
      createdAt
      canceledAt
    }
  }
}
    `;

/**
 * __useNftMarketplaceQuery__
 *
 * To run a query within a React component, call `useNftMarketplaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftMarketplaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftMarketplaceQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useNftMarketplaceQuery(baseOptions: Apollo.QueryHookOptions<NftMarketplaceQuery, NftMarketplaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NftMarketplaceQuery, NftMarketplaceQueryVariables>(NftMarketplaceDocument, options);
      }
export function useNftMarketplaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NftMarketplaceQuery, NftMarketplaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NftMarketplaceQuery, NftMarketplaceQueryVariables>(NftMarketplaceDocument, options);
        }
export type NftMarketplaceQueryHookResult = ReturnType<typeof useNftMarketplaceQuery>;
export type NftMarketplaceLazyQueryHookResult = ReturnType<typeof useNftMarketplaceLazyQuery>;
export type NftMarketplaceQueryResult = Apollo.QueryResult<NftMarketplaceQuery, NftMarketplaceQueryVariables>;
export const OffersPageDocument = gql`
    query offersPage($subdomain: String!, $address: PublicKey!, $limit: Int!, $offset: Int!) {
  marketplace(subdomain: $subdomain) {
    subdomain
    name
    description
    logoUrl
    bannerUrl
    ownerAddress
    creators {
      creatorAddress
      storeConfigAddress
    }
    auctionHouse {
      address
      treasuryMint
      auctionHouseTreasury
      treasuryWithdrawalDestination
      feeWithdrawalDestination
      authority
      creator
      auctionHouseFeeAccount
      bump
      treasuryBump
      feePayerBump
      sellerFeeBasisPoints
      requiresSignOff
      canChangeSalePrice
      stats {
        floor
        average
        volume24hr
      }
    }
  }
  sentOffers: nfts(offerers: [$address], limit: $limit, offset: $offset) {
    address
    name
    sellerFeeBasisPoints
    mintAddress
    description
    image
    primarySaleHappened
    attributes {
      metadataAddress
      value
      traitType
    }
    creators {
      address
      verified
    }
    owner {
      address
      associatedTokenAccountAddress
    }
    purchases {
      address
      buyer
      auctionHouse
      price
      createdAt
    }
    listings {
      address
      tradeState
      seller
      metadata
      auctionHouse
      price
      tradeStateBump
      createdAt
      canceledAt
    }
    offers {
      address
      tradeState
      buyer
      metadata
      auctionHouse
      price
      tradeStateBump
      tokenAccount
      createdAt
      canceledAt
    }
  }
  receivedOffers: nfts(owners: [$address], limit: $limit, offset: $offset) {
    address
    name
    sellerFeeBasisPoints
    mintAddress
    description
    image
    primarySaleHappened
    attributes {
      metadataAddress
      value
      traitType
    }
    creators {
      address
      verified
    }
    owner {
      address
      associatedTokenAccountAddress
    }
    purchases {
      address
      buyer
      auctionHouse
      price
      createdAt
    }
    listings {
      address
      tradeState
      seller
      metadata
      auctionHouse
      price
      tradeStateBump
      createdAt
      canceledAt
    }
    offers {
      address
      tradeState
      buyer
      metadata
      auctionHouse
      price
      tradeStateBump
      tokenAccount
      createdAt
      canceledAt
    }
  }
}
    `;

/**
 * __useOffersPageQuery__
 *
 * To run a query within a React component, call `useOffersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOffersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOffersPageQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *      address: // value for 'address'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useOffersPageQuery(baseOptions: Apollo.QueryHookOptions<OffersPageQuery, OffersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffersPageQuery, OffersPageQueryVariables>(OffersPageDocument, options);
      }
export function useOffersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffersPageQuery, OffersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffersPageQuery, OffersPageQueryVariables>(OffersPageDocument, options);
        }
export type OffersPageQueryHookResult = ReturnType<typeof useOffersPageQuery>;
export type OffersPageLazyQueryHookResult = ReturnType<typeof useOffersPageLazyQuery>;
export type OffersPageQueryResult = Apollo.QueryResult<OffersPageQuery, OffersPageQueryVariables>;
export const NftPageDocument = gql`
    query nftPage($address: String!) {
  nft(address: $address) {
    address
    name
    sellerFeeBasisPoints
    mintAddress
    description
    image
    primarySaleHappened
    attributes {
      metadataAddress
      value
      traitType
    }
    creators {
      address
      verified
    }
    owner {
      address
    }
    purchases {
      address
      buyer
      auctionHouse
      price
      createdAt
    }
    listings {
      address
      tradeState
      seller
      metadata
      auctionHouse
      price
      tradeStateBump
      createdAt
      canceledAt
    }
    offers {
      address
      tradeState
      buyer
      metadata
      auctionHouse
      price
      tradeStateBump
      tokenAccount
      createdAt
      canceledAt
    }
  }
}
    `;

/**
 * __useNftPageQuery__
 *
 * To run a query within a React component, call `useNftPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useNftPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNftPageQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useNftPageQuery(baseOptions: Apollo.QueryHookOptions<NftPageQuery, NftPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NftPageQuery, NftPageQueryVariables>(NftPageDocument, options);
      }
export function useNftPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NftPageQuery, NftPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NftPageQuery, NftPageQueryVariables>(NftPageDocument, options);
        }
export type NftPageQueryHookResult = ReturnType<typeof useNftPageQuery>;
export type NftPageLazyQueryHookResult = ReturnType<typeof useNftPageLazyQuery>;
export type NftPageQueryResult = Apollo.QueryResult<NftPageQuery, NftPageQueryVariables>;