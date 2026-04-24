import { Fragment } from 'react'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition
} from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import type { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  data: User
}

export const NavMenu = ({ data }: NavMenuProps) => {
  const queryClient = useQueryClient()

  const logOut = () => {
    localStorage.removeItem('AUTH-TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <Popover className='relative'>
      {({ close }) => (
        <>
          <PopoverButton className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400'>
            <Bars3Icon className='w-8 h-8 text-white ' />
          </PopoverButton>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <PopoverPanel className='absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48'>
              <div className='w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
                <p className='text-center font-bold'>Hola, {data.name}</p>
                
                <Link
                  to='/profile'
                  className='block p-2 hover:text-white hover:bg-purple-400'
                  onClick={() => close()}
                >
                  Mi Perfil
                </Link>
                
                <Link
                  to='/'
                  className='block p-2 hover:text-white hover:bg-purple-400'
                  onClick={() => close()}
                >
                  Mis Proyectos
                </Link>

                <button
                  className='block p-2 w-full text-left hover:text-white hover:bg-purple-400'
                  type='button'
                  onClick={() => {
                    logOut();
                    close();
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}