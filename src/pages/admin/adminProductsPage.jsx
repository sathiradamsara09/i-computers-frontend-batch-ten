import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModal from "../../components/productDeleteModal";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);

    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(() => {

        if (!isProductsAreLoaded) {
            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(
                    (response) => {
                        console.log("Products:", response.data);
                        setProducts(response.data);
                        setIsProductsAreLoaded(true);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
        }

    }, [isProductsAreLoaded]);


    return (
        <div className="w-full h-full overflow-y-scroll bg-gray-50 p-5">

            {/* Page Header */}
            <div className="sticky top-0 z-20 w-full min-h-[100px] rounded-2xl bg-accent text-white flex items-center justify-between px-6 py-5 shadow-xl">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Products
                    </h1>

                    <p className="text-sm text-white/70 mt-1">
                        Manage your products and inventory
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <span className="text-sm text-white/70">
                        Total Products
                    </span>

                    <span className="font-bold text-lg">
                        {products.length}
                    </span>
                </div>

            </div>


            {
                isProductsAreLoaded ?

                    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                        {/* Table Top Bar */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">

                            <div>
                                <h2 className="font-semibold text-secondary text-lg">
                                    Product List
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    View and manage all products
                                </p>
                            </div>

                            <div className="text-sm text-gray-500">
                                {products.length} products
                            </div>

                        </div>


                        {/* Responsive Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1200px] text-secondary">

                                <thead>
                                    <tr className="bg-accent/10 border-b border-gray-200">

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Image
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Product ID
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Product
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Price
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Labelled Price
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Brand
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Model
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Category
                                        </th>

                                        <th className="text-center p-4 text-xs font-semibold uppercase tracking-wider">
                                            Availability
                                        </th>

                                        <th className="text-center p-4 text-xs font-semibold uppercase tracking-wider">
                                            Stock
                                        </th>

                                        <th className="text-center p-4 text-xs font-semibold uppercase tracking-wider">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>


                                <tbody>

                                    {
                                        products.length > 0 ?

                                            products.map(
                                                (item) => {

                                                    return (
                                                        <tr
                                                            key={item.productId}
                                                            className="border-b border-gray-100 hover:bg-accent/[0.04] transition-all duration-200"
                                                        >

                                                            {/* Image */}
                                                            <td className="p-4">

                                                                <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">

                                                                    <img
                                                                        src={item.images[0]}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                                    />

                                                                </div>

                                                            </td>


                                                            {/* Product ID */}
                                                            <td className="p-4">

                                                                <span className="inline-flex px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium text-gray-600">
                                                                    {item.productId}
                                                                </span>

                                                            </td>


                                                            {/* Name */}
                                                            <td className="p-4 max-w-[220px]">

                                                                <div className="font-semibold text-secondary">
                                                                    {item.name}
                                                                </div>

                                                            </td>


                                                            {/* Price */}
                                                            <td className="p-4">

                                                                <span className="font-semibold text-secondary">
                                                                    Rs. {Number(item.price).toLocaleString()}
                                                                </span>

                                                            </td>


                                                            {/* Labelled Price */}
                                                            <td className="p-4">

                                                                <span className="text-gray-400 line-through text-sm">
                                                                    Rs. {Number(item.labelledPrice).toLocaleString()}
                                                                </span>

                                                            </td>


                                                            {/* Brand */}
                                                            <td className="p-4">

                                                                <span className="text-sm font-medium">
                                                                    {item.brand}
                                                                </span>

                                                            </td>


                                                            {/* Model */}
                                                            <td className="p-4">

                                                                <span className="text-sm text-gray-500">
                                                                    {item.model}
                                                                </span>

                                                            </td>


                                                            {/* Category */}
                                                            <td className="p-4">

                                                                <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                                                                    {item.category}
                                                                </span>

                                                            </td>


                                                            {/* Availability */}
                                                            <td className="p-4 text-center">

                                                                <span
                                                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                                                                    ${item.isAvailable
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-red-100 text-red-700"
                                                                    }`}
                                                                >

                                                                    <span
                                                                        className={`w-2 h-2 rounded-full
                                                                        ${item.isAvailable
                                                                            ? "bg-green-500"
                                                                            : "bg-red-500"
                                                                        }`}
                                                                    ></span>

                                                                    {item.isAvailable
                                                                        ? "Available"
                                                                        : "Not Available"
                                                                    }

                                                                </span>

                                                            </td>


                                                            {/* Stock */}
                                                            <td className="p-4 text-center">

                                                                <span
                                                                    className={`inline-flex min-w-[45px] justify-center px-3 py-1.5 rounded-lg text-xs font-bold
                                                                    ${item.stock > 0
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : "bg-red-100 text-red-700"
                                                                    }`}
                                                                >
                                                                    {item.stock}
                                                                </span>

                                                            </td>


                                                            {/* Actions */}
                                                            <td className="p-4">

                                                                <div className="flex items-center justify-center gap-2">

                                                                    <ProductDeleteModal
                                                                        product={item}
                                                                        refresh={
                                                                            () => {
                                                                                setIsProductsAreLoaded(false);
                                                                            }
                                                                        }
                                                                    />

                                                                    <Link
                                                                        to="/admin/edit-product"
                                                                        state={item}
                                                                        className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-all duration-200"
                                                                    >

                                                                        <BiEdit className="text-xl text-blue-500 hover:text-blue-700" />

                                                                    </Link>

                                                                </div>

                                                            </td>

                                                        </tr>
                                                    );
                                                }
                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="11"
                                                    className="text-center py-16"
                                                >

                                                    <div className="flex flex-col items-center">

                                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl mb-4">
                                                            📦
                                                        </div>

                                                        <h3 className="font-semibold text-secondary text-lg">
                                                            No Products Found
                                                        </h3>

                                                        <p className="text-sm text-gray-400 mt-1">
                                                            Add your first product to get started.
                                                        </p>

                                                    </div>

                                                </td>

                                            </tr>
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    :

                    <LoadingAnimation />
            }


            {/* Add Product Button */}
            <Link
                to="/admin/add-product"
                className="fixed bottom-8 right-8 w-14 h-14 bg-accent flex justify-center items-center rounded-2xl text-white text-2xl shadow-xl hover:scale-110 hover:shadow-2xl hover:bg-black transition-all duration-300 z-30"
            >

                <FaPlus />

            </Link>

        </div>
    );

}
