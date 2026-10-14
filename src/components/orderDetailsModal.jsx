
import axios from "axios";

import { useState } from "react";

import toast from "react-hot-toast";

import { FaEye, FaPhone } from "react-icons/fa";

import getFormattedPrice from "../utils/price-format";


export default function OrderDetailsModal(props){

    const [isModalOpen , setIsModalOpen] = useState(false)

    const [notes, setNotes] = useState(props.order.notes || "")

    const [status, setStatus] = useState(props.order.status || "pending")

    const [isUpdating , setIsUpdating] = useState(false)

    const order = props.order

    const refresh = props.refresh


    const closeModal = () => {

        setIsModalOpen(false)

    }


    const updateOrder = async () => {

        setIsUpdating(true)

        try {

             await axios.put(
            import.meta.env.VITE_API_URL + "/orders/" + order.orderId,
            {
                status: status,
                notes: notes
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )

            refresh()

            closeModal()

            toast.success("Order updated successfully")

        } catch (error) {

            toast.error("Failed to update order")

        } finally {

            setIsUpdating(false)

        }

    }


    return(

        <>

            <FaEye
                className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-200 hover:scale-110"
                onClick={
                    ()=>{
                        setNotes(order.notes || "")
                        setStatus(order.status || "pending")
                        setIsModalOpen(true)
                    }
                }
            />


            {

                isModalOpen &&

                <div
                    className="w-screen h-screen fixed bg-black/50 backdrop-blur-sm top-0 left-0 flex justify-center items-center text-secondary z-50 p-4"
                >

                    <div
                        className="w-[560px] max-w-full h-auto max-h-[90vh] bg-white rounded-2xl shadow-2xl relative overflow-hidden border border-gray-100 flex flex-col"
                    >

                        {/* Header */}

                        <div className="bg-accent text-white px-6 py-5 relative">

                            <button
                                type="button"
                                className="absolute top-4 right-5 w-8 h-8 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white flex justify-center items-center text-lg cursor-pointer transition-all duration-200 z-50"
                                onClick={
                                    (e)=>{
                                        e.preventDefault()
                                        e.stopPropagation()
                                        closeModal()
                                    }
                                }
                            >
                                X
                            </button>


                            <div className="flex justify-between items-center pr-10">

                                <div>

                                    <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                                        Order Details
                                    </p>

                                    <span className="inline-flex mt-2 px-3 py-1.5 rounded-lg bg-white/15 border border-white/10 text-sm font-bold">
                                        {order.orderId}
                                    </span>

                                </div>


                                <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/10 text-xs font-semibold capitalize">
                                    {order.status}
                                </span>

                            </div>


                            <div className="mt-4 flex items-center gap-2">

                                <span className="w-2 h-2 rounded-full bg-green-300"></span>

                                <p className="text-sm text-white/75 italic">
                                    {order.email}
                                </p>

                            </div>


                            <div className="mt-4 flex items-center gap-2">

                                <span className="w-2 h-2 rounded-full bg-yellow-300"></span>

                                <p className="text-sm text-white/75 italic">
                                    Order Notes: {order.notes || "No notes added"}
                                </p>

                            </div>

                        </div>


                        {/* Scrollable Content */}

                        <div className="flex-1 overflow-y-auto">


                            {/* Order Details */}

                            <div className="w-full flex flex-col gap-5 p-6">


                                {/* Customer */}

                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                        Customer
                                    </span>

                                    <p className="text-lg font-bold text-gray-800 mt-1">
                                        {order.firstName} {order.lastName}
                                    </p>

                                </div>


                                {/* Email and Phone */}

                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                            Email
                                        </span>

                                        <p className="text-sm font-semibold text-gray-800 mt-2 break-all">
                                            {order.email}
                                        </p>

                                    </div>


                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                            Phone
                                        </span>

                                        <div className="flex items-center gap-2 mt-2">

                                            <div className="w-8 h-8 rounded-full bg-green-100 flex justify-center items-center shrink-0">

                                                <FaPhone className="text-green-600 text-sm" />

                                            </div>

                                            <span className="text-sm font-semibold text-gray-800">
                                                {order.phone}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* Address */}

                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                                    <div className="flex items-center justify-between mb-2">

                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                            Delivery Address
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            Shipping
                                        </span>

                                    </div>


                                    <p className="text-sm font-semibold text-gray-800 leading-6">

                                        {order.addressLineOne}

                                        {

                                            order.addressLineTwo &&

                                            <>
                                                , {order.addressLineTwo}
                                            </>

                                        }

                                        , {order.city}, {order.state}, {order.postalCode}

                                    </p>

                                </div>


                                {/* Order Items */}

                                <div>

                                    <div className="flex justify-between items-center mb-3">

                                        <div>

                                            <h3 className="text-sm font-bold text-gray-800">
                                                Order Items
                                            </h3>

                                            <p className="text-xs text-gray-400 mt-1">
                                                {order.items.length} item(s)
                                            </p>

                                        </div>

                                    </div>


                                    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">

                                        {

                                            order.items.map((item, index) => {

                                                const product = item.product || item

                                                const productImage =
                                                    product.image ||
                                                    (
                                                        product.images &&
                                                        product.images.length > 0
                                                    ?
                                                        product.images[0]
                                                    :
                                                        null
                                                    )

                                                const productName =
                                                    product.name || "Product"

                                                const productPrice =
                                                    product.price || 0


                                                return(

                                                    <div
                                                        key={index}
                                                        className="w-full flex justify-between items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-200"
                                                    >

                                                        <div className="flex items-center gap-4 min-w-0">

                                                            <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">

                                                                {

                                                                    productImage ?

                                                                    <img
                                                                        src={productImage}
                                                                        alt={productName}
                                                                        className="w-full h-full object-cover"
                                                                    />

                                                                    :

                                                                    <span className="text-xs text-gray-400">
                                                                        No Image
                                                                    </span>

                                                                }

                                                            </div>


                                                            <div className="min-w-0">

                                                                <p className="text-sm font-semibold text-gray-800 truncate">
                                                                    {productName}
                                                                </p>

                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    Qty: {item.quantity}
                                                                </p>

                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    Price: {getFormattedPrice(productPrice)}
                                                                </p>

                                                            </div>

                                                        </div>


                                                        <div className="text-right shrink-0">

                                                            <p className="text-sm font-bold text-gray-800">
                                                                {getFormattedPrice(productPrice * item.quantity)}
                                                            </p>

                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Subtotal
                                                            </p>

                                                        </div>

                                                    </div>

                                                )

                                            })

                                        }

                                    </div>

                                </div>


                                {/* Total */}

                                <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 flex justify-between items-center">

                                    <div>

                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                            Order Total
                                        </span>

                                        <p className="text-xs text-gray-400 mt-1">
                                            Final amount
                                        </p>

                                    </div>


                                    <span className="text-2xl font-bold text-accent">
                                        {getFormattedPrice(order.total)}
                                    </span>

                                </div>


                                {/* Edit Notes and Status */}

                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                                    <div className="flex flex-col gap-4">


                                        {/* Edit Notes */}

                                        <div className="w-full flex flex-col">

                                            <label className="text-gray-800 font-semibold mb-1">
                                                Edit Notes:
                                            </label>

                                            <textarea
                                                value={notes}
                                                onChange={
                                                    (e)=>{
                                                        setNotes(e.target.value)
                                                    }
                                                }
                                                rows="3"
                                                placeholder="Add order notes..."
                                                className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                                            ></textarea>

                                        </div>


                                        {/* Update Status */}

                                        <div className="w-full flex flex-col">

                                            <label className="text-gray-800 font-semibold mb-1">
                                                Update Status:
                                            </label>

                                            <select
                                                value={status}
                                                onChange={
                                                    (e)=>{
                                                        setStatus(e.target.value)
                                                    }
                                                }
                                                className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer"
                                            >

                                                <option value="pending">
                                                    Pending
                                                </option>

                                                <option value="processing">
                                                    Processing
                                                </option>

                                                <option value="shipped">
                                                    Shipped
                                                </option>

                                                <option value="delivered">
                                                    Delivered
                                                </option>

                                            </select>

                                        </div>


                                        {/* Update Button */}

                                        <button
                                            type="button"
                                            disabled={isUpdating}
                                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={
                                                ()=>{
                                                    updateOrder()
                                                }
                                            }
                                        >
                                            {isUpdating ? "Updating..." : "Update"}
                                        </button>


                                    </div>

                                </div>


                            </div>


                        </div>


                    </div>

                </div>

            }

        </>

    )

}


