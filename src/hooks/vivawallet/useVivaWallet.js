import axios from "axios";
import React from "react";

export default function useVivaWallet() {
    const [allOrders, setAllOrders] = React.useState([])

    const urlDevelopment = import.meta.env.VITE_APP_URL_PAYMENT

    const getAllOrders = async () => {
        try {
            const response = await axios.get(urlDevelopment)
            console.log("Pedidos: ", response.data)
            setAllOrders(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        allOrders,
        getAllOrders
    }
}