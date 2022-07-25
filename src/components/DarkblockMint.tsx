import { FC } from 'react';
import TextInput2 from './TextInput2';

export const DarkblockMint: FC = () => {
  return (
    <>
    <div className="text-xl font-semibold">
      Upload a file
    </div>
    <div className='mt-4'>
      <div className="text-base">Supported File Formats:</div>
      <div>
        <p className="mt-2 text-sm text-gray-300">
          aac,bmp,cbr,epub,flac,gif,glb,html,jpg,m4a,mkv,mp3,mp4,mpeg,
          ogg,ogv,opus,pdf,png,svg,tgz,usdz,wav,webm,zip
        </p>
        <p className='text-sm text-gray-300'>
          Max file size 350MB
        </p>
      </div>
    </div>
    <div className='flex items-center w-full gap-4 py-6 bg-gray-800'>
      <div className='flex items-center justify-around px-4 py-2 ml-4 text-sm bg-gray-700 rounded-full'>
        Choose File
      </div>
      <div className='text-sm text-gray-300'>
        No file Selected
      </div>
    </div>
    <div className='py-4'>
      <p className='text-sm'>Name</p>
      <TextInput2
        id="owned-search"
        label=""
        hideLabel
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
        placeholder=""
        // onFocus={() => setSearchFocused(true)}
        // onBlur={() => setSearchFocused(false)}
      />
    </div>
    <div className='py-4'>
      <p className='text-sm'>Description (optional)</p>
      <TextInput2
        className='h-24'
        id="owned-search"
        label=""
        hideLabel
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
        placeholder=""
        // onFocus={() => setSearchFocused(true)}
        // onBlur={() => setSearchFocused(false)}
      />
      <p className='mt-2 text-xs text-gray-300'>
        0/250 characters
      </p>
    </div>

    <div className='flex justify-end'>
      <div className='px-6 py-2 font-medium text-gray-900 bg-white rounded-full'>
        Create
      </div>
    </div>

    <div className="w-full mt-10">
      <p className="m-0 text-xs text-center text-gray-300">
        Powered by <span className='font-semibold'>Darkblock</span>
      </p>
    </div>
    </>
  )
}
