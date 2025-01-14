import axios from "axios";
import React from "react";

export default function useVivaWallet() {
    const [allOrders, setAllOrders] = React.useState([]);
    const urlDevelopment = import.meta.env.VITE_APP_URL_PAYMENT;
    const localStorageKey = "vivaWalletOrders";

    // Função para salvar os pedidos no localStorage
    const saveOrdersToLocalStorage = (orders) => {
        localStorage.setItem(localStorageKey, JSON.stringify(orders));
    };

    // Função para carregar os pedidos do localStorage
    const loadOrdersFromLocalStorage = () => {
        const storedOrders = localStorage.getItem(localStorageKey);
        if (storedOrders) {
            try {
                return JSON.parse(storedOrders);
            } catch (e) {
                console.log("Error parsing stored orders:", e);
                return [];
            }

        }
        return [];
    };

    const getAllOrders = async () => {
        try {
            const localStorageOrders = loadOrdersFromLocalStorage();
            setAllOrders(localStorageOrders); // Carrega pedidos do localStorage

            const response = await axios.get(urlDevelopment);

            if (response.data && Array.isArray(response.data)) {
                let newOrders = [];

                if (localStorageOrders && localStorageOrders.length > 0) {
                    //Verifica qual o pedido mais recente salvo
                    const lastStoredOrderDate = new Date(Math.max(...localStorageOrders.map(order => new Date(order.createdAt))));

                    // Filtra os novos pedidos que tem o `createdAt` maior que o último pedido salvo localmente
                    newOrders = response.data.filter(order => new Date(order.createdAt) > lastStoredOrderDate);
                } else {
                    newOrders = response.data;
                }

                const updatedOrders = [...localStorageOrders, ...newOrders]
                setAllOrders(updatedOrders);
                saveOrdersToLocalStorage(updatedOrders);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return {
        allOrders,
        getAllOrders,
    };
}