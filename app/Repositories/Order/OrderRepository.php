<?php

namespace App\Repositories\Order;

use App\Models\Order;

class OrderRepository implements OrderRepositoryInterface
{
    protected $model;

    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    public function all()
    {
        return $this->model::with('products')->get();
    }

    public function getOrders()
    {
        return $this->model::with('products')->where('user_id', 1)->get();
    }

    public function find($id)
    {
        return $this->model::with('products')->findOrFail($id);
    }

    public function create(array $data)
    {
        $order  = $this->model->create($data);
    }


    public function update($id, array $data)
    {
        $order = $this->find($id);
        $order->update($data);
        return $order;
    }

    public function delete($id)
    {
        $order = $this->find($id);
        $order->delete();
    }
}
