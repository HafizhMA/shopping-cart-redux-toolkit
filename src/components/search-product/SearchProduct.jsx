import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchProduct } from '../../services/apiServices';
import { TfiAlert } from "react-icons/tfi";
import { maxFont } from '../../utils/maxFont';

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [jenisBarang, setJenisBarang] = useState(false);
    const [jenisToko, setJenisToko] = useState(false);
    const [filterJenisBarang, setFilterJenisBarang] = useState({ terlaris: false, termurah: false, termahal: false });
    const [filterJenisToko, setFilterJenisToko] = useState({ terverifikasi: false, individu: false });
    const [nullProduct, setNullProduct] = useState('');
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await searchProduct(query);
                setProducts(productData.data);
                setFilteredProducts(productData.data);
                setNullProduct(query);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        if (query) {
            fetchProducts();
        } else {
            setNullProduct("Tolong input nama produk");
        }
    }, [query]);

    useEffect(() => {
        applyFilters();
    }, [filterJenisBarang, filterJenisToko, products]);

    const handleJenisBarang = () => {
        setJenisBarang(!jenisBarang);
    };

    const handleShowJenisToko = () => {
        setJenisToko(!jenisToko);
    };

    const handleFilterJenisBarang = (key) => {
        setFilterJenisBarang({
            terlaris: key === "terlaris",
            termurah: key === "termurah",
            termahal: key === "termahal",
        });
    };

    const handleFilterJenisToko = (key) => {
        setFilterJenisToko({
            terverifikasi: key === "terverifikasi",
            individu: key === "individu",
        });
    };

    const applyFilters = () => {
        let filtered = [...products];

        const isJenisBarangActive = Object.values(filterJenisBarang).some((value) => value);
        const isJenisTokoActive = Object.values(filterJenisToko).some((value) => value);

        if (!isJenisBarangActive && !isJenisTokoActive) {
            setFilteredProducts(products);
            return;
        }

        if (filterJenisBarang.terlaris) {
            filtered.sort((a, b) => b.terjual - a.terjual);
        }
        if (filterJenisBarang.termurah) {
            filtered.sort((a, b) => a.hargaBarang - b.hargaBarang);
        }
        if (filterJenisBarang.termahal) {
            filtered.sort((a, b) => b.hargaBarang - a.hargaBarang);
        }

        if (filterJenisToko.terverifikasi) {
            filtered = filtered.filter((product) => product.user.isVerified);
        }
        if (filterJenisToko.individu) {
            filtered = filtered.filter((product) => !product.user.isVerified);
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className='search-page-component py-[100px]'>
            <div className='grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 h-screen'>
                <div className='mb-8 justify-self-center'>
                    <p className='font-bold mb-4 lg:block md:flex sm:flex'>Filter</p>
                    <div className='flex lg:flex-col flex-wrap justify-center gap-1'>
                        <div className='filter-dropdown'>
                            <div onClick={handleJenisBarang} className='bg-slate-500 text-white w-32 h-8 text-center flex items-center justify-center rounded cursor-pointer'>
                                <span className='font-semibold'>Jenis Barang</span>
                            </div>
                            <ul className={`bg-white text-black mt-2 rounded p-2 w-32 ${jenisBarang ? 'block' : 'hidden'}`}>
                                <div className='flex items-center justify-between'>
                                    <li>Terlaris</li>
                                    <input type="checkbox" checked={filterJenisBarang.terlaris} onChange={() => handleFilterJenisBarang("terlaris")} />
                                </div>
                                <div className='flex items-center justify-between my-3'>
                                    <li>Termurah</li>
                                    <input type="checkbox" checked={filterJenisBarang.termurah} onChange={() => handleFilterJenisBarang("termurah")} />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <li>Termahal</li>
                                    <input type="checkbox" checked={filterJenisBarang.termahal} onChange={() => handleFilterJenisBarang("termahal")} />
                                </div>
                            </ul>
                        </div>
                        <div className='filter-dropdown'>
                            <div onClick={handleShowJenisToko} className={`bg-slate-500 text-white w-32 h-8 text-center flex items-center justify-center rounded cursor-pointer`}>
                                <span className='font-semibold'>Jenis Toko</span>
                            </div>
                            <ul className={`bg-white text-black mt-2 rounded p-2 w-32 ${jenisToko ? 'block' : 'hidden'}`}>
                                <div className='flex items-center justify-between mb-3'>
                                    <li>Terverifikasi</li>
                                    <input type="checkbox" checked={filterJenisToko.terverifikasi} onChange={() => handleFilterJenisToko("terverifikasi")} />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <li>Individu</li>
                                    <input type="checkbox" checked={filterJenisToko.individu} onChange={() => handleFilterJenisToko("individu")} />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-3 lg:md:justify-self-start md:justify-self-center sm:justify-self-center'>
                    <p className='font-bold mb-4'>Produk</p>
                    <div className='container grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <Link to={`/detail/${item.id}`} className="card-search-product mb-4 rounded" key={item.id}>
                                    <div>
                                        <img src={item.img} alt={item.namaBarang} className='w-full sm:h-[250px] lg:h-[140px] md:h-[150px] object-cover rounded' />
                                    </div>
                                    <div className='p-2'>
                                        <p className='font-semibold text-lg'>{maxFont(item.namaBarang)}</p>
                                        <p className='text-slate-600 font-semibold text-sm'>{item.deskripsiBarang}</p>
                                        <p>Rp. {Number(item.hargaBarang).toLocaleString('id-ID')}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className='col-span-4'>
                                {query ? (
                                    <div className='px-10 py-5 bg-white rounded border-2 border-slate-600'>
                                        <div className='flex items-center gap-1 mb-5'>
                                            <TfiAlert size={50} />
                                            <p className='text-3xl font-semibold'>Oooops</p>
                                        </div>
                                        <p className='text-xl'>Tidak ditemukan nama produk bernama <span className='font-bold text-slate-500'>{nullProduct}</span></p>
                                    </div>
                                ) : (
                                    <p className='font-semibold'>{nullProduct}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
