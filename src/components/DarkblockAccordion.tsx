import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRight } from '../assets/icons/ChevronRight';
import cx from 'classnames';
import { actions } from '@metaplex/js';

interface Props {
  title: string;
  children: React.ReactNode;
  allowHorizOverflow?: boolean;
  defaultOpen?: boolean;
  amount?: number;
  action?: () => void;
}

function DarkblockAccordion({ title, children, allowHorizOverflow, defaultOpen, amount, action, ...props }: Props) {
  return (
    <Disclosure defaultOpen={defaultOpen} {...props}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex h-[71px] w-full items-center justify-between ${
              open ? `rounded-t-lg` : `rounded-lg`
            } border border-gray-800 p-6`}
          >
            <div className={`flex w-full items-center justify-between gap-4`}>
              <div className='flex gap-4'>
                <p className="m-0"> {title}</p>
                {amount && (
                  <div className={`flex h-6 w-6 items-center justify-center rounded-md bg-gray-800`}>
                    {amount}
                  </div>
                )}
              </div>
              {action && (
                <div
                  className='flex items-center h-6 px-4 py-4 mr-2 text-base bg-gray-800 rounded-full'
                  style={{backdropFilter: 'blur(10px)'}}
                  onClick={action}
                  >
                  + Add Content
                </div>
              )}
            </div>

            <ChevronRight
              color="#fff"
              className={cx(
                'transition duration-[300ms] ease-in-out',
                open ? 'rotate-[270deg]' : 'rotate-90'
              )}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div
              className={cx('rounded-b border border-t-0 border-gray-800 p-6', {
                'overflow-x-auto': allowHorizOverflow,
              })}
            >
              <Disclosure.Panel>{children}</Disclosure.Panel>
            </div>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default DarkblockAccordion;
