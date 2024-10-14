import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { getCheckoutPayment } from '../../services/apiServices';
import FormattedDate from '../../utils/FormattedDate';

const PaymentCheck = () => {
    const [getCheckoutsPayment, setGetCheckoutsPayment] = useState([]);

    const fetchCheckoutPayment = async () => {
        const response = await getCheckoutPayment();
        console.log('response checkout payment', response);
        setGetCheckoutsPayment(response.data.checkouts);
    }

    useEffect(() => {
        fetchCheckoutPayment();
    }, [])

    return (
        <div className='px-10 pt-24'>
            <p className='font-bold text-2xl mb-5'>Daftar Transaksi</p>
            <div>
                <div className='flex space-x-4 mb-5'>
                    <input type="text" className='w-[60%] rounded ' placeholder='Cari pembelianmu disini' />
                    <input type="date" className='rounded' />
                </div>
                {getCheckoutsPayment.map((item) => (
                    <div key={item.id} className='bg-slate-50 border-2 border-slate-600 rounded p-5 space-y-4 mb-5'>
                        <div className='flex space-x-4 items-center'>
                            <MdOutlineLocalGroceryStore size={23} />
                            <p className='font-semibold'>Belanja</p>
                            <p><FormattedDate dateString={item.createdAt} /></p>
                            <p className={`${item.payment[0].paymentStatus === 'SUCCESS' ? 'text-green-400 border-green-500' : 'text-red-400 border-2 border-red-500'} border-2 rounded px-2 bg-red-50 font-semibold`}>PAYMENT {item.payment[0].paymentStatus}</p>
                        </div>
                        {item.purchasedItem?.product?.map((product, index) => (
                            <div key={index}>
                                <div className='mt-2'>
                                    <p className='font-semibold text-md text-slate-600'>{product.merchant_name}</p>
                                </div>
                                <div className='grid grid-cols-5 gap-5 mb-5'>
                                    <div className='flex justify-center items-center'>
                                        <img src="src\assets\monitor.jpg" className='object-cover w-40' alt="" />
                                    </div>
                                    <div className='col-span-3 flex flex-col justify-center'>
                                        <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi suscipit voluptate mollitia atque vel, quisquam in quam ut consequatur aut?</p>
                                        <p>1 barang rp.123123</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='font-semibold'>Total Belanja</p>
                                        <p>rp.123123</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-end p-3'>
                            <p className='font-bold text-slate-600 border-2 border-slate-600 rounded px-2 py-1'>Lihat Detail Transaksi</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaymentCheck