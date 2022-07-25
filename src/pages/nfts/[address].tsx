import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useNftActivityLazyQuery, useNftMarketplaceLazyQuery } from '@/graphql/indexerTypes';
import clsx from 'clsx';
import { shortenAddress } from '@/modules/utils/string';
import Link from 'next/link';
import Custom404 from '../404';
import Accordion from '@/components/Accordion';
import MoreDropdown from '@/components/MoreDropdown';
//@ts-ignore
import FeatherIcon from 'feather-icons-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

import { Tag } from '@/assets/icons/Tag';
import Button from '@/components/Button';
import {
  HOLAPLEX_MARKETPLACE_ADDRESS,
  HOLAPLEX_MARKETPLACE_SUBDOMAIN,
  OPENSEA_MARKETPLACE_ADDRESS,
  AUCTION_HOUSE_ADDRESSES,
  MARKETPLACE_PROGRAMS,
} from 'src/views/_global/holaplexConstants';
import { DisplaySOL } from 'src/components/CurrencyHelpers';
import Modal from 'src/components/Modal';
import CancelOfferForm from 'src/components/CancelOfferForm';
import { AhListing, Offer, Marketplace, Nft } from '@holaplex/marketplace-js-sdk';
import { useRouter } from 'next/router';
import UpdateOfferForm from '@/components/UpdateOfferForm';
import SellForm from '@/components/SellForm';
import CancelSellForm from '@/components/CancelSellForm';
import BuyForm from '@/components/BuyForm';
import UpdateSellForm from '@/components/UpdateSellForm';
import AcceptOfferForm from '@/components/AcceptOfferForm';
import { format as formatTime } from 'timeago.js';
import { apolloClient } from '@/graphql/apollo';
import { ShareNftDocument, ShareNftQuery } from '@/graphql/indexerTypes.ssr';
import Head from 'next/head';
import { Avatar, AvatarIcons } from 'src/components/Avatar';
import { seededRandomBetween } from '@/modules/utils/random';
import { SolscanIcon } from '@/assets/icons/Solscan';
import { ExplorerIcon } from '@/assets/icons/Explorer';
import NFTFile from '@/components/NFTFile';
import { ClipboardCheckIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { ButtonSkeleton } from '@/components/Skeletons';
import { DollarSign, Tag as FeatherTag, Zap } from 'react-feather';
import dynamic from 'next/dynamic';
import { useFetchDarkblocked } from 'src/hooks/useFetchDarkblocked';
import DarkblockAccordion from '@/components/DarkblockAccordion';
import { DarkblockMint } from '@/components/DarkblockMint';

const SolanaDarkblockWidget: any = dynamic(() => import('@darkblock.io/sol-widget'), {
  ssr: false,
});

const config = {
  customCssClass: 'darkblock-css', // pass here a class name you plan to use
  debug: false, // debug flag to console.log some variables
  imgViewer: {
    // image viewer control parameters
    showRotationControl: true,
    autoHideControls: true,
    controlsFadeDelay: true,
  },
};

>>>>>>> 69dc5095 (add darkblock sol widget +create mint modal +widget style (#3))

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nftAddress = context?.params?.address ?? '';

  try {
    const { data } = await apolloClient.query<ShareNftQuery>({
      query: ShareNftDocument,
      variables: {
        subdomain: HOLAPLEX_MARKETPLACE_SUBDOMAIN,
        address: context?.params?.address,
      },
    });

    const nftToShare = data.nft || data.nftByMintAddress || null;

    const offers = nftToShare?.offers || [];
    const topOffers = offers?.slice()?.sort((a, b) => Number(b?.price) - Number(a?.price)) || [];
    const topOffer = topOffers?.[0];

    const listings = nftToShare?.listings || [];
    const topListings =
      listings?.slice()?.sort((a, b) => Number(b?.price) - Number(a?.price)) || [];
    const topListing = topListings?.[0];
    return {
      props: {
        address: nftAddress,
        name: nftToShare?.name || nftAddress,
        description: nftToShare?.description || '',
        image:
          nftToShare?.image ||
          `/images/gradients/gradient-${seededRandomBetween(
            new PublicKey(nftAddress).toBytes().reduce((a, b) => a + b, 0) + 1,
            1,
            8
          )}.png`,
        listedPrice: Number(topListing?.price) / LAMPORTS_PER_SOL || 0,
        offerPrice: Number(topOffer?.price) / LAMPORTS_PER_SOL || 0,
      },
    };
  } catch (err) {
    return {
      props: {
        address: nftAddress,
        name: '',
        description: '',
        image: '',
        listedPrice: 0,
        offerPrice: 0,
      },
    };
  }
};

export default function NftByAddress({
  address,
  name,
  description,
  image,
}: {
  address: string;
  name?: string;
  description?: string;
  image?: string;
}) {
  const router = useRouter();
  const walletAdapter = useWallet();
  const publicKey = walletAdapter.publicKey;

  const [queryNft, { data, loading, called, refetch, error }] = useNftMarketplaceLazyQuery();
  const [queryNftActivity, activityContext] = useNftActivityLazyQuery();

  useEffect(() => {
    if (!data?.nft?.mintAddress) return;

    try {
      queryNftActivity({
        variables: {
          address: data?.nft?.mintAddress,
        },
      });
    } catch (error: any) {
      console.error(error);
    }
  }, [data?.nft?.mintAddress, queryNftActivity]);

  useEffect(() => {
    if (!address) return;

    try {
      queryNft({
        variables: {
          subdomain: HOLAPLEX_MARKETPLACE_SUBDOMAIN,
          address,
        },
      });
    } catch (error: any) {
      console.error(error);
      // Bugsnag.notify(error);
    }
  }, [address, queryNft]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [router, router.push, refetch]);

  const [offerModalVisibility, setOfferModalVisibility] = useState(false);
  const [offerUpdateModalVisibility, setOfferUpdateModalVisibility] = useState(false);
  const [sellModalVisibility, setSellModalVisibility] = useState(false);
  const [sellCancelModalVisibility, setSellCancelModalVisibility] = useState(false);
  const [sellUpdateModalVisibility, setSellUpdateModalVisibility] = useState(false);
  const [darkblockModalVisibility, setDarkblockModalVisibility] = useState(false);

  const nft = data?.nft || data?.nftByMintAddress;
  const marketplace = data?.marketplace;

  const owner = nft?.owner?.address;
  const darkblock = useFetchDarkblocked(owner);

  // has listed via default Holaplex marketplace (disregards others)
  const defaultListing = nft?.listings.find(
    (listing) => listing?.auctionHouse?.address.toString() === HOLAPLEX_MARKETPLACE_ADDRESS
  );

  const otherListings = nft?.listings.filter(
    (listing) => listing.auctionHouse?.address.toString() !== HOLAPLEX_MARKETPLACE_ADDRESS
  );

  const hasDefaultListing = Boolean(defaultListing);
  const offer = nft?.offers.find((offer) => offer.buyer === publicKey?.toBase58());
  const hasAddedOffer = Boolean(offer);

  const { offers, sortedOffers, topOffers } = useMemo(() => {
    const offers = nft?.offers || [];
    const sortedOffers = Array.from(offers).sort((offerA, offerB) => {
      return offerA.createdAt < offerB.createdAt ? 1 : -1;
    });
    const topOffers = offers?.slice()?.sort((a, b) => Number(b?.price) - Number(a?.price)) || [];
    return {
      offers,
      sortedOffers,
      topOffers,
    };
  }, [nft?.offers]);

  const isOwner = Boolean(nft?.owner?.address === publicKey?.toBase58());

  const topOffer = topOffers?.[0];
  const hasOffers = Boolean(topOffer);

  const openOfferUpdateModal = () => {
    setOfferModalVisibility(false);
    setOfferUpdateModalVisibility(true);
  };

  const updateListingFromCancel = () => {
    setSellCancelModalVisibility(false);
    setSellUpdateModalVisibility(true);
  };

  const DetailAddressRow = ({
    address,
    title,
    viewOnSite = false,
  }: {
    address?: string;
    title: string;
    viewOnSite?: boolean;
  }) => {
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
      if (linkCopied) {
        const timer = setTimeout(() => {
          setLinkCopied(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [linkCopied]);

    const handleCopyClick = async () => {
      await navigator.clipboard.writeText(address || `Error`);
      setLinkCopied(true);
    };
    return (
      <div className={`flex items-center justify-between`}>
        <p className={`m-0 text-base font-normal text-gray-300`}>{title}</p>
        <div className={`flex flex-row items-center justify-end gap-2`}>
          {viewOnSite && (
            <Link href={`/collections/${address}`}>
              <a target={`_self`}>
                <FeatherIcon
                  icon="folder"
                  aria-hidden="true"
                  className={`h-4 w-4 text-white hover:text-gray-300`}
                />
              </a>
            </Link>
          )}
          <Link href={`https://explorer.solana.com/address/${address}`}>
            <a target={`_blank`}>
              <ExplorerIcon width={16} height={16} className={`ease-in-out hover:text-gray-300`} />
            </a>
          </Link>
          <Link href={`https://solscan.io/account/${address}`}>
            <a target={`_blank`}>
              <SolscanIcon width={16} height={16} className={`ease-in-out hover:text-gray-300`} />
            </a>
          </Link>
          <button
            onClick={handleCopyClick}
            className={`relative m-0 w-24 text-left text-base font-normal text-gray-200 hover:text-gray-300`}
          >
            <Popover
              isShowOnHover={true}
              placement={`top`}
              content={
                <p className={`whitespace-nowrap p-2 text-sm`}>
                  {linkCopied ? `Address copied` : `Copy address`}
                </p>
              }
            >
              <p className={`m-0`}>{shortenAddress(address)}</p>
            </Popover>
          </button>
        </div>
      </div>
    );
  };

  if (called && !nft && !loading) {
    return <Custom404 />;
  }

  return (
    <>
      <div className="container px-6 pb-20 mx-auto md:px-12">
        <Head>
          <meta charSet={`utf-8`} />
          <title>{name} NFT | Holaplex</title>
          {/* Search Engine */}
          <meta property="description" key="description" content={description} />
          <meta property="image" key="image" content={image} />
          {/* Schema */}
          <meta itemProp="name" content={`${name} NFT | Holaplex`} />
          <meta itemProp="description" content={description} />
          <meta itemProp="image" content={image} />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${name} NFT | Holaplex`} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image:src" content={image} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:site" content="@holaplex" />
          {/* Open Graph */}
          <meta property="og:title" content={`${name} NFT | Holaplex`} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:url" content={`https://holaplex.com/nfts/${address}`} />
          <meta property="og:site_name" content="Holaplex" />
          <meta property="og:type" content="website" />
        </Head>
        <div className="text-white ">
          <div className="grid items-start grid-cols-1 gap-6 mt-12 mb-10 lg:grid-cols-2">
            <div className="block mb-4 lg:mb-0 lg:flex lg:items-center lg:justify-center ">
              <div className="block mb-6 lg:hidden">
                {loading ? (
                  <div className="w-full h-32 bg-gray-800 rounded-lg" />
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h1 className="!mb-4 !text-2xl !font-semibold">{nft?.name}</h1>
                      <MoreDropdown address={nft?.address || ''} />
                    </div>

                    <p className="text-lg">{nft?.description}</p>
                  </>
                )}
              </div>
              <NFTFile loading={loading} nft={nft as Nft | any} />
            </div>
            <div>
              <div className="hidden mb-8 lg:block">
                {loading ? (
                  <div className="w-full h-32 bg-gray-800 rounded-lg" />
                ) : (
                  <>
                    <div className="flex justify-between">
                      <h1 className="mb-4 text-2xl font-semibold">{nft?.name}</h1>
                      <MoreDropdown address={nft?.address || ''} />
                    </div>

                    <p className="text-lg">{nft?.description}</p>
                  </>
                )}
              </div>
              <div className="flex flex-row justify-between flex-1 mb-8">
                <div>
                  <div className="mb-1 text-gray-300 label">
                    {loading ? <div className="h-4 bg-gray-800 rounded w-14" /> : 'Created by'}
                  </div>
                  <ul>
                    {loading ? (
                      <li>
                        <div className="w-20 h-6 bg-gray-800 rounded" />
                      </li>
                    ) : nft?.creators.length === 1 ? (
                      <Link href={`/profiles/${nft?.creators[0].address}`}>
                        <a>
                          <Avatar address={nft?.creators[0].address} />
                        </a>
                      </Link>
                    ) : (
                      <div>
                        <AvatarIcons profiles={nft?.creators || []} />
                      </div>
                    )}
                  </ul>
                </div>

                <div
                  className={cx('flex', {
                    hidden: loading,
                  })}
                >
                  <div className="flex flex-col items-end flex-1">
                    <div className="self-end mb-1 text-gray-300 label">
                      {hasDefaultListing ? `Listed by` : `Collected by`}
                    </div>
                    {nft?.owner?.address && (
                      <Link href={`/profiles/${nft?.owner?.address}`}>
                        <a>
                          <Avatar address={nft?.owner?.address} />
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
                {nft?.owner && <ProfileChip user={nft?.owner} />}
              </div>
              <div className={`grid grid-cols-1 gap-10`}>
                {/* TODO: cleanup this conditional mess in favor of a component that handles all the different states */}
                {/* Not listed */}
                {!hasDefaultListing && (
                  <div className={`flex flex-col rounded-md bg-gray-800 p-6`}>
                    {isOwner && hasOffers && (
                      <div
                        className={`mb-6 flex w-full items-center justify-between border-b border-gray-700 pb-6`}
                      >
                        <div>
                          <h3 className={`text-base font-medium text-gray-300`}>Highest offer</h3>
                          <DisplaySOL amount={topOffer?.price} />
                        </div>
                        <div className={`flex w-1/2 sm:flex`}>
                          <AcceptOfferForm
                            nft={nft as Nft | any}
                            offer={topOffer as Offer}
                            listing={defaultListing as AhListingMultiMarketplace}
                            marketplace={marketplace as Marketplace}
                            refetch={refetch}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                    <div className={`flex w-full items-center justify-between`}>
                      <div className={`flex items-center`}>
                        <Tag className={`mr-2`} />
                        <h3 className={` text-base font-medium text-gray-300`}>
                          Not Listed {otherListings && otherListings.length > 0 && `on Holaplex`}
                        </h3>
                      </div>
                      {hasAddedOffer && (
                        <ul className={`flex flex-col sm:hidden`}>
                          <li className={`text-base text-gray-300`}>Your offer </li>
                          <DisplaySOL amount={offer?.price} />
                        </ul>
                      )}
                      {!hasAddedOffer && !isOwner && (
                        <div>
                          {loading ? (
                            <ButtonSkeleton />
                          ) : (
                            !Boolean(otherListings) && (
                              <Link href={`/nfts/${nft?.address}/offers/new`}>
                                <a>
                                  <Button>Make offer</Button>
                                </a>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                      {isOwner &&
                        (loading ? (
                          <ButtonSkeleton />
                        ) : (
                          <Button onClick={() => setSellModalVisibility(true)}>List NFT</Button>
                        ))}
                    </div>
                    {offer && (
                      <div
                        className={`mt-6 flex items-center justify-center border-t border-gray-700 pt-6 sm:justify-between`}
                      >
                        <ul className={`mb-0 hidden flex-col sm:flex`}>
                          <li className={`text-base text-gray-300`}>Your offer </li>
                          <DisplaySOL amount={offer?.price} />
                        </ul>
                        <div className={`grid w-full grid-cols-2 gap-4 sm:w-auto`}>
                          <Button secondary onClick={() => setOfferModalVisibility(true)}>
                            Cancel offer
                          </Button>
                          <Button onClick={() => setOfferUpdateModalVisibility(true)}>
                            Update offer
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* { darkblock.data?.find(( item: any ) => item.token === nft?.mintAddress).is_darkblocked && (
                  <div className={`flex flex-col rounded-md bg-gray-800 p-6`}>
                    <div className={`flex w-full items-center justify-between`}>
                      <div className={`flex items-center`}>
                        <img alt={'Darkblock logo'} src={'/images/footericon-blk.svg'} className="h-6 mr-2"/>
                        <h3 className={` text-base font-medium text-gray-300`}>Includes Unlockable Content</h3>
                      </div>
                      <Button onClick={() => setDarkblockModalVisibility(true)}>Unlock</Button>
                    </div>
                  </div>
                )} */}

                { darkblock.data?.find(( item: any ) => item.token === nft?.mintAddress).is_darkblocked && (
                  <div>
                    <DarkblockAccordion title={`Unlockable Content`} amount={1} action={() => setDarkblockModalVisibility(true)}>
                      <SolanaDarkblockWidget
                        tokenId={nft?.mintAddress}
                        walletAdapter={walletAdapter}
                        config={config}
                      />
                    </DarkblockAccordion>
                  </div>
                  )
                }

>>>>>>> 69dc5095 (add darkblock sol widget +create mint modal +widget style (#3))
                {hasDefaultListing && (
                  <div className={`flex flex-col rounded-md bg-gray-800 p-6`}>
                    {isOwner && hasOffers && (
                      <div
                        className={`mb-6 flex w-full items-center justify-between border-b border-gray-700 pb-6`}
                      >
                        <div>
                          <h3 className={`text-base font-medium text-gray-300`}>Highest offer</h3>
                          <DisplaySOL amount={topOffer?.price} />
                        </div>
                        <div className={`hidden w-1/2 sm:flex`}>
                          <AcceptOfferForm
                            nft={nft as Nft | any}
                            offer={topOffer as Offer}
                            listing={defaultListing as AhListingMultiMarketplace}
                            marketplace={marketplace as Marketplace}
                            refetch={refetch}
                            className={`w-full`}
                          />
                        </div>
                        <div className={`sm:hidden`}>
                          <h3 className={`flex text-base font-medium text-gray-300`}>Price</h3>
                          <DisplaySOL amount={defaultListing?.price} />
                        </div>
                      </div>
                    )}
                    {!hasOffers && isOwner && (
                      <div
                        className={`mb-6 flex w-full items-center justify-between border-b border-gray-700 pb-6 sm:hidden`}
                      >
                        <div>
                          <h3 className={`text-base font-medium text-gray-300`}>Price</h3>
                          <DisplaySOL amount={defaultListing?.price} />
                        </div>
                        <div>
                          <Button
                            className={`w-full`}
                            onClick={() => setSellUpdateModalVisibility(true)}
                          >
                            Update price
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className={`flex w-full items-center justify-between`}>
                      <div className={`hidden sm:inline-block`}>
                        <h3 className={`text-base font-medium text-gray-300`}>Price</h3>
                        <DisplaySOL amount={defaultListing?.price} />
                      </div>

                      {isOwner ? (
                        <div className={`grid w-full grid-cols-2 gap-6 sm:w-auto sm:gap-4`}>
                          {hasOffers && (
                            <>
                              <div className={`col-span-2 sm:hidden`}>
                                <AcceptOfferForm
                                  nft={nft as Nft | any}
                                  offer={topOffer as Offer}
                                  listing={defaultListing as AhListingMultiMarketplace}
                                  marketplace={marketplace as Marketplace}
                                  refetch={refetch}
                                  className="w-full"
                                />
                              </div>
                              <Button secondary onClick={() => setSellCancelModalVisibility(true)}>
                                Cancel listing
                              </Button>
                              <Button
                                secondary
                                className={`sm:bg-white sm:text-black`}
                                onClick={() => setSellUpdateModalVisibility(true)}
                              >
                                Update price
                              </Button>
                            </>
                          )}
                          {!hasOffers && hasDefaultListing && (
                            <div className={`col-span-2 sm:flex`}>
                              <Button
                                secondary
                                onClick={() => setSellCancelModalVisibility(true)}
                                className={`w-full sm:mr-4`}
                              >
                                Cancel listing
                              </Button>
                              <Button
                                secondary
                                className={`hidden sm:flex sm:bg-white sm:text-black`}
                                onClick={() => setSellUpdateModalVisibility(true)}
                              >
                                Update price
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          {hasAddedOffer ? (
                            <>
                              <ul className={`mb-0 flex flex-col items-center sm:hidden`}>
                                <li className={`text-base text-gray-300`}>Your offer </li>
                                <DisplaySOL amount={offer?.price} />
                              </ul>
                              <ul
                                className={`mb-0 flex flex-col  justify-end text-right sm:hidden`}
                              >
                                <li className={`text-right text-base text-gray-300`}>Price</li>
                                <DisplaySOL amount={defaultListing?.price} />
                              </ul>
                            </>
                          ) : (
                            <div className={`flex w-full flex-col sm:hidden`}>
                              <div className={`flex w-full items-center justify-between`}>
                                <ul className={`mb-0 flex flex-col items-center sm:hidden`}>
                                  <li className={`text-base text-gray-300`}>Price</li>
                                  <DisplaySOL amount={defaultListing?.price} />
                                </ul>
                                <div className={`w-1/2 sm:hidden`}>
                                  <BuyForm
                                    loading={loading}
                                    nft={nft as Nft | any}
                                    marketplace={marketplace as Marketplace}
                                    listing={defaultListing as AhListingMultiMarketplace}
                                    refetch={refetch}
                                    className={`w-full`}
                                  />
                                </div>
                              </div>
                              <div className={`mt-4 flex w-full border-t border-gray-700 pt-4`}>
                                {loading ? (
                                  <ButtonSkeleton />
                                ) : (
                                  <Link href={`/nfts/${nft?.address}/offers/new`}>
                                    <a className={`w-full`}>
                                      <Button className={`w-full`} secondary>
                                        Make offer
                                      </Button>
                                    </a>
                                  </Link>
                                )}
                              </div>
                            </div>
                          )}

                          <div
                            className={` ${
                              hasAddedOffer ? `w-1/2` : `grid grid-cols-2`
                            } hidden gap-4 sm:flex`}
                          >
                            {!hasAddedOffer &&
                              (loading ? (
                                <ButtonSkeleton />
                              ) : (
                                <Link href={`/nfts/${nft?.address}/offers/new`}>
                                  <a>
                                    <Button secondary>Make offer</Button>
                                  </a>
                                </Link>
                              ))}
                            <BuyForm
                              loading={loading}
                              nft={nft as Nft | any}
                              marketplace={marketplace as Marketplace}
                              listing={defaultListing as AhListingMultiMarketplace}
                              refetch={refetch}
                              className={`w-full`}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <p className={`m-0 mt-4 text-right text-xs font-medium text-gray-300`}>
                      SOL, ETH, and Credit Card supported
                    </p>
                    {offer && (
                      <div
                        className={`mt-6 flex items-center justify-center border-t border-gray-700 pt-6 sm:justify-between`}
                      >
                        {hasAddedOffer && (
                          <ul className={`mb-0 hidden flex-col items-center sm:flex`}>
                            <li className={`whitespace-nowrap text-base text-gray-300`}>
                              Your offer
                            </li>
                            <DisplaySOL amount={offer?.price} />
                          </ul>
                        )}

                        <div className={`grid w-full grid-cols-2 gap-6 sm:w-auto sm:gap-4`}>
                          <BuyForm
                            loading={loading}
                            nft={nft as Nft | any}
                            marketplace={marketplace as Marketplace}
                            listing={defaultListing as AhListingMultiMarketplace}
                            refetch={refetch}
                            className={`col-span-2 w-full sm:hidden`}
                          />
                          <div
                            className={`col-span-2 grid w-full grid-cols-2 gap-6 sm:w-auto sm:gap-4`}
                          >
                            <Button
                              secondary
                              className={`w-full`}
                              onClick={() => setOfferModalVisibility(true)}
                            >
                              Cancel offer
                            </Button>
                            <Button
                              onClick={() => setOfferUpdateModalVisibility(true)}
                              secondary
                              className={`w-full sm:bg-white sm:text-black`}
                            >
                              Update offer
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {Boolean(otherListings) &&
                      otherListings?.map((otherListing, i) => {
                        const auctionHouseInfo = getAuctionHouseInfo(
                          otherListing as AhListingMultiMarketplace
                        );
                        return (
                          <div
                            key={`listing-${otherListing.auctionHouse?.address}-${i}`}
                            className={`mt-6 border-t border-gray-700 pt-6`}
                          >
                            <p
                              className={`flex flex-row items-center gap-2 text-sm font-medium text-gray-300`}
                            >
                              Listed on{' '}
                              <span className={`flex items-center gap-1 font-bold text-white`}>
                                <img
                                  src={auctionHouseInfo?.logo}
                                  alt={auctionHouseInfo.name}
                                  className={`h-4 w-4 rounded-sm`}
                                />
                                {auctionHouseInfo?.name}
                              </span>
                            </p>
                            <div
                              className={
                                'flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between'
                              }
                            >
                              <div>
                                <h3 className={`text-base font-medium text-gray-300`}>Price</h3>
                                <DisplaySOL amount={otherListing?.price} />
                              </div>
                              <div className={`flex w-full items-center gap-2 sm:w-auto`}>
                                <Link href={`/nfts/${nft?.address}/offers/new`}>
                                  <a className={`w-full`}>
                                    <Button className={`w-full`} secondary>
                                      Make offer
                                    </Button>
                                  </a>
                                </Link>
                                {auctionHouseInfo.link && otherListing.auctionHouse === null ? (
                                  <Link href={`${auctionHouseInfo?.link}${nft?.mintAddress}`}>
                                    <a target={`_blank`}>
                                      <Button>View listing</Button>
                                    </a>
                                  </Link>
                                ) : (
                                  <BuyForm
                                    loading={loading}
                                    nft={nft as Nft | any}
                                    marketplace={marketplace as Marketplace}
                                    listing={otherListing as AhListingMultiMarketplace}
                                    refetch={refetch}
                                    className={`w-full`}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {nft?.attributes && nft.attributes.length > 0 && (
                  <div>
                    <Accordion title="Attributes" amount={nft.attributes.length}>
                      <div className="grid grid-cols-2 gap-4">
                        {loading ? (
                          <div>
                            <div className="h-16 bg-gray-800 rounded" />
                            <div className="h-16 bg-gray-800 rounded" />
                            <div className="h-16 bg-gray-800 rounded" />
                            <div className="h-16 bg-gray-800 rounded" />
                          </div>
                        ) : (
                          nft?.attributes.map((a) => (
                            <div
                              key={a.traitType}
                              className="max-h-[300px] rounded border border-gray-800 p-4"
                            >
                              <p className="mb-1 text-base font-medium text-gray-300 truncate label">
                                {a.traitType}
                              </p>
                              <p className="mb-0 truncate text-ellipsis">{a.value}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </Accordion>
                  </div>
                )}

                {nft?.mintAddress && nft.address && (
                  <div>
                    <Accordion title={`Details`}>
                      <div className={`grid grid-cols-1 gap-4`}>
                        <DetailAddressRow title={`Mint address`} address={nft.mintAddress} />
                        <DetailAddressRow title={`Token address`} address={nft.address} />
                        {nft.collection && (
                          <>
                            <DetailAddressRow
                              title={`Collection`}
                              address={nft.collection.mintAddress}
                            />
                            <DetailAddressRow
                              viewOnSite={true}
                              title={`Collection token address`}
                              address={nft.collection.address}
                            />
                          </>
                        )}

                        {/*                         <DetailAddressRow
                          title={`Auction house`}
                          address={defaultListing?.address}
                        /> */}
                        <div className={`flex items-center justify-between`}>
                          <p className={`m-0 text-base font-normal text-gray-300`}>
                            Creator royalties
                          </p>
                          <p className={`m-0 text-base font-normal text-gray-300`}>
                            {Number(nft.sellerFeeBasisPoints) / 100}%
                          </p>
                        </div>
                        <div className={`flex items-center justify-between`}>
                          <p className={`m-0 text-base font-normal text-gray-300`}>
                            Transaction fee
                          </p>
                          <p className={`m-0 text-base font-normal text-gray-300`}>
                            {Number(marketplace?.auctionHouses[0]?.sellerFeeBasisPoints) / 100}%
                          </p>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`my-10 flex flex-col justify-between text-sm sm:text-base md:text-lg`}>
            {loading ? (
              <div className="w-full h-32 bg-gray-800 rounded-lg" />
            ) : (
              <Accordion title={`Offers`} amount={offers.length} defaultOpen>
                <section className={`w-full`}>
                  {hasOffers && (
                    <header
                      className={`mb-2 grid ${
                        isOwner || hasAddedOffer ? `grid-cols-4` : `grid-cols-3`
                      } items-center px-4`}
                    >
                      <span className={`text-xs text-gray-300`}>WALLET</span>
                      <span className={`text-xs text-gray-300`}>PRICE</span>
                      <span className={`text-xs text-gray-300`}>TIME</span>
                      {isOwner && <span className={`text-xs text-gray-300`}></span>}
                    </header>
                  )}

                  {!hasOffers && (
                    <div className="w-full p-10 text-center border border-gray-800 rounded-lg">
                      <h3>No offers found</h3>
                      <p className="text-gray-500 mt-">
                        There are currently no offers on this NFT.
                      </p>
                    </div>
                  )}
                  {hasOffers &&
                    sortedOffers?.map((o) => (
                      <article
                        key={o.id}
                        className={`mb-4 grid rounded border border-gray-800 p-4 ${
                          isOwner || hasAddedOffer ? `grid-cols-4` : `grid-cols-3`
                        }`}
                      >
                        <div className={`flex items-center`}>
                          <Link href={`/profiles/${o.buyer}`}>
                            <a rel={`nofollower`}>
                              {<Avatar address={o.buyer} /> || shortenAddress(o.buyer)}
                            </a>
                          </Link>
                        </div>
                        <div className={`flex items-center`}>
                          <DisplaySOL amount={o.price.toNumber()} />
                        </div>
                        <div className={`flex items-center`}>
                          {formatTime(o.createdAt, `en_US`)}
                        </div>
                        {(hasAddedOffer || isOwner) && (
                          <div className={`flex w-full items-center justify-end gap-2`}>
                            {o.buyer === (publicKey?.toBase58() as string) && !isOwner && (
                              <Button secondary onClick={() => setOfferModalVisibility(true)}>
                                Cancel offer
                              </Button>
                            )}
                            {isOwner && (
                              <AcceptOfferForm
                                nft={nft as Nft | any}
                                offer={o as Offer}
                                listing={defaultListing as AhListingMultiMarketplace}
                                marketplace={marketplace as Marketplace}
                                refetch={refetch}
                                className={`justify-end`}
                              />
                            )}
                          </div>
                        )}
                      </article>
                    ))}
                </section>
              </Accordion>
            )}
          </div>
          <div className={`my-10 flex flex-col justify-between text-sm sm:text-base md:text-lg`}>
            {activityContext.loading ? (
              <div className="w-full h-32 bg-gray-800 rounded-lg" />
            ) : (
              <Accordion
                title={`Activity`}
                amount={activityContext.data?.nftByMintAddress?.activities.length}
              >
                <header className={`mb-2 grid grid-cols-4 items-center px-4`}>
                  <span className={`text-xs text-gray-300`}>EVENT</span>
                  <span className={`text-xs text-gray-300`}>WALLET</span>
                  <span className={`text-xs text-gray-300`}>PRICE</span>
                  <span className={`text-xs text-gray-300`}>TIME</span>
                </header>

                {!!activityContext.data?.nftByMintAddress?.activities.length &&
                  activityContext.data?.nftByMintAddress?.activities?.map((a) => {
                    const multipleWallets = a.wallets.length > 1;
                    return (
                      <article
                        key={a.id}
                        className="grid grid-cols-4 p-4 mb-4 border border-gray-700 rounded"
                      >
                        <div className="flex self-center">
                          {a.activityType === 'purchase' && (
                            <FeatherTag className="self-center mr-2 text-gray-300" size="18" />
                          )}
                          <div>{a.activityType === 'purchase' && 'Sold'}</div>

                          {a.activityType === 'offer' && (
                            <Zap className="self-center mr-2 text-gray-300" size="18" />
                          )}
                          <div>{a.activityType === 'offer' && 'Offer Made'}</div>
                          {a.activityType === 'listing' && (
                            <FeatherTag className="self-center mr-2 text-gray-300" size="18" />
                          )}
                          <div>{a.activityType === 'listing' && 'Listed'}</div>
                        </div>
                        <div
                          className={clsx('flex items-center self-center ', {
                            '-ml-6': multipleWallets,
                          })}
                        >
                          {multipleWallets && (
                            <img
                              src="/images/svgs/uturn.svg"
                              className="w-4 mr-2 text-gray-300"
                              alt="wallets"
                            />
                          )}
                          <div className="flex flex-col">
                            <a
                              href={`https://holaplex.com/profiles/${a.wallets[0].address}`}
                              rel="nofollower"
                              className="text-sm"
                            >
                              <Avatar
                                border
                                address={a.wallets[0].address}
                                data={{
                                  twitterHandle: a.wallets[0].profile?.handle,
                                  pfpUrl: a.wallets[0]?.profile?.profileImageUrlLowres,
                                }}
                              />
                            </a>
                            {multipleWallets && (
                              <a
                                href={`https://holaplex.com/profiles/${a.wallets[1].address}`}
                                rel="nofollower"
                                className="text-sm"
                              >
                                <Avatar
                                  border
                                  data={{
                                    twitterHandle: a.wallets[1].profile?.handle,
                                    pfpUrl: a.wallets[1]?.profile?.profileImageUrlLowres,
                                  }}
                                  address={a.wallets[1].address}
                                />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="self-center">
                          <span className="sol-amount">
                            {/* TODO: how to support multiple tokens */}
                            <DisplaySOL amount={a.price.toNumber()} />
                          </span>
                        </div>
                        <div className="self-center text-sm">
                          {formatTime(a.createdAt, `en_US`)}
                        </div>
                      </article>
                    );
                  })}
              </Accordion>
            )}
          </div>
        </div>

        {nft && (
          <>
            <Modal
              open={offerModalVisibility}
              setOpen={setOfferModalVisibility}
              title={`Cancel offer`}
            >
              <CancelOfferForm
                nft={nft as Nft | any}
                marketplace={marketplace as Marketplace}
                refetch={refetch}
                offer={offer as Offer}
                setOpen={setOfferModalVisibility}
                updateOffer={openOfferUpdateModal}
              />
            </Modal>
            <Modal
              open={offerUpdateModalVisibility}
              setOpen={setOfferUpdateModalVisibility}
              title={`Update offer`}
            >
              <UpdateOfferForm
                listing={defaultListing as AhListingMultiMarketplace}
                setOpen={setOfferUpdateModalVisibility}
                nft={nft as Nft | any}
                marketplace={marketplace as Marketplace}
                refetch={refetch}
                loading={loading}
                hasListing={hasDefaultListing}
              />
            </Modal>
            <Modal
              open={sellModalVisibility}
              setOpen={setSellModalVisibility}
              title={`List NFT for sale`}
            >
              <SellForm
                setOpen={setSellModalVisibility}
                nft={nft as Nft | any}
                refetch={refetch}
                loading={loading}
                marketplace={marketplace as Marketplace}
              />
            </Modal>
            <Modal
              open={sellCancelModalVisibility}
              setOpen={setSellCancelModalVisibility}
              title="Cancel listing"
            >
              <CancelSellForm
                nft={nft as Nft | any}
                refetch={refetch}
                marketplace={marketplace as Marketplace}
                listing={defaultListing as AhListingMultiMarketplace}
                setOpen={setSellCancelModalVisibility}
                updateListing={updateListingFromCancel}
              />
            </Modal>
            <Modal
              open={sellUpdateModalVisibility}
              setOpen={setSellUpdateModalVisibility}
              title={`Update listing price`}
            >
              <UpdateSellForm
                nft={nft as Nft | any}
                refetch={refetch}
                marketplace={marketplace as Marketplace}
                listing={defaultListing as AhListingMultiMarketplace}
                setOpen={setSellUpdateModalVisibility}
                offer={topOffer as Offer}
              />
            </Modal>
            <Modal
              open={darkblockModalVisibility}
              setOpen={setDarkblockModalVisibility}
              title={`Darkblock Unlockable Content`}
            >
              <DarkblockMint />
            </Modal>
          </>
        )}
      </div>
    </>
  );
}
