import dynamic from 'next/dynamic'

const Loading = dynamic(() => import('./Loading'))


export {
    Loading
};