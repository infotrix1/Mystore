<?php

namespace App\Services;

use App\Repositories\Order\OrderRepository;

class OrderService
{
    protected $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll()
    {
        return $this->repository->all();
    }

    public function createOrder(array $data)
    {
        return $this->repository->create($data);
    }

    public function getOrderById($id)
    {
        return $this->repository->find($id);
    }

    public function OrderGetById()
    {
        return $this->repository->getOrders();
    }

    public function updateOrder($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function deleteOrder($id)
    {
        $this->repository->delete($id);
    }
}
