import React from "react";
import useVivaWallet from "@/hooks/vivawallet/useVivaWallet";
import NotFound from "../table/NotFound";
import { Table, TableCell, TableContainer, TableBody, TableHeader } from "@windmill/react-ui";

export default function TabelaPedidosCustomizada() {
    const { allOrders, getAllOrders } = useVivaWallet();

    React.useEffect(() => {
        getAllOrders();
    }, []);

    // Função para determinar a classe CSS do status
    const getStatusColor = (status) => {
        switch (status) {
            case "Pago":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"; // Azul para "Pago"
            case "Pendente":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"; // Amarelo para "Pendente"
            case "Cancelado":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"; // Vermelho para "Cancelado"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    };

    // converter data para formato dd/mm/aaaa
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="p-4">
                {allOrders && allOrders.length > 0 ? (
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>N° Pedido</TableCell>
                                    <TableCell>Loja</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell>Endereço</TableCell>
                                    <TableCell>Valor</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Data</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {allOrders.map((order) => (
                                    <tr key={order._id}>
                                        <TableCell>{order.invoice}</TableCell>
                                        <TableCell>{order.customerTrns}</TableCell>
                                        <TableCell>{order.merchantTrns}</TableCell>
                                        <TableCell>{order.dynamicDescriptor}</TableCell>
                                        <TableCell>{order.amount}</TableCell>
                                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </TableCell>
                                    </tr>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div className="flex justify-center items-center">
                        <NotFound title="Desculpe, não há pedidos no momento." />
                    </div>
                )}
            </div>
        </div>
    );
}