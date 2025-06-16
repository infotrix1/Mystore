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
        return $this->model::with('items.product')
        ->where('user_id', auth()->id())
        ->latest()
        ->get();
    }

    public function find($id)
    {
        return $this->model::with('products')->findOrFail($id);
    }

    public function create(array $data)
    {
        // dd($data);
        $order = $this->model->create([
            'user_id' => auth()->id(),
            'total' => $data['total'],
            'status' => 'pending',
        ]);

        foreach ($data['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return $order;
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
