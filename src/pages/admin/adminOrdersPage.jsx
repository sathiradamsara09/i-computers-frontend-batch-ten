
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loadingAnimation";
import { FaEye } from "react-icons/fa";
import OrderDetailsModal from "../../components/orderDetailsModal";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);

    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const [totalOrders, setTotalOrders] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        if (!isOrdersAreLoaded) {

            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + currentPage,  {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(
                    (response) => {

                        console.log("Orders:", response.data);

                        setOrders(response.data.orders);
                        setTotalOrders(response.data.totalOrders);
                        setTotalPages(response.data.totalPages);
                        setIsOrdersAreLoaded(true);

                    }
                )
                .catch(
                    (error) => {

                        console.log(error);

                    }
                );
        }

    }, [isOrdersAreLoaded, currentPage, pageSize]);


    return (
        <div className="w-full h-full overflow-y-scroll bg-gray-50 p-5">

            {/* Page Header */}
            <div className="sticky top-0 z-20 w-full min-h-[100px] rounded-2xl bg-accent text-white flex items-center justify-between px-6 py-5 shadow-xl">

                <div>

                    <h1 className="text-2xl font-bold tracking-tight">
                        Orders
                    </h1>

                    <p className="text-sm text-white/70 mt-1">
                        Manage customer orders
                    </p>

                </div>

                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">

                    <span className="text-sm text-white/70">
                        Total Orders
                    </span>

                    <span className="font-bold text-lg">
                        {orders.length}
                    </span>

                </div>

            </div>


            {
                isOrdersAreLoaded ?

                    <>

                    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                        {/* Table Top Bar */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">

                            <div>

                                <h2 className="font-semibold text-secondary text-lg">
                                    Order List
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    View and manage all orders
                                </p>

                            </div>

                            <div className="text-sm text-gray-500">
                                {orders.length} orders
                            </div>

                        </div>


                        {/* Responsive Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px] text-secondary">

                                <thead>

                                    <tr className="bg-accent/10 border-b border-gray-200">

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Order ID
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Name
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Email
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Phone
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Total
                                        </th>

                                        <th className="text-center p-4 text-xs font-semibold uppercase tracking-wider">
                                            Items
                                        </th>

                                        <th className="text-center p-4 text-xs font-semibold uppercase tracking-wider">
                                            Status
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Date
                                        </th>

                                        <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        orders.length > 0 ?

                                            orders.map(
                                                (item) => {

                                                    return (

                                                        <tr
                                                            key={item.orderId}
                                                            className="border-b border-gray-100 hover:bg-accent/[0.04] transition-all duration-200"
                                                        >

                                                            {/* Order ID */}
                                                            <td className="p-4">

                                                                <span className="inline-flex px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium text-gray-600">
                                                                    {item.orderId}
                                                                </span>

                                                            </td>


                                                            {/* Customer */}
                                                            <td className="p-4">

                                                                <div className="font-semibold text-secondary">
                                                                    {item.firstName} {item.lastName}
                                                                </div>

                                                            </td>


                                                            {/* Email */}
                                                            <td className="p-4">

                                                                <span className="text-sm text-gray-500">
                                                                    {item.email}
                                                                </span>

                                                            </td>


                                                            {/* Phone */}
                                                            <td className="p-4">

                                                                <span className="text-sm text-gray-500">
                                                                    {item.phone}
                                                                </span>

                                                            </td>


                                                            {/* Total */}
                                                            <td className="p-4">

                                                                <span className="font-semibold text-secondary">
                                                                    Rs. {Number(item.total).toLocaleString()}
                                                                </span>

                                                            </td>


                                                            {/* Items */}
                                                            <td className="p-4 text-center">

                                                                <span className="inline-flex min-w-[45px] justify-center px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold">
                                                                    {item.items.length}
                                                                </span>

                                                            </td>


                                                            {/* Status */}
                                                            <td className="p-4 text-center">

                                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">

                                                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>

                                                                    {item.status}

                                                                </span>

                                                            </td>


                                                            {/* Date */}
                                                            <td className="p-4">

                                                                <span className="text-sm text-gray-500">
                                                                    {new Date(item.date).toLocaleDateString()}
                                                                </span>

                                                            </td>
                                                            <td className="p-4">
                                                                <OrderDetailsModal order={item} refresh={()=>{setIsOrdersAreLoaded(false)}} />
                                                            </td>

                        

                                                        </tr>

                                                    );

                                                }
                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="9"
                                                    className="text-center py-16"
                                                >

                                                    <div className="flex flex-col items-center">

                                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl mb-4">
                                                            📦
                                                        </div>

                                                        <h3 className="font-semibold text-secondary text-lg">
                                                            No Orders Found
                                                        </h3>

                                                        <p className="text-sm text-gray-400 mt-1">
                                                            Customer orders will appear here.
                                                        </p>

                                                    </div>

                                                </td>

                                            </tr>
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>


                    <div className="w-full flex justify-end items-center gap-3 mt-4">

                        <button
                            onClick={() => {
                                if(currentPage > 1){
                                    setCurrentPage(currentPage - 1);
                                    setIsOrdersAreLoaded(false);
                                }
                            }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => {
                                setCurrentPage(currentPage + 1);    
                                setIsOrdersAreLoaded(false);
                            }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            Next
                        </button>

                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setCurrentPage(1);
                                setIsOrdersAreLoaded(false);
                            }}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>

                    </div>

                    </>

                    :

                    <LoadingAnimation />
            }

        </div>
    );

}

